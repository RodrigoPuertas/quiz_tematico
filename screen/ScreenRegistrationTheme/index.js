import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput } from 'react-native';
import { getDbConnection, createTable, adicionaTema } from '../../database/database';
import styles from './styles';
import Button from '../../components/Button'; // Importa o botão

export default function ScreenRegistrationTheme({ navigation }) {
    const [tema, setTema] = useState('');

    useEffect(() => {
        console.log('Entrando na Tela de temas');
        getDbConnection();
        createTable();
        return () => {
            console.log('Finalizando tela: Tela de temas');
        };
    }, []);

    const saveTheme = async () => {
        try {
            if (tema) {
                const isSaved = await adicionaTema(tema); // Salva o tema
                if (isSaved) {
                    setTema(''); // Limpa o campo após salvar
                    console.log('Tema salvo:', tema);
                    navigation.navigate('ScreenThemes');
                } else {
                    console.log('Erro ao salvar o tema.');
                }
            } else {
                console.log('Por favor, insira um tema.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>TEMAS</Text>
            </View>
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do tema"
                    value={tema}
                    onChangeText={(text) => setTema(text)}
                />
                <View style={styles.ViewButton} >
                    <Button 
                        onPress={() => {saveTheme();}}
                        buttonText="Salvar" 
                    />

                    <Button 
                        onPress={() => navigation.navigate('ScreenThemes')} // Navega para a tela de cadastro de temas
                        buttonText="Voltar" 
                    />
                </View>
                
            </View>
            <View style={styles.footer}>
                {/* Adicione conteúdo do rodapé, se necessário */}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
