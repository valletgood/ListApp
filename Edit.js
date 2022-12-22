import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from './colors';

const Edit = ({ toDo, toDos, saveToDos, setIsEdit }) => {

    const [newText, setNewText] = useState()

    const editList = async () => {
        const newToDos = { ...toDos }
        toDo.text = newText
        saveToDos(newToDos)
        setIsEdit(false)
    }

    const onChangeText = (e) => {
        setNewText(e)
    }

    const toggleEdit = () => {
        setIsEdit((prev => !prev))
    }

    useEffect(() => {
        setNewText(toDo.text)
    }, [])

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Edit your ToDo"
                onChangeText={onChangeText}
                onSubmitEditing={editList}
                returnKeyType='done'
                value={newText}
            />
            <TouchableOpacity style={{ margin: 5 }} onPress={() => toggleEdit()}>
                <Text>
                    <Feather name="edit" size={24} color={theme.grey} />
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 20,
        fontSize: 15,
    },
})
export default Edit;