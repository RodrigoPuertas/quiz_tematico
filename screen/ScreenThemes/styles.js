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
      tittle: {
        marginTop: 40,
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      main: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      button: {
        backgroundColor: '#120a51',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20
      },
      textButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
 
      },
      footer: {
        backgroundColor: '#120a51',
        paddingVertical: 10,
        alignItems: 'center',
      },
});

export default styles;