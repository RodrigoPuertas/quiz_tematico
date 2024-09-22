import * as SQLite from 'expo-sqlite/next'; // Certifique-se de que o pacote está instalado

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
        var cx = await getDbConnection();
        await cx.execAsync(tbTemas);
    } catch (error) {
        console.error('Erro na criação das tabelas:', error);
    } finally {
        if (cx) {
            await cx.closeAsync();
        }
    }
}

// Função para listar temas
export async function listaTemas() {
    let retorno = [];
    let dbCx;

    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM tbTemas order by idTema desc');
        retorno = registros.map(registro => ({
            id: registro.idTema,
            nome: registro.descTema,
        }));
    } catch (error) {
        console.error("Erro ao listar temas", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return retorno;
}

export async function existeTema(Tema) {
    let retorno = [];
    let dbCx;

    try {
        dbCx = await getDbConnection();
        // Corrigido para passar o parâmetro
        const registros = await dbCx.getAllAsync('SELECT * FROM tbTemas WHERE descTema = ?', [Tema]);
        retorno = registros.map(registro => ({
            id: registro.idTema,
            nome: registro.descTema,
        }));
    } catch (error) {
        console.error("Erro ao listar temas", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
    aux = retorno.length > 0;
    console.log(aux? "existe" : "n existe");
    return  aux// Retorna true se existe, false se não existe
}

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

    return result && result.changes === 1; // Retorna true se o tema foi apagado com sucesso
}

export async function atualizaTemaDoBanco(idTema, descTema) {
    let result;
    let dbCx;

    try {
        dbCx = await getDbConnection();
        const query = 'UPDATE tbTemas SET descTema = ? WHERE idTema = ?'; // Corrigido
        result = await dbCx.runAsync(query, [descTema, idTema]);
        console.log(result);
    } catch (error) {
        console.error("Erro ao atualizar tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
    aux = result && result.changes === 1;
    console.log(aux);
    return aux  // Retorna true se o tema foi atualizado com sucesso
}


// Função para listar perguntas por tema
export async function listaPerguntasPorTema(idTema) {
    const retorno = [];
    let dbCx;

    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync(`
            SELECT p.pergunta 
            FROM tbTemas t 
            INNER JOIN tbPerguntas p ON t.idTema = p.idTema
            WHERE t.idTema = ?`, [idTema]);
        
        registros.forEach(registro => {
            retorno.push({ pergunta: registro.pergunta });
        });
    } catch (error) {
        console.error("Erro ao listar perguntas por tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return retorno;
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
        console.error("Erro ao inserir tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return result && result.changes === 1;
}
