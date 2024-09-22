import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screen/HomePage';
import ScreenForms from './screen/ScreenForms';
import ScreenGame from './screen/ScreenGame';
import ScreenRegistrationQuestions from './screen/ScreenRegistrationQuestions';
import ScreenThemes from './screen/ScreenThemes';
import ScreenListQuestions from './screen/ScreenListQuestions';
import ScreenQtdQuestions from './screen/ScreenQtdQuestions'; // Removido ScreenQuiz
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import ScreenQuiz from './screen/ScreenQuiz'; // Assegure-se que o caminho esteja correto

const GameStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ScreenGame" 
                component={ScreenGame} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="ScreenQtdQuestions" 
                component={ScreenQtdQuestions} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="ScreenQuiz" // Certifique-se que o nome é o mesmo que está sendo utilizado na navegação
                component={ScreenQuiz} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
};


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
                component={ScreenListQuestions} 
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
                        iconName = 'game-controller-outline'; // Verifique o nome correto
                    } else if (route.name === 'Cadastro de Temas / Perguntas') {
                        iconName = 'book-outline'; // Verifique o nome correto
                    } else if (route.name === 'Forms') {
                        iconName = 'clipboard-outline'; // Verifique o nome correto
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarStyle: {
                    backgroundColor: '#393e46', 
                    borderTopWidth: 0, 
                },
                tabBarLabelStyle: {
                    fontSize: 12, 
                },
                tabBarActiveTintColor: '#00adb5', 
                tabBarInactiveTintColor: 'gray', 
            })}
        >
            <Tab.Screen name="Game" component={GameStack} options={{ headerShown: false }} />
            <Tab.Screen name="Cadastro de Temas / Perguntas" component={ThemesStack} options={{ headerShown: false }} />
            <Tab.Screen name="Forms" component={ScreenForms} options={{ headerShown: false }} />
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
