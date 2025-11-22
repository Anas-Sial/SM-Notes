import { Todo } from '@/models/Todo';

export type RootStackParamList = {
  Main: undefined;
};

export type MainStackParamList = {
  Splash: undefined;
  TodoList: undefined;
  AddEditTodo: {
    mode: 'add' | 'edit';
    todo?: Todo;
  };
  TodoDetail: {
    todo: Todo;
  };
}; 