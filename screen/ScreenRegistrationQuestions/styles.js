import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        margin: 10,
        borderRadius: 10,
        width: "80%",
    },
    pergunta: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        margin: 10,
        height: 100,
        borderRadius: 10,
        fontSize: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
    },
    header: {
        backgroundColor: '#120a51',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 20,
    },
    main: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    ViewButton: {

        justifyContent: "flex-end", // Centraliza verticalmente
        alignItems: "center", // Centraliza horizontalmente
        marginVertical: 20, // Margem vertical, se necessário
    },
    button: {
        width: '80%', // Ajuste a largura do botão, se necessário
    },
});

export default styles;
