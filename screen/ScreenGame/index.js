import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { createTable, listaTemas, countPerguntas, getDbConnection } from '../../database/crud_temas';
import styles from './styles';

const { width, height } = Dimensions.get('window'); // Obtém as dimensões da tela

export default function Screen1({ navigation }) {
    const [temas, setTemas] = useState([]);
    const [contagensPerguntas, setContagensPerguntas] = useState({}); // Contagem de perguntas por tema

    useEffect(() => {
        const initialize = async () => {
            console.log('Entrando na Tela de temas');
            await getDbConnection();
            await createTable();
            await atualizarTemas();
        };

        initialize();

        const unsubscribe = navigation.addListener('focus', () => {
            atualizarTemas(); // Atualiza temas sempre que a tela estiver em foco
        });

        return () => {
            unsubscribe(); // Limpa o listener ao desmontar
            console.log('Finalizando tela: Tela de temas');
        };
    }, [navigation]);

    const atualizarTemas = async () => {
        const temasList = await listaTemas();
        setTemas(temasList);
        await atualizarContagensPerguntas(temasList); // Atualiza a contagem de perguntas
    };

    const atualizarContagensPerguntas = async (temasCarregados) => {
        const novasContagens = {};
        for (let tema of temasCarregados) {
            const contagem = await countPerguntas(tema.id);
            novasContagens[tema.id] = contagem; // Armazena a contagem
        }
        setContagensPerguntas(novasContagens);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>ESCOLHA SEU QUIZ</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {temas.map((tema) => (
                <TouchableOpacity 
                    key={tema.id} 
                    style={[styles.themeItem, { width: width * 0.9, height: height * 0.07 }]}
                    onPress={() => navigation.navigate('ScreenQtdQuestions', { tema },console.log("Tema:",tema))}>
                    <Text style={styles.themeText}>{tema.nome}</Text>
                    <Text style={styles.countText}>
                        Perguntas: {contagensPerguntas[tema.id] !== undefined ? contagensPerguntas[tema.id] : 0}
                    </Text>
                </TouchableOpacity>
                
                ))}
            </ScrollView>
            <View style={styles.main}>
                {/* Conteúdo principal, se necessário */}
            </View>
            <View style={styles.footer}>
                {/* Conteúdo do rodapé, se necessário */}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
