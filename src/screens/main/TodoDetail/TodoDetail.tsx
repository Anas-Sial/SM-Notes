import React from 'react'
import { View, Alert } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { WrapperContainer, TextComp, Header, Scrollable, Pressable } from '@/components'
import { MainStackParamList } from '@/navigation/types'
import { SCREEN } from '@/navigation/screenNames'
import { useDispatch } from '@/redux/hooks'
import { toggleTodoComplete, deleteTodo } from '@/redux/reducers/todos'
import { showSuccessToast } from '@/utils/toast'
import commonStyles from '@/styles/commonStyles'
import { formatDate } from '@/utils/helper'
import { styles } from './styles'
import { CalenderIcon, ClockIcon } from '@/assets/icons'

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'TodoDetail'>
type RouteProps = RouteProp<MainStackParamList, 'TodoDetail'>

const TodoDetail = () => {
    const navigation = useNavigation<NavigationProp>()
    const route = useRoute<RouteProps>()
    const dispatch = useDispatch()
    const { todo } = route?.params || {}

    const handleEdit = () => {
        navigation.navigate(SCREEN.ADD_EDIT_TODO, { mode: 'edit', todo })
    }

    const handleDelete = () => {
        Alert.alert(
            'Delete Todo',
            'Are you sure you want to delete this todo?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(deleteTodo(todo.id))
                        showSuccessToast('Todo deleted successfully', 'Success')
                        navigation.goBack()
                    }
                }
            ]
        )
    }

    const handleToggleComplete = () => {
        dispatch(toggleTodoComplete(todo.id))
    }

    return (
        <WrapperContainer>
            <View style={styles.container}>
                <Header
                    title="Todo Details"
                    onEditPress={handleEdit}
                    onDeletePress={handleDelete} />

                <Scrollable containerStyle={styles.scrollContent}>

                    {/* Status Badge */}
                    <Pressable
                        style={[
                            styles.statusBadge,
                            todo.completed ? styles.statusCompleted : styles.statusPending
                        ]}
                        onPress={handleToggleComplete}
                    >
                        <TextComp
                            text={todo.completed ? 'Completed' : 'Pending'}
                            style={styles.statusText}
                        />
                    </Pressable>

                    <View style={commonStyles.rowJustify}>
                        <View style={commonStyles.flexRowGap}>
                            <CalenderIcon />
                            <TextComp
                                text={formatDate(todo.dueDate)}
                                style={styles.dateTime}
                            />
                        </View>

                        <View style={commonStyles.flexRowGap}>
                            <ClockIcon />
                            <TextComp
                                text={todo.dueTime}
                                style={styles.dateTime}
                            />
                        </View>
                    </View>

                    <TextComp
                        text={todo.name}
                        style={styles.title}
                    />

                    <TextComp
                        text={todo.description}
                        style={styles.description}
                    />

                </Scrollable>
            </View>
        </WrapperContainer>
    )
}

export default TodoDetail