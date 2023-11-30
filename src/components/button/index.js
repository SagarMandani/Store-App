import React from 'react'
import { Button as PaperButton } from 'react-native-paper';
import { Theme } from '@common';
import styles from './style';

const Button = ({ mode, style, ...props }) => {
    return (
        <PaperButton
            style={[
                styles.button,
                mode === 'outlined' && { backgroundColor: Theme.colors.surface },
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        />
    )
}

export default Button;