import { Dimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

// common method file

export const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const strReplace = (str) => {
    return (str && str.replace(/["']/g, ""))
}

export const isTabletBasedOnRatio = () => {
    if (aspectRatio > 1.6) {
        return false;
    } else {
        return true;
    }
}

export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email can't be empty."
    if (!re.test(email)) return 'Ooops! We need a valid email address.'
    return ''
}

export const nameValidator = (name) => {
    if (!name) return "Name can't be empty."
    return ''
}

export const passwordValidator = (password) => {
    if (!password) return "Password can't be empty."
    if (password.length < 6) return 'Password must be at least 6 characters long.'
    return ''
}

export const confirmPasswordValidator = (password, confirmPassword) => {
    if (!confirmPassword) return "Confirm Password can't be empty."
    if (confirmPassword.length < 6) return 'Confirm Password must be at least 5 characters long.'
    if (password.trim() !== confirmPassword.trim()) return 'Confirm Password must be at least 6 characters long.'
    return ''
}

export const showToast = (title = 'Error!', message, type = 'error') => {
    showMessage({
        message: title,
        description: message,
        type,
        backgroundColor: type === 'error' ? '#FF3B3B' : '#06C270',
        icon: {
            icon: type === 'error' ? 'danger' : type,
            position: 'left',
            style: { marginTop: 2 },
        },
    });
};

export const checkConnectivity = () => {
    return new Promise(resolve => {
        NetInfo.fetch().then(state => {
            return resolve(state.isConnected);
        });
    });
};