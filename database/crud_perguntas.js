import * as SQLite from 'expo-sqlite/next'; // Certifique-se de que o pacote está instalado

// Função para abrir a conexão com o banco de dados
export async function obterConexaoDb() {
    const cx = await SQLite.openDatabaseAsync('dbQuiz.db');
    return cx;
}

// Função para criar as tabelas
export async function criarTabelas() {
    //const dropTable = `DROP TABLE IF EXISTS tbPerguntas;`; // Comando para dropar a tabela
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
        const cx = await obterConexaoDb();
        //await cx.execAsync(dropTable); // Executa o comando para dropar a tabela
        await cx.execAsync(tbPerguntas); // Em seguida, cria a tabela
    } catch (error) {
        console.error('Erro na criação das tabelas:', error);
    }
}

// Função para listar perguntas por tema
export async function obterPerguntasPorTema(idTema) {
    let retorno = [];
    let dbCx;

    try {
        dbCx = await obterConexaoDb();
        const registros = await dbCx.getAllAsync(`
            SELECT * 
            FROM tbPerguntas 
            WHERE idTema = ?`, [idTema]);
        
        retorno = registros.map(registro => ({
            idPergunta: registro.idPergunta,
            pergunta: registro.pergunta1,
            alternativas: [
                registro.alternativa1,
                registro.alternativa2,
                registro.alternativa3,
                registro.alternativa4
            ],
            alternativaCorreta: registro.alternativaCorreta
        }));
    } catch (error) {
        console.error("Erro ao listar perguntas por tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
    console.log(retorno.length);
    return retorno;
}

export async function obterPerguntasPorTemaQTD(idTema,qtdPergunta) {
    let retorno = [];
    let dbCx;

    try {
        dbCx = await obterConexaoDb();
        const registros = await dbCx.getAllAsync(`
            SELECT * 
            FROM tbPerguntas 
            WHERE idTema = ? 
            limit ? `, [idTema,qtdPergunta]);
        
        retorno = registros.map(registro => ({
            idPergunta: registro.idPergunta,
            pergunta: registro.pergunta1,
            alternativas: [
                registro.alternativa1,
                registro.alternativa2,
                registro.alternativa3,
                registro.alternativa4
            ],
            alternativaCorreta: registro.alternativaCorreta
        }));
    } catch (error) {
        console.error("Erro ao listar perguntas por tema", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
    console.log(retorno.length);
    return retorno;
}


// Função para adicionar uma nova pergunta
export async function adicionarPergunta(idTema, pergunta1, alternativas, alternativaCorreta) {
    let resultado;
    let dbCx;

    try {
        dbCx = await obterConexaoDb();
        console.log("dbCx");
        const query = `
            INSERT INTO tbPerguntas (idTema, pergunta1, alternativa1, alternativa2, alternativa3, alternativa4, alternativaCorreta) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        resultado = await dbCx.runAsync(query, [
            idTema,
            pergunta1,
            alternativas[0],
            alternativas[1],
            alternativas[2],
            alternativas[3],
            alternativaCorreta
        ]);
        console.log("adicionado");
    } catch (error) {
        console.error("Erro ao adicionar pergunta", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return resultado && resultado.changes === 1; // Retorna true se a pergunta foi adicionada com sucesso
}

// Função para atualizar uma pergunta
export async function atualizarPergunta(idPergunta, pergunta1, alternativas, alternativaCorreta) {
    let resultado;
    let dbCx;

    try {
        dbCx = await obterConexaoDb();
        const query = `
            UPDATE tbPerguntas 
            SET pergunta1 = ?, 
                alternativa1 = ?, 
                alternativa2 = ?, 
                alternativa3 = ?, 
                alternativa4 = ?, 
                alternativaCorreta = ? 
            WHERE idPergunta = ?`;
        resultado = await dbCx.runAsync(query, [
            pergunta1,
            alternativas[0],
            alternativas[1],
            alternativas[2],
            alternativas[3],
            alternativaCorreta,
            idPergunta
        ]);
    } catch (error) {
        console.error("Erro ao atualizar pergunta", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return resultado && resultado.changes === 1; // Retorna true se a pergunta foi atualizada com sucesso
}

// Função para apagar uma pergunta
export async function apagarPergunta(idPergunta) {
    let resultado;
    let dbCx;

    try {
        dbCx = await obterConexaoDb();
        const query = 'DELETE FROM tbPerguntas WHERE idPergunta = ?';
        resultado = await dbCx.runAsync(query, [idPergunta]);
    } catch (error) {
        console.error("Erro ao apagar pergunta", error);
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }

    return resultado && resultado.changes === 1; // Retorna true se a pergunta foi apagada com sucesso
}

