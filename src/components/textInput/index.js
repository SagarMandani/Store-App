import React from 'react';
import { View, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { Theme } from '@common';
import styles from './style';

const TextInput = ({ errorText, description, ...props }) => {
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={Theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}

export default TextInput;