import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { listaTemas, adicionaTema, existeTema, apagarTemaDoBanco, atualizaTemaDoBanco, countPerguntas } from '../../database/crud_temas';
import styles from './styles';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ScreenRegistrationTheme({ navigation }) {
    const [temas, setTemas] = useState([]);
    const [novoTema, setNovoTema] = useState('');
    const [textId, setTextId] = useState('');
    const [temaEditando, setTemaEditando] = useState(null);
    const [contagensPerguntas, setContagensPerguntas] = useState({});
    const [initialized, setInitialized] = useState(false);

    // Função para carregar temas e contar perguntas
    const carregarTemas = async () => {
        try {
            const temasCarregados = await listaTemas();
            setTemas(temasCarregados);
            await atualizarContagensPerguntas(temasCarregados);
        } catch (error) {
            console.error("Erro ao carregar temas:", error);
        }
    };

    const atualizarContagensPerguntas = async (temasCarregados) => {
        const novasContagens = {};
        for (let tema of temasCarregados) {
            const contagem = await countPerguntas(tema.id);
            novasContagens[tema.id] = contagem;
        }
        setContagensPerguntas(novasContagens);
    };

    useEffect(() => {
        const initialize = async () => {
            await carregarTemas();
            setInitialized(true);
        };

        initialize();

        const unsubscribe = navigation.addListener('focus', () => {
            if (initialized) {
                carregarTemas();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigation, initialized]);

    const salvarTema = async () => {
        const temaUpper = novoTema.toUpperCase();
        if (temaUpper && !(await existeTema(temaUpper))) {
            const isSaved = await adicionaTema(temaUpper);
            if (isSaved) {
                setNovoTema('');
                await carregarTemas();
            } else {
                Alert.alert('Erro', 'Erro ao salvar o tema.');
            }
        } else {
            Alert.alert('Erro', 'Tema inválido ou já existente.');
        }
    };

    const apagarTema = async (idTema) => {
        Alert.alert("Atenção", "Deseja apagar este tema?", [
            { text: "Cancelar", style: "cancel" },
            { text: "OK", onPress: async () => {
                const isDeleted = await apagarTemaDoBanco(idTema);
                if (isDeleted) {
                    await carregarTemas();
                }
            }}
        ]);
    };

    const editarTema = (tema) => {
        setNovoTema(tema.nome);
        setTextId("Insira o novo nome do tema:");
        setTemaEditando(tema);
    };

    const atualizarTema = async () => {
        if (temaEditando) {
            const temaUpper = novoTema.toUpperCase();
            const isUpdated = await atualizaTemaDoBanco(temaEditando.id, temaUpper);
            if (isUpdated) {
                setNovoTema('');
                setTemaEditando(null);
                setTextId('');
                await carregarTemas();
            } else {
                Alert.alert('Erro', 'Erro ao atualizar o tema.');
            }
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <View style={styles.header}>
                <Text style={styles.title}>TEMAS</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {temas.map((tema) => (
                    <TouchableOpacity 
                        key={tema.id} 
                        style={styles.themeItem} 
                        onPress={() => navigation.navigate('ScreenListQuestions', { tema })}
                    >
                        <Text style={styles.themeText}>{tema.nome}</Text>
                        <Text style={styles.countText}>
                            Perguntas: {contagensPerguntas[tema.id] !== undefined ? contagensPerguntas[tema.id] : 0}
                        </Text>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => editarTema(tema)}>
                                <Icon name="edit" size={20} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => apagarTema(tema.id)}>
                                <Icon style={styles.icon} name="trash" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do tema"
                    value={novoTema}
                    onChangeText={setNovoTema}
                />
                <Button 
                    onPress={temaEditando ? atualizarTema : salvarTema} 
                    buttonText={temaEditando ? "Atualizar" : "Salvar"}
                />
            </View>
            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
}
