import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomePage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Bem Vindo ao Quiz Maluco</Text>
            <TouchableOpacity 
                style={styles.botao} 
                onPress={() => navigation.navigate('Main')} // Navega para a tab bar
            >
                <Text style={styles.texto}>Comece o jogo aqui</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});
