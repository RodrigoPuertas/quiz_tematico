import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import HomePage from './Screen/HomePage';
import ScreenGame from './Screen/ScreenGame';
import ScreenRegistrationTheme from './Screen/ScreenRegistrationTheme';
import ScreenRegistrationQuestions from './Screen/ScreenRegistrationQuestions';
import ScreenForms from './Screen/ScreenForms';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cadastro de perguntas" component={ScreenRegistrationQuestions} />
      <Stack.Screen name="ScreenForms" component={ScreenForms} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomePage"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Jogar') {
              iconName = focused ? 'game-controller' : 'game-controller-outline';
            } else if (route.name === 'Cadastrar Tema') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarButton: (props) => (route.name === 'HomePage' ? () => null : <TouchableOpacity {...props} />),
        })}
      >
        <Tab.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{
            tabBarLabel: 'Home',
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' }
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
          component={StackNavigator} // Use o StackNavigator aqui
          options={{ tabBarLabel: 'Cadastro de Perguntas' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
