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
    
    const tbPerguntas = `
    CREATE TABLE IF NOT EXISTS tbPerguntas (
        idPergunta INTEGER PRIMARY KEY AUTOINCREMENT,
        idTema INTEGER,
        pergunta TEXT NOT NULL,
        FOREIGN KEY (idTema) REFERENCES tbTemas(idTema) ON DELETE CASCADE
    );`;

    const tbAlternativas = `
    CREATE TABLE IF NOT EXISTS tbAlternativas (
        idAlternativa INTEGER PRIMARY KEY AUTOINCREMENT,
        idPergunta INTEGER,
        alternativa TEXT NOT NULL,
        alternativaCorreta INTEGER, -- 0 incorreta / 1 correta
        FOREIGN KEY (idPergunta) REFERENCES tbPerguntas(idPergunta) ON DELETE CASCADE
    );`;

    try {
        var cx = await getDbConnection();
        await cx.execAsync(tbTemas);
        await cx.execAsync(tbPerguntas);
        await cx.execAsync(tbAlternativas);
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
    let registros = [];
    let dbCx;
    
    try {
        dbCx = await getDbConnection();
        registros = await dbCx.getAllAsync('SELECT * FROM tbTemas');
    } catch (error) {
        console.error("Erro ao listar temas", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    for (const registro of registros) {
        let tema = {
            id: registro.idTema,
            nome: registro.descTema,
        };
        retorno.push(tema);
    }

    return retorno;
}

// Função para listar perguntas por tema
export async function listaPerguntasPorTema() {
    const retorno = [];
    let registros = [];
    let dbCx;
    
    try {
        dbCx = await getDbConnection();
        registros = await dbCx.getAllAsync(`
            SELECT p.pergunta 
            FROM tbTemas t 
            INNER JOIN tbPerguntas p 
            ON t.idTema = p.idTema
        `);
    } catch (error) {
        console.error("Erro ao listar perguntas por tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    for (const registro of registros) {
        retorno.push({ pergunta: registro.pergunta });
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

// Função para adicionar pergunta
export async function adicionaPergunta(pergunta) {
    let result;
    let dbCx;
    
    try {
        dbCx = await getDbConnection();
        const query = 'INSERT INTO tbPerguntas (pergunta, idTema) VALUES (?, ?)';
        result = await dbCx.runAsync(query, [pergunta.pergunta, pergunta.idTema]);
    } catch (error) {
        console.error("Erro ao inserir pergunta", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return result && result.changes === 1;
}

// Função para adicionar alternativas
export async function adicionaAlternativas(alternativa) {
    let result;
    let dbCx;
    
    try {
        dbCx = await getDbConnection();
        const query = 'INSERT INTO tbAlternativas (alternativa, idPergunta, alternativaCorreta) VALUES (?, ?, ?)';
        result = await dbCx.runAsync(query, [alternativa.alternativa, alternativa.idPergunta, alternativa.alternativaCorreta]);
    } catch (error) {
        console.error("Erro ao inserir alternativa", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return result && result.changes === 1;
}
