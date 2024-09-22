import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screen/HomePage';
import ScreenForms from './screen/ScreenForms';
import ScreenGame from './screen/ScreenGame';
import ScreenRegistrationQuestions from './screen/ScreenRegistrationQuestions'; // Mude conforme necessário
import ScreenThemes from './screen/ScreenThemes';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenListQuestions from './screen/ScreenListQuestions';
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
                name="ScreenRegistrationQuestions" 
                component={ScreenRegistrationQuestions} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="ScreenListQuestions" 
                component={ScreenListQuestions} // Certifique-se de que este componente exista
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Game') {
                        iconName = 'game-controller'; 
                    } else if (route.name === 'Cadastro de Temas / Perguntas') {
                        iconName = 'book'; 
                    } else if (route.name === 'Forms') {
                        iconName = 'clipboard'; 
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#120a51',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen 
                name="Game" 
                component={ScreenGame} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Cadastro de Temas / Perguntas" 
                component={ThemesStack} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Forms" 
                component={ScreenForms} 
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
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Main" 
                component={MainTabNavigator} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}
