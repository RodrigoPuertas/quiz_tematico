import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getDbConnection, createTable, adicionaTema } from '../../database/database';
import styles from './styles';

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
        if (tema) {
            const isSaved = await adicionaTema(tema); // Salva o tema
            if (isSaved) {
                setTema(''); // Limpa o campo após salvar
                console.log('Tema salvo:', tema);
                // Você pode navegar para outra tela aqui se necessário
            } else {
                console.log('Erro ao salvar o tema.');
            }
        } else {
            console.log('Por favor, insira um tema.');
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
                <TouchableOpacity style={styles.button} onPress={saveTheme}>
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                {/* Adicione conteúdo do rodapé, se necessário */}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
