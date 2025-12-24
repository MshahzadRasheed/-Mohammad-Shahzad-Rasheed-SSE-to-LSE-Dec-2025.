// React and React Native imports
import React, { useState, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';

// React Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Custom imports
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';
import { HomeTabs } from '../components/TabNavigator';
import { navigationRef } from '../services/RootNavigation';
import NotificationStack from './NotificationStack';
import CreateImprintStack from './createImprintStack';
import { COMMON } from './constants/StringConstants';
import { useSelector } from 'react-redux';
import AccountStatusModal from '../components/AccountStatusModal';
import { RootState } from './types';

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

const Routing: React.FC = () => {
    // State management
    const [screenName, setScreenName] = useState<string | null>(null);
    const routeNameRef = React.useRef<string | null>(null);
    const isMountedRef = React.useRef<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const isReady = navigationRef?.current?.getCurrentRoute().name;

    // Redux state selector
    const accountStatus = useSelector((state: RootState) => state.user);

    // Extracting user actions from account status
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

    // Check for violations in user actions
    const violation = actions.find(
        (item) => item?.actionType === 'SUSPEND' || item?.actionType === 'BAN'
    );

    // Effect to handle back button press
    useEffect(() => {
        isMountedRef.current = true;

        const backAction = () => {
            if (screenName === 'home' || screenName === 'onboarding') {
                showExitPopup();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => {
            backHandler.remove();
            isMountedRef.current = false;
        };
    }, [screenName]);

    // Effect to show modal on violation
    useEffect(() => {
        if (violation) {
            const timeout = setTimeout(() => {
                setShowModal(true);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [violation]);

    // Function to show exit confirmation popup
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
                {/* Stack Screens */}
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
            {/* Modal for account status violation */}
            {isReady !== undefined && violation && (
                <AccountStatusModal
                    handleSubmitClick={() => {
                        navigationRef.current?.navigate('HomeTabs');
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
