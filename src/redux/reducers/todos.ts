import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/models/Todo';

interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    lastFetched: string | null;
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null,
    lastFetched: null,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<CreateTodoInput>) => {
            const newTodo: Todo = {
                ...action.payload,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                completed: false,
            };
            state.todos.unshift(newTodo);
        },
        updateTodo: (state, action: PayloadAction<UpdateTodoInput>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = {
                    ...state.todos[index],
                    ...action.payload,
                    updatedAt: new Date().toISOString(),
                };
            }
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        toggleTodoComplete: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
                todo.updatedAt = new Date().toISOString()
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
            state.lastFetched = new Date().toISOString();
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoComplete,
    setLoading,
    setError,
    setTodos,
} = todosSlice.actions

export default todosSlice.reducer;
