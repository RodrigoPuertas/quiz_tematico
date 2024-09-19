import * as SQLite from 'expo-sqlite/next'; // Certifique-se de que o pacote está instalado

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuiz.db');
    return cx;
}

export async function createTable() {    
    const cx = await getDbConnection();
    
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
        FOREIGN KEY (idAlternativaCorreta) REFERENCES tbAlternativas(idAlternativas)
    );`;

    const tbAlternativas = `
    CREATE TABLE IF NOT EXISTS tbAlternativas (
        idAlternativa INTEGER PRIMARY KEY AUTOINCREMENT,
        idPergunta INTEGER,
        alternativa TEXT NOT NULL,
        FOREIGN KEY (idPergunta) REFERENCES tbPerguntas(idPergunta) ON DELETE CASCADE
        
    );`;

    try {
        await cx.execAsync(tbTemas);
        await cx.execAsync(tbPerguntas);
        await cx.execAsync(tbAlternativas);
    } catch (error) {
        console.error('Erro na criação das tabelas:', error);
    } finally {
        await cx.closeAsync();
    }
}


export async function listaTemas() {
    const retorno = [];
    const dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbTemas');
    await dbCx.closeAsync();

    for (const registro of registros) {        
        let temas = {
            id: registro.idTema,
            nome: registro.descTema,
        };
        retorno.push(temas);
    }

    return retorno;
}

//Preciso pensar melhor sobre isso
export async function listaPeguntasporTemas() {
    const retorno = [];
    const dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT p.pergunta FROM tbTemas t INNER JOIN tbPerguntas p on t.idTema = p.idTema ');
    await dbCx.closeAsync();

    for (const registro of registros) {        
        let temas = {
            id: registro.idTema,
            nome: registro.descTema,
        };
        retorno.push(temas);
    }

    return retorno;
}

export async function adicionaTema(Tema) {    
    const dbCx = await getDbConnection();    
    const query = 'INSERT INTO tbTemas (descTema) VALUES (?)';
    const result = await dbCx.runAsync(query, [Tema.descTema]);    
    await dbCx.closeAsync();
    return result.changes === 1;    
}

export async function adicionaPergunta(pergunta) {    
    const dbCx = await getDbConnection();    
    const query = 'INSERT INTO tbPerguntas (pergunta, idTema) VALUES (?,?)';
    const result = await dbCx.runAsync(query, [pergunta.pergunta,pergunta.idTema]);    
    await dbCx.closeAsync();
    return result.changes === 1;    
}

export async function adicionaAlternativas(alternativa) {    
    const dbCx = await getDbConnection();    
    const query = 'INSERT INTO tbAlternativas (alternativa, idPergunta) VALUES (?,?)';
    const result = await dbCx.runAsync(query, [pergunta.pergunta,pergunta.idTema]);    
    await dbCx.closeAsync();
    return result.changes === 1;    
}


export async function alteraContato(contato) {
    const dbCx = await getDbConnection();
    const query = 'UPDATE tbContatos SET nome = ?, email = ?, senha = ? WHERE id = ?';
    const result = await dbCx.runAsync(query, [contato.nome, contato.email, contato.senha, contato.id]);
    await dbCx.closeAsync();
    return result.changes === 1;
}

export async function excluiContato(id) {
    const dbCx = await getDbConnection();
    const query = 'DELETE FROM tbContatos WHERE id = ?';
    const result = await dbCx.runAsync(query, [id]);
    await dbCx.closeAsync();
    return result.changes === 1;    
}

export async function excluiTodosContatos() {
    const dbCx = await getDbConnection();
    const query = 'DELETE FROM tbContatos';    
    await dbCx.execAsync(query);    
    await dbCx.closeAsync();
}

export async function resetTable() {1
    const cx = await getDbConnection();
    await cx.execAsync('DROP TABLE IF EXISTS tbContatos');
    await createTable();
}

