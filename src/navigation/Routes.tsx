import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { SCREEN } from './screenNames';
import MainStack from './MainStack';


const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} id={undefined}>
                <Stack.Screen name={SCREEN.MAIN} component={MainStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;