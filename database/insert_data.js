import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'mydatabase.db',
    location: 'default',
  },
  () => {},
  error => {
    console.error('Error opening database: ', error);
  }
);

const insertData = () => {
  db.transaction(tx => {
    // Inserir Temas
    const temas = [
      'Matemática',
      'História',
      'Ciências',
      'Geografia',
      'Literatura',
    ];

    temas.forEach(tema => {
      tx.executeSql('INSERT INTO tbTemas (descTema) VALUES (?)', [tema]);
    });

    // Inserir Perguntas
    const perguntas = [
      // Matemática
      { temaId: 1, pergunta: 'Qual é a raiz quadrada de 16?', alternativas: ['2', '4', '8', '16'], correta: 1 },
      { temaId: 1, pergunta: 'Qual é o resultado de 5 + 3?', alternativas: ['5', '6', '8', '9'], correta: 2 },
      { temaId: 1, pergunta: 'Qual é a fórmula da área de um triângulo?', alternativas: ['base x altura', 'base x altura / 2', 'altura x 2', 'base + altura'], correta: 1 },
      { temaId: 1, pergunta: 'Quanto é 15% de 200?', alternativas: ['30', '25', '20', '35'], correta: 0 },
      { temaId: 1, pergunta: 'Qual é o próximo número na sequência: 2, 4, 6, ?', alternativas: ['7', '8', '9', '10'], correta: 1 },
      { temaId: 1, pergunta: 'Quantos lados tem um hexágono?', alternativas: ['5', '6', '7', '8'], correta: 1 },
      { temaId: 1, pergunta: 'Qual é o valor de π (pi)?', alternativas: ['3.14', '3.15', '3.16', '3.17'], correta: 0 },
      { temaId: 1, pergunta: 'Qual é a soma dos ângulos internos de um triângulo?', alternativas: ['180 graus', '90 graus', '360 graus', '270 graus'], correta: 0 },
      { temaId: 1, pergunta: 'O que é um número primo?', alternativas: ['Divisível por 1 e ele mesmo', 'Divisível por qualquer número', 'Um número par', 'Um número ímpar'], correta: 0 },
      { temaId: 1, pergunta: 'Quantos zeros tem um milhão?', alternativas: ['6', '7', '5', '8'], correta: 0 },

      // História
      { temaId: 2, pergunta: 'Quem foi o primeiro presidente do Brasil?', alternativas: ['Getúlio Vargas', 'Deodoro da Fonseca', 'Juscelino Kubitschek', 'D. Pedro II'], correta: 1 },
      { temaId: 2, pergunta: 'Em que ano ocorreu a Proclamação da República?', alternativas: ['1889', '1822', '1930', '1945'], correta: 0 },
      { temaId: 2, pergunta: 'Qual civilização construiu as pirâmides do Egito?', alternativas: ['Maia', 'Inca', 'Egípcia', 'Romana'], correta: 2 },
      { temaId: 2, pergunta: 'Quem escreveu a carta de Pero Vaz de Caminha?', alternativas: ['Camões', 'Machado de Assis', 'José de Alencar', 'Pero Vaz de Caminha'], correta: 3 },
      { temaId: 2, pergunta: 'Qual foi a principal causa da Segunda Guerra Mundial?', alternativas: ['Tratado de Versalhes', 'A Grande Depressão', 'Ascensão do Nazismo', 'Guerra Fria'], correta: 2 },
      { temaId: 2, pergunta: 'Quem foi o líder da Revolução Francesa?', alternativas: ['Napoleão Bonaparte', 'Robespierre', 'Ludovico Sforza', 'Danton'], correta: 1 },
      { temaId: 2, pergunta: 'Qual era a principal rota comercial da Idade Média?', alternativas: ['Rota da Seda', 'Rota do Ouro', 'Rota das Especiarias', 'Rota do Sal'], correta: 0 },
      { temaId: 2, pergunta: 'Quem foi o responsável pela unificação da Alemanha?', alternativas: ['Bismarck', 'Hitler', 'Willy Brandt', 'Luther'], correta: 0 },
      { temaId: 2, pergunta: 'Qual foi a primeira civilização conhecida?', alternativas: ['Mesopotâmia', 'Egípcia', 'Gregos', 'Romanos'], correta: 0 },
      { temaId: 2, pergunta: 'Quem foi o imperador romano durante a crucificação de Jesus?', alternativas: ['Augusto', 'Nero', 'Calígula', 'Cláudio'], correta: 1 },

      // Ciências
      { temaId: 3, pergunta: 'Qual é a fórmula da água?', alternativas: ['H2O', 'CO2', 'O2', 'NaCl'], correta: 0 },
      { temaId: 3, pergunta: 'Qual é a camada da Terra onde vivemos?', alternativas: ['Núcleo', 'Manto', 'Crosta', 'Atenosfera'], correta: 2 },
      { temaId: 3, pergunta: 'Qual é o maior órgão do corpo humano?', alternativas: ['Coração', 'Fígado', 'Pele', 'Pulmões'], correta: 2 },
      { temaId: 3, pergunta: 'O que é fotossíntese?', alternativas: ['Produção de energia', 'Transformação de luz em alimento', 'Respiração celular', 'Fermentação'], correta: 1 },
      { temaId: 3, pergunta: 'Qual é a unidade básica da vida?', alternativas: ['Célula', 'Tecido', 'Órgão', 'Sistema'], correta: 0 },
      { temaId: 3, pergunta: 'Quem é considerado o pai da genética?', alternativas: ['Darwin', 'Mendel', 'Pasteur', 'Einstein'], correta: 1 },
      { temaId: 3, pergunta: 'Qual é a velocidade da luz?', alternativas: ['300.000 km/s', '150.000 km/s', '1.000 km/s', '450.000 km/s'], correta: 0 },
      { temaId: 3, pergunta: 'Qual é a principal fonte de energia da Terra?', alternativas: ['Sol', 'Vento', 'Água', 'Carvão'], correta: 0 },
      { temaId: 3, pergunta: 'O que estuda a biologia?', alternativas: ['Seres vivos', 'Física', 'Química', 'Geologia'], correta: 0 },
      { temaId: 3, pergunta: 'Qual é a função das mitocôndrias?', alternativas: ['Produzir energia', 'Armazenar nutrientes', 'Transportar oxigênio', 'Proteger a célula'], correta: 0 },

      // Geografia
      { temaId: 4, pergunta: 'Qual é o maior país do mundo?', alternativas: ['Canadá', 'Brasil', 'Rússia', 'China'], correta: 2 },
      { temaId: 4, pergunta: 'Qual é o rio mais longo do mundo?', alternativas: ['Nilo', 'Amazonas', 'Yangtze', 'Mississippi'], correta: 0 },
      { temaId: 4, pergunta: 'Qual é a capital da França?', alternativas: ['Londres', 'Berlim', 'Paris', 'Madrid'], correta: 2 },
      { temaId: 4, pergunta: 'Qual continente tem mais países?', alternativas: ['África', 'Ásia', 'Europa', 'América do Sul'], correta: 0 },
      { temaId: 4, pergunta: 'Qual é a montanha mais alta do mundo?', alternativas: ['K2', 'Kilimanjaro', 'Everest', 'Aconcágua'], correta: 2 },
      { temaId: 4, pergunta: 'Qual é a capital do Brasil?', alternativas: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'], correta: 2 },
      { temaId: 4, pergunta: 'Em que oceano está localizado o Japão?', alternativas: ['Atlântico', 'Índico', 'Pacífico', 'Ártico'], correta: 2 },
      { temaId: 4, pergunta: 'Qual é o deserto mais árido do mundo?', alternativas: ['Sahara', 'Gobi', 'Atacama', 'Kalahari'], correta: 2 },
      { temaId: 4, pergunta: 'Qual é a maior cidade do mundo?', alternativas: ['Tóquio', 'Nova Iorque', 'Xangai', 'Mumbai'], correta: 0 },
      { temaId: 4, pergunta: 'Qual país é conhecido como a terra dos cangurus?', alternativas: ['Canadá', 'Austrália', 'África do Sul', 'Nova Zelândia'], correta: 1 },

      // Literatura
      { temaId: 5, pergunta: 'Quem escreveu "Dom Casmurro"?', alternativas: ['Machado de Assis', 'Joaquim Manuel de Macedo', 'José de Alencar', 'Graciliano Ramos'], correta: 0 },
      { temaId: 5, pergunta: 'Qual é o autor de "O Pequeno Príncipe"?', alternativas: ['Antoine de Saint-Exupéry', 'Jules Verne', 'Gabriel García Márquez', 'Fiódor Dostoiévski'], correta: 0 },
      { temaId: 5, pergunta: 'Quem escreveu "A Moreninha"?', alternativas: ['Joaquim Manuel de Macedo', 'Machado de Assis', 'José de Alencar', 'Aluísio Azevedo'], correta: 0 },
      { temaId: 5, pergunta: 'Qual o gênero literário de "O Guarani"?', alternativas: ['Romance', 'Conto', 'Poesia', 'Teatro'], correta: 0 },
      { temaId: 5, pergunta: 'Quem escreveu "Cem Anos de Solidão"?', alternativas: ['Gabriel García Márquez', 'Jorge Luis Borges', 'Julio Cortázar', 'Pablo Neruda'], correta: 0 },
      { temaId: 5, pergunta: 'Qual é o famoso poema de Castro Alves?', alternativas: ['Navio Negreiro', 'A Moreninha', 'O Guarani', 'A Última Flor do Lácio'], correta: 0 },
      { temaId: 5, pergunta: 'Quem é o autor de "Os Lusíadas"?', alternativas: ['Camões', 'Fernando Pessoa', 'Eça de Queirós', 'José Saramago'], correta: 0 },
      { temaId: 5, pergunta: 'Quem escreveu "A Divina Comédia"?', alternativas: ['Dante Alighieri', 'Virgílio', 'Homero', 'Camões'], correta: 0 },
      { temaId: 5, pergunta: 'Qual é o tema central de "O Cortiço"?', alternativas: ['Vida urbana', 'Ruralismo', 'Filosofia', 'Política'], correta: 0 },
      { temaId: 5, pergunta: 'Quem é o autor de "Memórias Póstumas de Brás Cubas"?', alternativas: ['Machado de Assis', 'José de Alencar', 'Eça de Queirós', 'Jorge Amado'], correta: 0 },
    ];

    perguntas.forEach(({ temaId, pergunta, alternativas, correta }) => {
      tx.executeSql(
        'INSERT INTO tbPerguntas (idTema, pergunta1, alternativa1, alternativa2, alternativa3, alternativa4, alternativaCorreta) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [temaId, pergunta, ...alternativas, correta]
      );
    });
  }, error => {
    console.error('Transaction error: ', error);
  }, () => {
    console.log('Data inserted successfully');
  });
};


