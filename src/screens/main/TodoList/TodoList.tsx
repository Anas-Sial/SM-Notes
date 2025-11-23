import React, { useState, useMemo, useEffect } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { WrapperContainer, TextComp, EmptyComp, AddButton, LoaderIndicator, TodoListHeader } from '@/components'
import { FilterModal, SearchBar, SortModal, TodoCard } from '@/components'
import type { FilterOptions } from '@/components/todo/FilterModal'
import type { SortOptions } from '@/components/todo/SortModal'
import { useDispatch, useSelector } from '@/redux/hooks'
import { deleteTodo, setTodos, setLoading, setError, toggleTodoComplete } from '@/redux/reducers/todos'
import { axiosGet } from '@/utils/utils'
import { TODOS } from '@/config/urls'
import { ApiTodo, Todo } from '@/models/Todo'
import { MainStackParamList } from '@/navigation/types'
import { SCREEN } from '@/navigation/screenNames'
import moment from 'moment'
import { styles } from './styles'
import { showErrorToast } from '@/utils/toast'

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'TodoList'>

const TodoList = () => {
    const navigation = useNavigation<NavigationProp>()
    const dispatch = useDispatch()
    const { todos, loading, lastFetched } = useSelector(state => state.todos)

    const [selectionMode, setSelectionMode] = useState(false)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    const [searchQuery, setSearchQuery] = useState('')
    const [filterModalVisible, setFilterModalVisible] = useState(false)
    const [sortModalVisible, setSortModalVisible] = useState(false)
    const [filters, setFilters] = useState<FilterOptions>({
        dateFilter: '',
        timeFilter: '',
    })
    const [sort, setSort] = useState<SortOptions>({
        field: 'none',
        order: 'asc',
    })

    useEffect(() => {
        const fetchTodos = async () => {
            if (todos.length === 0) {
                try {
                    dispatch(setLoading(true))

                    const apiTodos = await axiosGet<ApiTodo[]>(TODOS)

                    const transformedTodos: Todo[] = apiTodos.slice(0, 20).map(apiTodo => ({
                        id: apiTodo.id.toString(),
                        name: apiTodo.title,
                        description: `Task from user ${apiTodo.id}`,
                        dueDate: moment().add(Math.floor(Math.random() * 7), 'days').format('YYYY-MM-DD'),
                        dueTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        completed: apiTodo.completed,
                    }))

                    dispatch(setTodos(transformedTodos))
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch todos'
                    dispatch(setError(errorMessage))
                    showErrorToast(`Failed to fetch todos from server: ${errorMessage}`, 'Error')
                } finally {
                    dispatch(setLoading(false))
                }
            }
        }

        fetchTodos()
    }, [dispatch, todos.length, lastFetched])

    const filteredAndSortedTodos = useMemo(() => {
        let result = [...todos]

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                todo =>
                    todo.name.toLowerCase().includes(query) ||
                    todo.description.toLowerCase().includes(query)
            )
        }

        // Apply filters
        if (filters.dateFilter) {
            result = result.filter(todo => todo.dueDate === filters.dateFilter)
        }
        if (filters.timeFilter) {
            result = result.filter(todo => todo.dueTime === filters.timeFilter)
        }

        // Apply sorting
        if (sort.field !== 'none') {
            result.sort((a, b) => {
                let comparison = 0

                if (sort.field === 'name') {
                    comparison = a.name.localeCompare(b.name)
                } else if (sort.field === 'date') {
                    comparison = a.dueDate.localeCompare(b.dueDate)
                } else if (sort.field === 'time') {
                    comparison = a.dueTime.localeCompare(b.dueTime)
                }

                return sort.order === 'asc' ? comparison : -comparison
            })
        }

        return result
    }, [todos, searchQuery, filters, sort])

    const handleAddTodo = () => {
        navigation.navigate(SCREEN.ADD_EDIT_TODO, { mode: 'add' })
    }

    const handleTodoPress = (todo: Todo) => {
        navigation.navigate(SCREEN.TODO_DETAIL, { todo })
    }

    const handleTodoLongPress = (todo: Todo) => {
        Alert.alert(
            'Delete Todo',
            `Are you sure you want to delete "${todo.name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(deleteTodo(todo.id))
                    },
                },
            ]
        )
    }

    const handleCancelSelection = () => {
        setSelectionMode(false)
        setSelectedIds(new Set())
    }

    const handleDeleteSelected = () => {
        Alert.alert(
            'Delete Todos',
            `Are you sure you want to delete ${selectedIds.size} todo(s)?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        selectedIds.forEach(id => {
                            dispatch(deleteTodo(id))
                        })
                        handleCancelSelection()
                    },
                },
            ]
        )
    }

    const handleToggleComplete = (id: string) => {
        dispatch(toggleTodoComplete(id))
    }

    const renderTodoItem = ({ item }: { item: Todo }) => {
        const isSelected = selectedIds.has(item.id)
        return (
            <TodoCard
                todo={item}
                isSelected={isSelected}
                selectionMode={selectionMode}
                onPress={() => handleTodoPress(item)}
                onLongPress={() => handleTodoLongPress(item)}
                onToggleComplete={() => handleToggleComplete(item.id)}
            />
        )
    }

    return (
        <WrapperContainer>
            <View style={styles.container}>

                <View style={styles.header}>
                    {selectionMode ? (
                        <TodoListHeader
                            selectedIds={selectedIds}
                            onCancel={handleCancelSelection}
                            onDelete={handleDeleteSelected}
                        />
                    ) : (
                        <TextComp text="My Todos" style={styles.title} />
                    )}
                </View>

                {!selectionMode && (
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFilterPress={() => setFilterModalVisible(true)}
                        onSortPress={() => setSortModalVisible(true)}
                    />
                )}

                {loading ? (
                    <LoaderIndicator />
                ) : todos?.length === 0 ? (
                    <EmptyComp />
                ) : filteredAndSortedTodos?.length === 0 ? (
                    <EmptyComp title='No todos found matching your criteria' />
                ) : (
                    // <View style={{ flexGrow: 1 }}>
                    <FlatList
                        data={filteredAndSortedTodos}
                        renderItem={renderTodoItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.listContent}
                        columnWrapperStyle={styles.columnWrapper}
                        showsVerticalScrollIndicator={false}
                    />
                    // </View>
                )}

            </View>

            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={setFilters}
                currentFilters={filters}
            />

            <SortModal
                visible={sortModalVisible}
                onClose={() => setSortModalVisible(false)}
                onApply={setSort}
                currentSort={sort}
            />

            <AddButton onPress={handleAddTodo} />

        </WrapperContainer>
    )
}

export default TodoList