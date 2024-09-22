export async function createTable() {    
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
        await cx.execAsync(tbAlternativas);
    } catch (error) {
        console.error('Erro na criação das tabelas:', error);
    } finally {
        if (cx) {
            await cx.closeAsync();
        }
    }
}