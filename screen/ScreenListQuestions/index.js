import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import Button from '../../components/Button';

const ScreenRegistrationQuestions = ({ navigation }) => {
    const route = useRoute();
    const { tema } = route.params; // Acessando o objeto 'tema' passado

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>TEMA: {tema.nome}</Text>
            </View>
            
            <View style={styles.main}>
                <Button 
                    buttonText={"Criar Pergunta"} 
                    onPress={() => navigation.navigate('ScreenRegistrationQuestions', tema)} // Atualizando a navegação
                />
            </View>
            
            <View style={styles.footer}>
                {/* Conteúdo do rodapé, se necessário */}
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

export default ScreenRegistrationQuestions;
