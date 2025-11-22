import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';
import * as ui from '@/screens'
import { SCREEN } from './screenNames';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREEN.SPLASH}
      id={undefined}
    >
      <Stack.Screen name={SCREEN.SPLASH} component={ui.Splash} />
      <Stack.Screen name={SCREEN.TODO_LIST} component={ui.TodoList} />
      <Stack.Screen name={SCREEN.ADD_EDIT_TODO} component={ui.AddEditTodo} />
      <Stack.Screen name={SCREEN.TODO_DETAIL} component={ui.TodoDetail} />
    </Stack.Navigator>
  );
};

export default MainStack;