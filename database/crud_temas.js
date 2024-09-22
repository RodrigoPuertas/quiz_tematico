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
    
    try {
        const cx = await getDbConnection();
        await cx.execAsync(tbTemas);
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
        retorno = registros.map(registro => ({
            id: registro.idTema,
            nome: registro.descTema,
        }));
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
    let aux;

    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM tbTemas WHERE descTema = ?', [Tema]);
        aux = registros.length > 0;
    } catch (error) {
        console.error("Erro ao verificar tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return aux;
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
    let resultado;
    let dbCx;

    try {
        dbCx = await getDbConnection(); // Corrigido para usar getDbConnection
        const [row] = await dbCx.getAllAsync('SELECT COUNT(*) as total FROM tbPerguntas WHERE idTema = ?', [idTema]);
        resultado = row.total; // Ajuste para usar a contagem corretamente
    } catch (error) {
        console.error("Erro ao contar perguntas", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync(); // Fecha a conexão após a operação
        }
    }

    return resultado; // Retorna a contagem de perguntas
}
