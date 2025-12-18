// @flow
import React, {useState, useEffect} from 'react';
import {AppRegistry, View, Platform, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {MessageBar} from './components';
import configureStore from './store';
import Routing from './navigator';
import applyConfigSettings from './config';
import AppStyles from './theme/AppStyles';
import DataHandler from './services/DataHandler';
import KeyboardManager from 'react-native-keyboard-manager';
import rootReducer from './reducers/rootReducer'; // Adjust the import path to where your rootReducer is defined
import {Store} from 'redux';
import Toast from 'react-native-toast-message';
import toastConfig from './components/Alert/customToast';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from './config/SocialLogin';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {EventProvider} from 'react-native-outside-press';

LogBox.ignoreAllLogs();

applyConfigSettings();

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [store, setStore] = useState<Store | null>(null);
  // added console due to fixed crashed on app start
  console.log(Animated);

  useEffect(() => {
    const loadStore = async () => {
      const configuredStore = configureStore(rootReducer);
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

  useEffect(() => {
    // This is commented out because it's not clear if it's still needed or how it works in the functional component
    // if (Util.isPlatformAndroid()) {
    //   setTimeout(() => {
    //     NativeModules.SplashScreen.hide();
    //   }, 1000);
    // }
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
