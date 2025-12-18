import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';
import { HomeTabs } from '../components/TabNavigator';
import { navigationRef } from '../services/RootNavigation';
import NotificationStack from './NotificationStack';
import CreateImprintStack from './createImprintStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, BackHandler } from 'react-native';
import { COMMON } from './constants/StringConstants';
import { useSelector } from 'react-redux';
import AccountStatusModal from '../components/AccountStatusModal';
import { RootState } from './types';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routing: React.FC = () => {
    const [screenName, setScreenName] = useState<string | null>(null);
    const routeNameRef = React.useRef<string | null>(null);
    const isMountedRef = React.useRef<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const isReady = navigationRef?.current?.getCurrentRoute().name;

    const accountStatus = useSelector((state: RootState) => state.user);

    const {
        systemActionForImprint,
        systemActionForChat,
        systemActionForUserReport,
    } = accountStatus?.userInfo || {};

    const actions = [
        systemActionForImprint,
        systemActionForChat,
        systemActionForUserReport,
    ];

    const violation = actions.find(
        (item) => item?.actionType === 'SUSPEND' || item?.actionType === 'BAN'
    );

    useEffect(() => {
        // Keep track of whether the component is mounted or not
        isMountedRef.current = true;

        // Add back handler logic
        const backAction = () => {
            if (screenName === 'home' || screenName === 'onboarding') {
                showExitPopup(); // Show exit popup if it's the last screen
                return true; // Prevent default back action
            }
            return false; // Allow default back action
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        // Clean up the back handler on component unmount
        return () => {
            backHandler.remove();
            isMountedRef.current = false;
        };
    }, [screenName]);

    useEffect(() => {
        if (violation) {
            const timeout = setTimeout(() => {
                setShowModal(true);
            }, 2000); // Delay in milliseconds

            return () => clearTimeout(timeout); // Cleanup on unmount
        }
    }, [violation]);

    const showExitPopup = () => {
        Alert.alert(
            COMMON.EXIT,
            COMMON.EXIT_CONFIRMATION,
            [
                { text: COMMON.CANCEL, style: 'cancel' },
                { text: COMMON.EXIT, onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
        );
    };

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() =>
                (routeNameRef.current =
                    navigationRef.current.getCurrentRoute().name)
            }
            onStateChange={() => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName =
                    navigationRef.current.getCurrentRoute().name;
                if (previousRouteName !== currentRouteName) {
                    setScreenName(currentRouteName);
                }

                routeNameRef.current = currentRouteName;
            }}
        >
            <Stack.Navigator
                initialRouteName={'splash'}
                screenOptions={{
                    contentStyle: { backgroundColor: 'transparent' },
                    animation: 'simple_push',
                }}
            >
                <Stack.Screen
                    name='authStack'
                    component={AuthStack}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='profileStack'
                    component={ProfileStack}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='HomeTabs'
                    component={HomeTabs}
                    options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name='createImprint'
                    component={CreateImprintStack}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='notificationStack'
                    component={NotificationStack}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
            {isReady !== undefined && violation && (
                <AccountStatusModal
                    handleSubmitClick={() => {
                        // setBlockAlert(false);
                    }}
                    title={
                        violation.actionType.charAt(0).toUpperCase() +
                        violation.actionType.slice(1).toLowerCase()
                    }
                />
            )}
        </NavigationContainer>
    );
};

export default Routing;
