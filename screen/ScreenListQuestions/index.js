import React, { useState, useCallback } from 'react';
import { View, Text, StatusBar, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import Button from '../../components/Button';
import * as crud_perguntas from "../../database/crud_perguntas"; // Importar suas funções de CRUD
import Icon from 'react-native-vector-icons/FontAwesome';

const ScreenRegistrationQuestions = ({ navigation }) => {
    const route = useRoute();
    const { tema } = route.params; // Acessando o objeto 'tema' passado
    const [perguntas, setPerguntas] = useState([]);

    // useFocusEffect para recarregar as perguntas quando a tela ganha foco
    useFocusEffect(
        useCallback(() => {
            const fetchPerguntas = async () => {
                try {
                    const perguntasObtidas = await crud_perguntas.obterPerguntasPorTema(tema.id);
                    setPerguntas(perguntasObtidas);
                } catch (error) {
                    Alert.alert('Erro', 'Não foi possível carregar as perguntas.');
                    console.error(error);
                }
            };

            fetchPerguntas();
        }, [tema.id])
    );

    // Função para apagar pergunta
    const apagarPergunta = async (idPergunta) => {
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja apagar esta pergunta?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            const isDeleted = await crud_perguntas.apagarPergunta(idPergunta);
                            if (isDeleted) { 
                                setPerguntas(perguntas.filter(p => p.idPergunta !== idPergunta));
                            } else {
                                Alert.alert('Erro', 'Falha ao apagar a pergunta.');
                            }
                        } catch (error) {
                            Alert.alert('Erro', 'Ocorreu um erro ao tentar apagar a pergunta.');
                        }
                    }
                }
            ]
        );
    };

    const editarPergunta = (pergunta) => {
        navigation.navigate('ScreenRegistrationQuestions', { tema, perguntaExistente: pergunta });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>TEMA: {tema.nome}</Text>
            </View>
            
            <ScrollView style={styles.scrollContainer}>
                {perguntas.map(pergunta => (
                    <TouchableOpacity key={pergunta.idPergunta} style={styles.themeItem}>
                        <Text style={styles.perguntaText}>{"Pergunta: " + pergunta.pergunta}</Text>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => editarPergunta(pergunta)}>
                                <Icon name="edit" size={20} color="#00adb5" style={styles.editIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => apagarPergunta(pergunta.idPergunta)}>
                                <Icon style={styles.icon} name="trash" size={20} color="#00adb5" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.main}>
                <Button 
                    buttonText={"Criar Pergunta"} 
                    onPress={() => navigation.navigate('ScreenRegistrationQuestions', { tema })} 
                    style={styles.button} // Adiciona o estilo do botão
                />
            </View>
            
            <View style={styles.footer}>
                {/* Aqui você pode adicionar mais conteúdo, se necessário */}
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

export default ScreenRegistrationQuestions;
