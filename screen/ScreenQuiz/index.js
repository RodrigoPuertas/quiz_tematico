import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { obterPerguntasPorTemaQTD } from '../../database/crud_perguntas';

export default function ScreenQuiz({ route, navigation }) {
    const { tema, numQuestions } = route.params;
    const [perguntas, setPerguntas] = useState([]);
    const [respostas, setRespostas] = useState({});
    const [indiceAtual, setIndiceAtual] = useState(0);

    useEffect(() => {
        const fetchPerguntas = async () => {
            const fetchedPerguntas = await obterPerguntasPorTemaQTD(tema.id, numQuestions);
            setPerguntas(fetchedPerguntas);
        };

        fetchPerguntas();
    }, [tema, numQuestions]);

    const selecionarAlternativa = (alternativa, index) => {
        setRespostas(prevRespostas => ({
            ...prevRespostas,
            [indiceAtual]: index + 1, // Armazena o índice (1 a 4)
        }));
    };

    const irParaProximaQuestao = () => {
        if (indiceAtual < perguntas.length - 1) {
            setIndiceAtual(prevIndex => prevIndex + 1);
        } else {
            let acertos = 0;
            let erros = 0;

            perguntas.forEach((pergunta, index) => {
                if (respostas[index] === pergunta.alternativaCorreta) {
                    acertos++;
                } else {
                    erros++;
                }
            });

            Alert.alert(
                "Resultados do Quiz",
                `Você acertou ${acertos} perguntas e errou ${erros}.`,
                [{ text: "OK", onPress: () => navigation.navigate('ScreenGame') }]
            );
        }
    };

    const renderAlternativas = () => {
        if (perguntas.length === 0) return null;

        const perguntaAtual = perguntas[indiceAtual];

        return perguntaAtual.alternativas.map((alternativa, index) => {
            const isSelected = respostas[indiceAtual] === index + 1; // Compara com o índice correto (1 a 4)
            return (
                <TouchableOpacity
                    key={index}
                    style={[styles.alternativaButton, isSelected && styles.alternativaSelecionada]}
                    onPress={() => selecionarAlternativa(alternativa, index)}
                >
                    <Text style={styles.alternativaText}>{alternativa}</Text>
                </TouchableOpacity>
            );
        });
    };

    return (
        <View style={styles.container}>
            {perguntas.length > 0 ? (
                <>
                    <Text style={styles.perguntaText}>{perguntas[indiceAtual].pergunta}</Text>
                    {renderAlternativas()}
                    <TouchableOpacity style={styles.proximaButton} onPress={irParaProximaQuestao}>
                        <Text style={styles.proximaText}>Próxima Questão</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text>Carregando...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    perguntaText: {
        fontSize: 24,
        marginBottom: 20,
    },
    alternativaButton: {
        backgroundColor: '#00adb5',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    alternativaSelecionada: {
        backgroundColor: 'green', // Cor verde para a alternativa selecionada
    },
    alternativaText: {
        color: '#fff',
        fontSize: 18,
    },
    proximaButton: {
        marginTop: 20,
        backgroundColor: '#ff5722',
        padding: 15,
        borderRadius: 5,
    },
    proximaText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
});
