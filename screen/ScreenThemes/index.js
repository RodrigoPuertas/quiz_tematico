import { StatusBar } from 'expo-status-bar';
import {Text, View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import {getDbConnection,createTable,listaTemas,adicionaTema}  from  '../../database/database';
import styles from './styles';
export default function ScreenRegistrationTheme({ navigation }) {

    useEffect(() => {
        console.log('Entrando na Tela de temas');
        createTable();
        return () => {
            console.log('Finalizando tela: Tela de temas');
        };
    }, []);



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.tittle}>TEMAS</Text>
            </View>
            <View style={styles.main}>
                {
                    //implementar lista de temas
                }
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ScreenRegistrationTheme')}>
                    <Text style={styles.textButton}>Cadastrar mais temas</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>

            </View>
            
            <StatusBar style="auto" />
        </View>
    );
}


