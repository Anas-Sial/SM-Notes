import { Todo } from '@/models/Todo';

// TodoCard Types
export interface TodoCardProps {
    todo: Todo;
    isSelected: boolean;
    selectionMode: boolean;
    onPress: () => void;
    onLongPress: () => void;
    onToggleComplete: () => void;
}

// SearchBar Types
export interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onFilterPress: () => void;
    onSortPress: () => void;
    placeholder?: string;
}

// FilterModal Types
export interface FilterOptions {
    dateFilter: string;
    timeFilter: string;
}

export interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterOptions) => void;
    currentFilters: FilterOptions;
}

// SortModal Types
export type SortOption = 'date' | 'name' | 'status';

export interface SortModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (sortBy: SortOption) => void;
    currentSort: SortOption;
}

// TodoListHeader Types
export interface TodoListHeaderProps {
    selectedCount?: number;
    onDeletePress?: () => void;
    onClearSelection?: () => void;
}

// AddButton Types
export interface AddButtonProps {
    onPress: () => void;
}

export interface TodoListHeaderProps {
    onCancel: () => void;
    onDelete: () => void;
    selectedIds: any
}

export interface AddButtonProps {
    onPress: () => void
}