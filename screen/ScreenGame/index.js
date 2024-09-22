import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { createTableTemas, listaTemas, countPerguntas, getDbConnection } from '../../database/crud_temas';
import styles from './styles';
import { criarTabelasPerguntas } from '../../database/crud_perguntas';


const { width, height } = Dimensions.get('window'); // Obtém as dimensões da tela

export default function ScreenGame({ navigation }) {
    const [temas, setTemas] = useState([]);
    const [contagensPerguntas, setContagensPerguntas] = useState({}); // Contagem de perguntas por tema
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                console.log('Entrando na Tela de temas');
                await createTableTemas(); // Cria a tabela de temas
                await criarTabelasPerguntas(); // Cria a tabela de perguntas, se necessário
                await atualizarTemas(); // Atualiza temas e contagens na inicialização
                setInitialized(true); // Marca como inicializado
            } catch (error) {
                console.error("Erro na inicialização:", error); // Log de erro
            }
        };
    
        if (!initialized) {
            initialize();
        }
    
        const unsubscribe = navigation.addListener('focus', () => {
            if (initialized) {
                atualizarTemas(); // Atualiza temas sempre que a tela estiver em foco
            }
        });
    
        return () => {
            unsubscribe(); // Limpa o listener ao desmontar
            console.log('Finalizando tela: Tela de temas');
        };
    }, [navigation, initialized]);
    
    

    const atualizarTemas = async () => {
        try {
            console.log("Entrando atualiza");
            const temasList = await listaTemas();
            console.log("temasList", temasList);
            if (!temasList || temasList.length === 0) {
                console.warn("Nenhum tema encontrado.");
                return;
            }
            setTemas(temasList);
            await atualizarContagensPerguntas(temasList); // Atualiza a contagem de perguntas
        } catch (error) {
            console.error("Erro ao atualizar temas:", error);
        }
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
