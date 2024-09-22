import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#222831',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#eeeeee',
        marginBottom: 10,
    },
    main: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
        width: '100%', // Garante que o ScrollView ocupe toda a largura
    },
    themeItem: {
        padding: 15,
        paddingVertical: 10, // Ajuste este valor
        marginVertical: 5,
        backgroundColor: '#393e46',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        width: '100%',
        alignItems: 'center',
    },
    
    themeText: {
        fontSize: 18,
        color: '#eeeeee', // Cor do texto
    },
    countText: {
        fontSize: 16,
        color: '#00adb5', // Cor para a contagem de perguntas
    },
    footer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
});

export default styles;
