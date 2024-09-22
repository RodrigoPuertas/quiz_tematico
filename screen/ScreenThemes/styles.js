import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831', // Alterando a cor de fundo para ser consistente
        justifyContent: 'flex-start', // Alinhamento inicial
        padding: 20, // Adicionando um padding geral
    },
    header: {
        backgroundColor: '#120a51', // Mantendo a mesma cor do cabeçalho
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    main: {
        flexGrow: 1, // Para que o conteúdo principal ocupe o espaço restante
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 60,
        borderColor: '#00adb5', // Usando a cor do tema
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 25,
        backgroundColor: '#ffffff', // Cor de fundo para o input
    },
    scrollContainer: {
        width: '100%',
        paddingBottom: 20,
    },
    themeItem: {
        padding: 15, // Aumentando o padding para melhor visualização
        marginVertical: 5,
        backgroundColor: '#393e46', // Cor de fundo para os itens
        borderRadius: 10,
        width: '100%',
        elevation: 5, // Sombra para dar destaque
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    themeText: {
        fontSize: 18,
        color: '#eeeeee', // Cor do texto dos itens
    },
    footer: {
        marginTop: 20,
        backgroundColor: '#120a51', // Mantendo a mesma cor do rodapé
        paddingVertical: 10,
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
    lbl: {
        fontSize: 18,
        marginBottom: 10,
        color: '#eeeeee', // Cor do texto da label
    },
    buttonText: {
        fontSize: 18,
        color: '#00adb5', // Cor do texto do botão
    },
    countText: {
        marginTop: 5,
        color: '#00adb5', // Cor para a contagem, consistente com o tema
    }
});

export default styles;
