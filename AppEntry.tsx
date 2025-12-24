// React / React Native core imports
import React, { useState, useEffect } from 'react';
import { AppRegistry, View, Platform, LogBox } from 'react-native';

// Navigation / State / Context imports
import { Provider } from 'react-redux';
import Routing from './navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EventProvider } from 'react-native-outside-press';

// Third-party library imports
import KeyboardManager from 'react-native-keyboard-manager';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Utilities / Helpers / API imports
import configureStore from './store';
import applyConfigSettings from './config';
import DataHandler from './services/DataHandler';

// Shared components / UI elements
import { MessageBar } from './components';
import toastConfig from './components/Alert/customToast';

// Styles / Themes / Constants
import AppStyles from './theme/AppStyles';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from './config/SocialLogin';

LogBox.ignoreAllLogs();
applyConfigSettings();

const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [store, setStore] = useState(null);

    useEffect(() => {
        const loadStore = async () => {
            const configuredStore = configureStore();
            setStore(configuredStore);
            setLoading(false);
            DataHandler.setStore(configuredStore);
        };
        loadStore();
    }, []);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
            iosClientId: IOS_CLIENT_ID,
        });
    }, []);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            KeyboardManager.setEnableAutoToolbar(true);
            KeyboardManager.setToolbarPreviousNextButtonEnable(true);
        }
    }, []);

    if (isLoading || !store) {
        return null;
    }

    return (
        <GestureHandlerRootView style={AppStyles.flex}>
            <SafeAreaProvider>
                <EventProvider>
                    <View style={AppStyles.flex}>
                        <Provider store={store}>
                            <Routing />
                        </Provider>
                        <Toast config={toastConfig} />
                        <MessageBar />
                    </View>
                </EventProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

AppRegistry.registerComponent('imPrintAI', () => App);

export default App;
