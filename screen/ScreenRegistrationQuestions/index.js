import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';

export default function ScreenRegistrationQuestions({ navigation }) {

    useEffect(() => {
        console.log('Entrando na Tela de questão ');
        return () => {
            console.log('Finalizando tela: Tela de questão');
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Tela de questão!</Text>
            <Text></Text><Text></Text>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('ScreenForms')}>
                <Text style={styles.texto}>Cadastrar um questão</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
