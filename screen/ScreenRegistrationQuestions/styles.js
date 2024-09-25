import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#222831',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00adb5',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#393e46',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        width: '80%',
        backgroundColor: '#ffffff',
    },
    pergunta: {
    borderWidth: 1,
    borderColor: '#393e46',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 100,
    fontSize: 15,
    width: '100%', // Muda para 100% para ocupar a largura total da tela
    backgroundColor: '#ffffff',
},

    alternativaContainer: {
        width: '100%',
        marginBottom: 10,
    },
    ViewButton: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginVertical: 20,
        width: '100%',
    },
    button: {
        backgroundColor: '#00adb5',
        padding: 10,
        borderRadius: 10,
        width: '80%',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default styles;
