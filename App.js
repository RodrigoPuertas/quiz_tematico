import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screen/HomePage';
import ScreenForms from './screen/ScreenForms';
import ScreenGame from './screen/ScreenGame';
import ScreenRegistrationQuestions from './screen/ScreenRegistrationQuestions';
import ScreenRegistrationTheme from './screen/ScreenRegistrationTheme';
import ScreenThemes from './screen/ScreenThemes'
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
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={Home} options={{ headerBackVisible: false }} />
        <Stack.Screen name="ScreenForms" component={ScreenForms} options={{ headerBackVisible: true }} />
        <Stack.Screen name="ScreenGame" component={ScreenGame} options={{ headerBackVisible: true }} />
        <Stack.Screen name="ScreenRegistrationQuestions" component={ScreenRegistrationQuestions} options={{ headerBackVisible: true }} />
        <Stack.Screen name="ScreenRegistrationTheme" component={ScreenRegistrationTheme} options={{ headerBackVisible: true, headerShown: false }} />
        <Stack.Screen name="ScreenThemes" component={ScreenThemes} options={{ headerBackVisible: true, headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
