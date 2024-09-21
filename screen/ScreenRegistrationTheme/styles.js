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
        marginBottom: 80,
        width:200,

      },
      textButton: {
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
 
      },
      footer: {
        backgroundColor: '#120a51',
        paddingVertical: 10,
        alignItems: 'center',
      },
      input: {
        width: '100%', // Ajuste a largura para 80% da tela ou o que preferir
        height: 80, // Altura maior
        borderWidth: 1, // Largura da borda
        borderColor: 'black', // Cor da borda preta
        borderRadius: 30, // Bordas arredondadas
        paddingHorizontal: 10, // Espaçamento interno
        marginBottom: 300, // Espaçamento abaixo
        fontSize: 30,
        color: '#000000',
        textAlign: 'center'
    },
    ViewButton:{
        flexDirection: 'row', // Alinha os itens em linha
        justifyContent: 'space-between', // Espaço igual entre os botões
        alignItems: 'center', // Alinha os botões verticalmente
        marginTop: 20, 
        marginLeft: 30
    }
});

export default styles;