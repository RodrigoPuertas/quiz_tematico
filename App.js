import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import HomePage from './Screen/HomePage';
import ScreenGame from './Screen/ScreenGame';
import ScreenRegistrationTheme from './Screen/ScreenRegistrationTheme';
import ScreenRegistrationQuestions from './Screen/ScreenRegistrationQuestions';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomePage" // Definindo HomePage como a tela inicial
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Jogar') {
              iconName = focused ? 'game-controller' : 'game-controller-outline';
            } else if (route.name === 'Cadastrar Tema') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Cadastro de perguntas') {
              iconName = focused ? 'help-circle' : 'help-circle-outline'; // Adicionando ícone para a tela de cadastro de perguntas
            }
            return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarButton: (props) => (route.name === 'HomePage' ? () => null : <TouchableOpacity {...props} />), // Escondendo o botão de HomePage corretamente
        })}
      >
        <Tab.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{
            tabBarLabel: 'Home',
            tabBarButton: () => null, // Oculta o botão na barra de navegação
            tabBarStyle: { display: 'none' } // Oculta a barra de navegação na HomePage
          }}
        />
        <Tab.Screen 
          name="Jogar" 
          component={ScreenGame} 
          options={{ tabBarLabel: 'Jogo' }}
        />
        <Tab.Screen 
          name="Cadastrar Tema" 
          component={ScreenRegistrationTheme} 
          options={{ tabBarLabel: 'Cadastrar Tema' }}
        />
        <Tab.Screen
          name="Cadastro de perguntas"
          component={ScreenRegistrationQuestions}
          options={{ tabBarLabel: 'Cadastro de Perguntas' }} // Configuração para a label da aba
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
