import React from 'react'
import { View } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { WrapperContainer, ButtonComp, FormField, Scrollable, Header } from '@/components'
import { useDispatch } from '@/redux/hooks'
import { addTodo, updateTodo } from '@/redux/reducers/todos'
import { MainStackParamList } from '@/navigation/types'
import { showSuccessToast } from '@/utils/toast'
import { todoSchema, TodoFormData } from '@/utils/validationSchema'
import { styles } from './styles'

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'AddEditTodo'>
type RouteProps = RouteProp<MainStackParamList, 'AddEditTodo'>

const AddEditTodo = () => {
    const navigation = useNavigation<NavigationProp>()
    const route = useRoute<RouteProps>()
    const dispatch = useDispatch()

    const { mode, todo } = route.params
    const isEditMode = mode === 'edit'

    const { control, handleSubmit } = useForm<TodoFormData>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            name: todo?.name || '',
            description: todo?.description || '',
            dueDate: todo?.dueDate || '',
            dueTime: todo?.dueTime || '',
        },
    })

    const onSubmit = (data: TodoFormData) => {
        if (isEditMode && todo) {
            dispatch(
                updateTodo({
                    id: todo.id,
                    name: data.name.trim(),
                    description: data.description.trim(),
                    dueDate: data.dueDate.trim(),
                    dueTime: data.dueTime.trim(),
                })
            )
            showSuccessToast('Todo updated successfully', 'Success')
        } else {
            dispatch(
                addTodo({
                    name: data.name.trim(),
                    description: data.description.trim(),
                    dueDate: data.dueDate.trim(),
                    dueTime: data.dueTime.trim(),
                })
            )
            showSuccessToast('Todo added successfully', 'Success')
        }

        navigation.goBack()
    }

    return (
        <WrapperContainer>
            <View style={styles.container}>

                <Header
                    title={isEditMode ? 'Edit Todo' : 'Add Todo'} />

                <Scrollable hasInput containerStyle={styles.scrollStyle}>
                    <FormField
                        control={control}
                        name="name"
                        type="textInput"
                        label="Name"
                        placeholder="Enter todo name"
                        required
                    />

                    <FormField
                        control={control}
                        name="description"
                        type="textInput"
                        label="Description"
                        placeholder="Enter description"
                        required
                        multiline
                        numberOfLines={4}
                        style={styles.textArea}
                    />

                    <View style={styles.row}>
                        <View style={styles.halfWidth}>
                            <FormField
                                control={control}
                                name="dueDate"
                                type="dateTimePicker"
                                mode="date"
                                label="Due Date"
                                placeholder="Select date"
                                required
                            />
                        </View>

                        <View style={styles.halfWidth}>
                            <FormField
                                control={control}
                                name="dueTime"
                                type="dateTimePicker"
                                mode="time"
                                label="Time"
                                placeholder="Select time"
                                required
                            />
                        </View>
                    </View>

                    <ButtonComp
                        title={isEditMode ? 'Update Todo' : 'Add Todo'}
                        onPress={handleSubmit(onSubmit)}
                        style={styles.saveButton}
                    />
                </Scrollable>
            </View>
        </WrapperContainer>
    )
}

export default AddEditTodo
