export interface Todo {
    id: string;
    name: string;
    description: string;
    dueDate: string; // ISO 8601 date string
    dueTime: string; // HH:mm format
    createdAt: string;
    updatedAt: string;
    completed: boolean;
}

// API Response from JSONPlaceholder
export interface ApiTodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>;
export type UpdateTodoInput = Partial<CreateTodoInput> & { id: string };
