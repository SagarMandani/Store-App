import React, { useState } from 'react'
import { View, TouchableOpacity, SafeAreaView, Image, Keyboard } from 'react-native'
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Icons, Constants, Utils, CommonStyles } from '@common';
import { Button, TextInput, Header, Spinner } from '@component';
import { signUpWithEmail } from '@actions';
import styles from './style';

const SignUp = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
    const auth = useSelector(state => state.auth);

    const onSignUpPressed = async () => {
        const emailError = Utils.emailValidator(email.value)
        const passwordError = Utils.passwordValidator(password.value);
        const confirmPasswordError = Utils.confirmPasswordValidator(password.value, confirmPassword.value);
        if (emailError || passwordError || confirmPasswordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
            return;
        }
        Keyboard.dismiss();
        await signUpWithEmail(email?.value, password.value, navigation, dispatch);
        // 'retailpulse'
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} />
            <Header title='Create Account' goBack={() => navigation.goBack()} />
            <View style={styles.subContainer}>
                <Image source={Icons.logo} style={styles.appLogo} resizeMode="contain" />
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
                    returnKeyType="next"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <TextInput
                    label="Confirm Password"
                    returnKeyType="done"
                    value={confirmPassword.value}
                    onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                    error={!!confirmPassword.error}
                    errorText={confirmPassword.error}
                    secureTextEntry
                />
                <Button mode="contained" onPress={() => onSignUpPressed()} style={{ marginTop: 24 }}>Sign Up</Button>
                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {auth?.signUpLoading && <Spinner />}
        </View>
    )
}

export default SignUp;
