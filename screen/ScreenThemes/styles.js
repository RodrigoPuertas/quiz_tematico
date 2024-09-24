import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
        justifyContent: 'flex-start',
        padding: 20,
    },
    header: {
        // Remover o backgroundColor para não exibir o retângulo
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 20,
    },
    main: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 60,
        borderColor: '#00adb5',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 25,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        width: '100%',
        paddingBottom: 20,
    },
    themeItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#393e46',
        borderRadius: 10,
        width: '100%',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    themeText: {
        fontSize: 18,
        color: '#eeeeee',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
    countText: {
        marginTop: 5,
        color: '#00adb5',
    },
});

export default styles;
