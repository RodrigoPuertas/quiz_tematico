import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { createTable, listaTemas, adicionaTema, existeTema, apagarTemaDoBanco, atualizaTemaDoBanco } from '../../database/crud_temas';
import styles from './styles';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ScreenRegistrationTheme({ navigation }) {
    const [temas, setTemas] = useState([]);
    const [novoTema, setNovoTema] = useState('');
    const [textId, setTextId] = useState('');
    const [temaEditando, setTemaEditando] = useState(null);

    useEffect(() => {
        const initialize = async () => {
            console.log('Entrando na Tela de temas');
            await createTable();
            await atualizarTemas();
        };

        initialize();

        return () => {
            console.log('Finalizando tela: Tela de temas');
        };
    }, []);

    const atualizarTemas = async () => {
        const temasList = await listaTemas();
        setTemas(temasList);
    };

    const salvarTema = async () => {
        const temaUpper = novoTema.toUpperCase();
        if (temaUpper && !(await existeTema(temaUpper))) {
            const isSaved = await adicionaTema(temaUpper);
            if (isSaved) {
                console.log('Tema salvo com sucesso!'); // Log para depuração
                setNovoTema(''); // Limpa o campo após salvar
                await atualizarTemas(); // Atualiza a lista de temas
            } else {
                Alert.alert('Erro', 'Erro ao salvar o tema.');
            }
        } else {
            Alert.alert('Erro', 'Por favor, insira um tema válido ou o tema já existe.');
        }
    };

    const apagarTema = async (idTema) => {
        Alert.alert("Atenção", "Você tem certeza que deseja apagar este tema?", [
            { text: "Cancelar", style: "cancel" },
            { text: "OK", onPress: async () => {
                const isDeleted = await apagarTemaDoBanco(idTema);
                if (isDeleted) {
                    await atualizarTemas();
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
                await atualizarTemas();
            } else {
                Alert.alert('Erro', 'Erro ao atualizar o tema.');
            }
        }
    };

    return (

        <View style={styles.container}>
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
                <Text style={styles.lbl}>{textId}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do tema"
                    value={novoTema}
                    onChangeText={setNovoTema}
                />
                <Button 
                    onPress={temaEditando ? atualizarTema : salvarTema} // Chama a função de atualizar ou salvar
                    buttonText={temaEditando ? "Atualizar" : "Salvar"} // Altera o texto do botão
                />
            </View>
            <View style={styles.footer}>
                {/* Conteúdo do rodapé, se necessário */}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
