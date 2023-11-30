import React, { useState } from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Icons, Constants, CommonStyles, Utils } from '@common';
import { Button, TextInput, Spinner } from '@component';
import { signInWithEmail } from '@actions';
import styles from './style';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const auth = useSelector(state => state.auth);

    const onLoginPressed = async () => {
        const emailError = Utils.emailValidator(email.value);
        const passwordError = Utils.passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return
        }
        Keyboard.dismiss();
        await signInWithEmail(email?.value, password?.value, navigation, dispatch);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} />
            <Image source={Icons.logo} style={styles.appLogo} resizeMode="contain" />
            <Text style={styles.loginTitle}>Login</Text>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <View style={styles.forgotPassword}>
                <Text style={styles.forgot}>Forgot your password?</Text>
            </View>
            <Button mode="contained" onPress={() => onLoginPressed()}>Login</Button>
            <View style={styles.row}>
                <Text>Don’t have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate(Constants.Screen.SignUp)}>
                    <Text style={styles.link}> Sign up</Text>
                </TouchableOpacity>
            </View>
            {auth?.loginLoading && <Spinner />}
        </View>
    )
}

export default Login;