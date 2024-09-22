import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button'; // Botão customizado
import { Linking } from 'react-native'; // Importando Linking para abrir URLs
import logo from "../../assets/logo.png"
import rodrigoImage from '../../assets/rodrigo-matioli.jpg';
import lohanImage from '../../assets/lohan-batista.png';

const ScreenResumo = ({ navigation }) => {
    const openLink = (url) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.title}>Bem-vindo ao QuizQuest!</Text>
                <Image 
                    source={logo} // Imagem para o quiz
                    style={styles.image}
                />
            </View>
            
            {/* Seção de Regras */}
            <View style={styles.sectionContainer}>
                <Text style={styles.subtitle}>Como o jogo funciona:</Text>
                <Text style={styles.text}>
                    1. Você será apresentado a vários temas, cada um com suas próprias perguntas.{'\n'}
                    2. Selecione um tema e a quantidade de perguntas que o quiz terá.{'\n'}
                    3. Após escolher o tema, selecione a resposta correta entre as opções.{'\n'}
                    4. Cada resposta correta aumenta sua pontuação!{'\n'}
                    5. O objetivo é acertar o máximo de perguntas possível.{'\n'}
                    6. Ao final, você verá seus resultados.{'\n'}
                </Text>
            </View>

            {/* Seção de Cadastro de Temas e Perguntas */}
            <View style={styles.sectionContainer}>
                <Text style={styles.subtitle}>Cadastro de Temas e Perguntas:</Text>
                <Text style={styles.text}>
                    Você pode cadastrar novos temas para o quiz e adicionar perguntas a esses temas. Isso permite que o quiz seja sempre atualizado e mantenha o interesse dos jogadores. 
                    Para cadastrar um tema, acesse a seção de cadastro de temas no menu e siga as instruções. 
                    As perguntas devem estar relacionadas ao tema escolhido e devem ter apenas uma resposta correta e 4 alternativas.
                </Text>
            </View>
            
            {/* Seção de Desenvolvedores */}
            <View style={styles.devContainer}>
                <Text style={styles.subtitle}>Desenvolvedores:</Text>
                <View style={styles.devRow}>
                    <View style={styles.devDetails}>
                        <Image
                            source={rodrigoImage}
                            style={styles.devImage}
                        />
                        <Text style={styles.developers}>
                            Rodrigo Puertas
                        </Text>
                        <TouchableOpacity style={styles.githubButton} onPress={() => openLink('https://github.com/RodrigoPuertas')}>
                            <Text style={styles.githubButtonText}>GitHub</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.devDetails}>
                        <Image
                            source={lohanImage} // Substitua pela imagem do João
                            style={styles.devImage}
                        />
                        <Text style={styles.developers}>
                            Lohan Batista
                        </Text>
                        <TouchableOpacity style={styles.githubButton} onPress={() => openLink('https://github.com/Lohan1303')}>
                            <Text style={styles.githubButtonText}>GitHub</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <StatusBar style="auto" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#222831',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#eeeeee',
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: '#393e46',
        borderWidth: 2,
    },
    sectionContainer: {
        marginBottom: 20,
        backgroundColor: '#393e46',
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        width: '100%', // Ajusta a largura para ocupar 100%
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00adb5',
    },
    text: {
        fontSize: 16,
        color: '#eeeeee',
        lineHeight: 22,
    },
    devContainer: {
        backgroundColor: '#222831',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        marginBottom: 30,
        width: '100%',
    },
    devRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    devDetails: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 25,
    },
    devImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
    },
    developers: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#eeeeee',
        textAlign: 'center',
    },
    githubButton: {
        marginTop: 5,
        backgroundColor: '#00adb5',
        padding: 5,
        borderRadius: 5,
    },
    githubButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#00adb5',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default ScreenResumo;
