import React from 'react';
import { Text } from 'react-native-paper';
import styles from './style';

const Paragraph = (props) => {
    return <Text style={styles.text} {...props} />
}

export default Paragraph;

