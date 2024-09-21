import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './style'; // Importa os estilos do arquivo style.js

export default function Button({ onPress, buttonText }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.textButton}>{buttonText}</Text>
        </TouchableOpacity>
    );
}