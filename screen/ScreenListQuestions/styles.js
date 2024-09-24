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
        margin: 30,
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
        width: '100%',
    },
    themeItem: {
        padding: 15,
        paddingVertical: 10,
        marginVertical: 5,
        backgroundColor: '#393e46', // Cor de fundo dos itens
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        width: '100%',
        alignItems: 'center',
    },
    perguntaText: {
        fontSize: 18,
        color: '#eeeeee', // Cor do texto das perguntas
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Alinha os ícones à direita
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 'auto', // Adiciona margem esquerda automática para empurrar para a direita
    },
    
    editIcon: {
        marginRight: 15, // Aumenta o espaço entre os ícones
    },
    // Dentro do seu arquivo de estilos
    button: {
        backgroundColor: '#00adb5', // Cor de fundo do botão
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});

export default styles;
