import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { countPerguntas } from '../../database/crud_temas'; // Importa a função

export default function ScreenQtdQuestions({ route, navigation }) {
    const { tema } = route.params; // Recebe o tema da navegação
    const [numQuestions, setNumQuestions] = useState(1);
    const [totalPerguntas, setTotalPerguntas] = useState(0); // Total de perguntas para o tema

    useEffect(() => {
        const fetchTotalQuestions = async () => {
            const total = await countPerguntas(tema.id);
            setTotalPerguntas(total);
        };

        fetchTotalQuestions();
    }, [tema]);

    const iniciarQuiz = () => {
        if (numQuestions <= 0 || numQuestions > totalPerguntas) {
            Alert.alert("Erro", "Por favor, selecione um número válido de questões.");
            return;
        }
        console.log("Iniciando o Quiz");
        // Navega para a tela do quiz, passando o tema e a quantidade de perguntas
        navigation.navigate('ScreenQuiz', { tema, numQuestions });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quantas questões você gostaria de responder?</Text>
            <Text style={styles.numberText}>{numQuestions}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setNumQuestions((prev) => Math.max(1, prev - 1))} style={styles.adjustButton}>
                    <Text style={styles.adjustButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setNumQuestions((prev) => Math.min(totalPerguntas, prev + 1))} style={styles.adjustButton}>
                    <Text style={styles.adjustButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={iniciarQuiz}>
                <Text style={styles.buttonText}>Iniciar Quiz</Text>
            </TouchableOpacity>
            <Text style={styles.totalText}>Total de perguntas disponíveis: {totalPerguntas}</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    numberText: {
        fontSize: 48,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    adjustButton: {
        backgroundColor: '#00adb5',
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    adjustButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    button: {
        backgroundColor: '#00adb5',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    totalText: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
    },
});
