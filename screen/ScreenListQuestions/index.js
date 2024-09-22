import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import Button from '../../components/Button';
import * as crud_perguntas from "../../database/crud_perguntas"; // Importar suas funções de CRUD

const ScreenRegistrationQuestions = ({ navigation }) => {
    const route = useRoute();
    const { tema } = route.params; // Acessando o objeto 'tema' passado
    const [perguntas, setPerguntas] = useState([]);

    useEffect(() => {
        const fetchPerguntas = async () => {
            try {
                const perguntasObtidas = await crud_perguntas.obterPerguntasPorTema(tema.idTema);
                setPerguntas(perguntasObtidas);
                console.log(perguntasObtidas.length); // Verifique o que está sendo retornado
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar as perguntas.');
                console.error(error);
            }
        };

        fetchPerguntas();
    }, [tema.idTema]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>TEMA: {tema.nome}</Text>
            </View>
            
            <View style={styles.main}>
                <Button 
                    buttonText={"Criar Pergunta"} 
                    onPress={() => navigation.navigate('ScreenCadastroPerguntas', { tema })} // Corrigido para navegar para a tela de cadastro
                />
                
                <ScrollView style={styles.lista}>
                    {perguntas.map(item => (
                        <TouchableOpacity key={item.idPergunta} style={styles.perguntaContainer}>
                            <Text style={styles.perguntaText}>{item.pergunta}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            
            <View style={styles.footer}>
                {/* Aqui você pode adicionar mais conteúdo, se necessário */}
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

export default ScreenRegistrationQuestions;
