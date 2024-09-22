import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';

const ScreenInicio = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/logo.png')} // Substitua pelo caminho da sua imagem
                style={styles.image} // Use um estilo separado para a imagem
            />
            <TouchableOpacity 
                style={styles.botao} 
                onPress={() => navigation.navigate('Main')} // Navega para a tab bar
            >
                <Text style={styles.textoBotao}>Jogar</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#120a51', // Fundo azul
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 500,
        height: 300,
        marginBottom: 20, // Espaço entre a imagem e o texto
    },

    botao: {
        width: "60%",
        height: 70,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 100,
    },
    textoBotao: {
        fontSize: 30,
        color: '#fff', // Cor do texto do botão
    },
});

export default ScreenInicio;
