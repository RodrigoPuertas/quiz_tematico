import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screen/HomePage';
import Tela1 from './screen/Tela1';


/* Help:
https://reactnavigation.org/docs/hello-react-navigation
https://reactnavigation.org/docs/native-stack-navigator/#headerbackvisible


// pacotes para instalar: 
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack
*/


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Tela1" component={Tela1} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Tela2" component={Tela2} options={{ headerBackVisible: true , animation: 'slide_from_bottom'}} />
        <Stack.Screen name="Tela3" component={Tela3} options={{ headerBackVisible: false, headerBackTitleVisible: false, title: 'Esta é tela 3', animation: 'fade' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
