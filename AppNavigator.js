import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screen/HomePage';
import ScreenForms from './screen/ScreenForms';
import ScreenGame from './screen/ScreenGame';
import ScreenRegistrationQuestions from './screen/ScreenRegistrationQuestions';
import ScreenRegistrationTheme from './screen/ScreenRegistrationTheme';
import ScreenThemes from './screen/ScreenThemes';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ThemesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ScreenThemes" 
                component={ScreenThemes} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="ScreenRegistrationTheme" 
                component={ScreenRegistrationTheme} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="ScreenRegistrationQuestions" 
                component={ScreenRegistrationQuestions} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Themes" 
                component={ThemesStack} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Forms" 
                component={ScreenForms} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Game" 
                component={ScreenGame} 
                options={{ headerShown: false }} 
            />
        </Tab.Navigator>
    );
};

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ headerShown: false }} // Remove o cabeçalho da tela inicial
            />
            <Stack.Screen 
                name="Main" 
                component={MainTabNavigator} 
                options={{ headerShown: false }} // Remove o cabeçalho da navegação principal
            />
        </Stack.Navigator>
    );
}
