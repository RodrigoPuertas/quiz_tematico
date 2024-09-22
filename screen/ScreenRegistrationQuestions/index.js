import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button'; // Importa o botão customizado
import styles from './styles'; // Importa os estilos
import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de instalar a biblioteca de ícones
import * as crud_perguntas from "../../database/crud_perguntas"; // Importa os métodos do SQLite
import { useRoute, useNavigation } from '@react-navigation/native'; // Adiciona useNavigation

const ScreenCadastroPerguntas = () => {
    const navigation = useNavigation(); // Obtém a navegação
    const route = useRoute();
    const { tema, perguntaExistente } = route.params; // Acessando o objeto 'tema' e 'perguntaExistente' se houver

    const [pergunta, setPergunta] = useState('');
    const [alternativas, setAlternativas] = useState(['', '', '', '']);
    const [respostaCorreta, setRespostaCorreta] = useState(null); // Armazena o índice da alternativa correta

    // UseEffect para preencher os campos automaticamente se for uma edição
    useEffect(() => {
        if (perguntaExistente) {
            console.log(perguntaExistente); // Verifique se as alternativas estão corretas
            setPergunta(perguntaExistente.pergunta);
            setAlternativas([
                perguntaExistente.alternativas[0],
                perguntaExistente.alternativas[1],
                perguntaExistente.alternativas[2],
                perguntaExistente.alternativas[3],
            ]);
            console.log(perguntaExistente.alternativas[0]);
            setRespostaCorreta(perguntaExistente.alternativaCorreta - 1); // Ajusta o índice
        }
    }, [perguntaExistente]);

    const handleAlternativaChange = (text, index) => {
        const newAlternativas = [...alternativas];
        newAlternativas[index] = text;
        setAlternativas(newAlternativas);
    };

    const selecionarAlternativa = (index) => {
        setRespostaCorreta(index); // Define a alternativa selecionada como correta
    };

    const salvarPergunta = async () => {
        const perguntaData = {
            idTema: tema.id, // ID do tema passado como parâmetro
            pergunta1: pergunta,
            alternativa1: alternativas[0],
            alternativa2: alternativas[1],
            alternativa3: alternativas[2],
            alternativa4: alternativas[3],
            alternativaCorreta: respostaCorreta + 1 // Armazena a alternativa correta (1 a 4)
        };

        if (perguntaExistente) {
            // Atualizar pergunta existente
            const sucesso = await crud_perguntas.atualizarPergunta(
                perguntaExistente.idPergunta,
                perguntaData.pergunta1,
                alternativas,
                perguntaData.alternativaCorreta
            );

            if (sucesso) {
                Alert.alert('Sucesso', 'Pergunta atualizada com sucesso!');
                navigation.navigate('ScreenListQuestions', { tema });
            } else {
                Alert.alert('Erro', 'Falha ao atualizar a pergunta.');
            }
        } else {
            // Inserir nova pergunta
            const sucesso = await crud_perguntas.adicionarPergunta(
                perguntaData.idTema,
                perguntaData.pergunta1,
                alternativas,
                perguntaData.alternativaCorreta
            );

            if (sucesso) {
                Alert.alert('Sucesso', 'Pergunta cadastrada com sucesso!');
                setPergunta('');
                setAlternativas(['', '', '', '']);
                setRespostaCorreta(null);
                navigation.navigate('ScreenListQuestions', { tema });
            } else {
                Alert.alert('Erro', 'Falha ao cadastrar a pergunta.');
            }
        }
    };

    const validarPergunta = () => {
        if (!pergunta) {
            Alert.alert('Erro', 'Por favor, preencha a pergunta.');
            return;
        }

        if (alternativas.some(a => !a)) {
            Alert.alert('Erro', 'Por favor, preencha todas as alternativas.');
            return;
        }

        if (respostaCorreta === null) {
            Alert.alert('Erro', 'Por favor, selecione uma alternativa correta.');
            return;
        }

        // Chama a função de salvar (inserir ou atualizar)
        salvarPergunta();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{perguntaExistente ? 'Editar Pergunta' : 'Cadastrar Pergunta'}</Text>
            </View>
            <TextInput
                style={styles.pergunta}
                placeholder="Digite a pergunta"
                value={pergunta}
                onChangeText={setPergunta}
            />
            {alternativas.map((alt, index) => (
                <View key={index} style={[styles.alternativaContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Alternativa ${index + 1}`}
                        value={alt}
                        onChangeText={text => handleAlternativaChange(text, index)}
                    />
                    <TouchableOpacity onPress={() => selecionarAlternativa(index)}>
                        <Icon 
                            name="check" 
                            size={20} 
                            color={respostaCorreta === index ? 'green' : 'gray'} // Muda a cor com base na seleção
                            style={{ marginLeft: 8 }} // Adiciona margem à esquerda do ícone
                        />
                    </TouchableOpacity>
                </View>
            ))}
            <View style={styles.ViewButton}>
                <Button 
                    buttonText={perguntaExistente ? "Atualizar" : "Salvar"} 
                    onPress={validarPergunta} 
                />    
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

export default ScreenCadastroPerguntas;
