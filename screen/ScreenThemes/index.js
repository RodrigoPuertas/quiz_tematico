import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { createTable, listaTemas, adicionaTema } from '../../database/database';
import styles from './styles';
import Button from '../../components/Button';

export default function ScreenRegistrationTheme({ navigation }) {
    const [temas, setTemas] = useState([]);
    const [novoTema, setNovoTema] = useState('');

    useEffect(() => {
        const initialize = async () => {
            console.log('Entrando na Tela de temas');
            await createTable(); // Cria as tabelas no banco de dados
            await atualizarTemas(); // Obtém a lista de temas
        };

        initialize();

        return () => {
            console.log('Finalizando tela: Tela de temas');
        };
    }, []);

    const atualizarTemas = async () => {
        const temasList = await listaTemas(); // Obtém a lista de temas
        setTemas(temasList); // Atualiza o estado com a lista de temas
    };

    const salvarTema = async () => {
        if (novoTema) {
            const isSaved = await adicionaTema(novoTema); // Salva o tema
            if (isSaved) {
                setNovoTema(''); // Limpa o campo após salvar
                await atualizarTemas(); // Atualiza a lista de temas
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

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {temas.map((tema) => (
                    <TouchableOpacity 
                        key={tema.id} 
                        style={styles.themeItem} 
                        onPress={() => console.log(`Tema selecionado: ${tema.nome}`)} // Ação ao pressionar
                    >
                        <Text style={styles.themeText}>{tema.nome}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do tema"
                    value={novoTema}
                    onChangeText={(text) => setNovoTema(text)}
                />
                <Button 
                    onPress={salvarTema} 
                    buttonText="Salvar" 
                />
            </View>
            <View style={styles.footer}>
                {/* Adicione conteúdo do rodapé, se necessário */}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
