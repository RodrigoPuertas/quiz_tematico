import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 25,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginTop:30
    },
    themeItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        width: '100%',
    },
    themeText: {
        fontSize: 18,
    },
    footer: {
        backgroundColor: '#120a51',
        paddingVertical: 10,
        alignItems: 'center',
    },
});

export default styles;
