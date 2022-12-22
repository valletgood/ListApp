import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { theme } from './colors';
import { Feather } from '@expo/vector-icons';
import Edit from './Edit';

const List = ({ toDos, state, saveToDos, working, setToDos, doneToDo, text, setText }) => {

    const [newText, setNewText] = useState()

    const [isEdit, setIsEdit] = useState(false)

    const editList = async () => {
        const newToDos = { ...toDos }
        saveToDos(newToDos)
        setIsEdit(false)
    }

    const onChangeText = (e) => {
        setNewText(e)
    }

    const deleteToDo = async (key) => {
        Alert.alert("Delete To Do",
            "Are you Sure?",
            [
                { text: "Cancel" },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const newToDos = { ...toDos }
                        delete newToDos[key]
                        setToDos(newToDos);
                        saveToDos(newToDos);
                    }
                }
            ]);
    }

    const toggleEdit = (key) => {
        setIsEdit((prev => !prev))
        setNewText(toDos[key].text)
        console.log(toDos.id)
    }

    return (
        state ? (
            Object.keys(toDos).map(key =>
                toDos[key].working === working &&
                <View style={styles.toDo} key={key}>
                    {isEdit ?
                        <Edit toDo={toDos[key]} saveToDos={saveToDos} setIsEdit={setIsEdit} toDos={toDos} />
                        :
                        <>
                            <Text style={{ ...styles.toDoText, textDecorationLine: toDos[key].done ? 'line-through' : 'none' }}>
                                {toDos[key].text}
                            </Text>
                            <View style={styles.toDoBtns}>
                                <TouchableOpacity style={styles.toDoBtn} onPress={() => doneToDo(key)}>
                                    <Text>
                                        <Feather name="check" size={24} color={theme.grey} />
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.toDoBtn} onPress={() => toggleEdit(key)}>
                                    <Text>
                                        <Feather name="edit" size={24} color={theme.grey} />
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.toDoBtn} onPress={() => deleteToDo(key)}>
                                    <Text>
                                        <Feather name="trash" size={24} color={theme.grey} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </View>
            )

        )
            :
            Object.keys(toDos).map(key =>
                toDos[key].working === false && (
                    <View style={styles.toDo} key={key}>
                        <Text style={{ ...styles.toDoText, textDecorationLine: toDos[key].done ? 'line-through' : 'none' }}>{toDos[key].text}</Text>
                        <View style={styles.toDoBtns}>
                            <TouchableOpacity style={styles.toDoBtn} onPress={() => doneToDo(key)}>
                                <Text>
                                    <Feather name="check" size={24} color={theme.grey} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.toDoBtn} onPress={() => toggleEdit(key)}>
                                <Text>
                                    <Feather name="edit" size={24} color={theme.grey} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.toDoBtn} onPress={() => deleteToDo(key)}>
                                <Text>
                                    <Feather name="trash" size={24} color={theme.grey} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            )
    )
}
const styles = StyleSheet.create({
    toDo: {
        backgroundColor: theme.toDoBg,
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toDoText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        textDecorationLine: 'line-through'
    },
    toDoBtns: {
        flexDirection: 'row',
    },
    toDoBtn: {
        marginHorizontal: 5
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


export default List;