import * as SQLite from 'expo-sqlite/next';

// Função para abrir a conexão com o banco de dados
export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuiz.db');
    return cx;
}

// Função para criar as tabelas
export async function createTable() {
    const tbTemas = `
    CREATE TABLE IF NOT EXISTS tbTemas (
        idTema INTEGER PRIMARY KEY AUTOINCREMENT,
        descTema TEXT NOT NULL 
    );`;

    const tbPerguntas = `
    CREATE TABLE IF NOT EXISTS tbPerguntas (
        idPergunta INTEGER PRIMARY KEY AUTOINCREMENT,
        idTema INTEGER,
        pergunta1 TEXT NOT NULL,
        alternativa1 TEXT NOT NULL,
        alternativa2 TEXT NOT NULL,
        alternativa3 TEXT NOT NULL,
        alternativa4 TEXT NOT NULL,
        alternativaCorreta INTEGER,
        FOREIGN KEY (idTema) REFERENCES tbTemas(idTema) ON DELETE CASCADE
    );`;

    try {
        const cx = await getDbConnection();
        await cx.execAsync(tbTemas);
        await cx.execAsync(tbPerguntas);
    } catch (error) {
        console.error('Erro na criação das tabelas:', error);
    }
}

// Função para listar temas
export async function listaTemas() {
    let retorno = [];
    let dbCx;

    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM tbTemas ORDER BY idTema DESC');
        
        // Verifica se registros foram retornados antes de mapear
        if (registros) {
            retorno = registros.map(registro => ({
                id: registro.idTema,
                nome: registro.descTema,
            }));
        }
    } catch (error) {
        console.error("Erro ao listar temas", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync(); // Fecha a conexão após a operação
        }
    }

    return retorno;
}




// Função para verificar se o tema existe
export async function existeTema(Tema) {
    let dbCx;
    let existe = false;

    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM tbTemas WHERE descTema = ?', [Tema]);
        existe = registros.length > 0;
    } catch (error) {
        console.error("Erro ao verificar tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return existe;
}

// Função para adicionar tema
export async function adicionaTema(Tema) {
    let result;
    let dbCx;

    try {
        dbCx = await getDbConnection();
        const query = 'INSERT INTO tbTemas (descTema) VALUES (?)';
        result = await dbCx.runAsync(query, [Tema]);
    } catch (error) {
        console.error("Erro ao adicionar tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return result && result.changes === 1;
}

// Função para apagar tema
export async function apagarTemaDoBanco(idTema) {
    let result;
    let dbCx;

    try {
        dbCx = await getDbConnection();
        const query = 'DELETE FROM tbTemas WHERE idTema = ?';
        result = await dbCx.runAsync(query, [idTema]);
    } catch (error) {
        console.error("Erro ao apagar tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return result && result.changes === 1;
}

// Função para atualizar tema
export async function atualizaTemaDoBanco(idTema, descTema) {
    let result;
    let dbCx;

    try {
        dbCx = await getDbConnection();
        const query = 'UPDATE tbTemas SET descTema = ? WHERE idTema = ?';
        result = await dbCx.runAsync(query, [descTema, idTema]);
    } catch (error) {
        console.error("Erro ao atualizar tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return result && result.changes === 1;
}

// Função para contar perguntas por tema
export async function countPerguntas(idTema) {
    let resultado = 0; // Inicializa como 0 caso não haja perguntas
    let dbCx;

    try {
        dbCx = await getDbConnection(); 
        const [row] = await dbCx.getAllAsync('SELECT COUNT(*) as total FROM tbPerguntas WHERE idTema = ?', [idTema]);
        
        // Verifica se row não é undefined ou null
        if (row) {
            resultado = row.total; 
        }
    } catch (error) {
        console.error("Erro ao contar perguntas", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync(); 
        }
    }

    return resultado; 
}
