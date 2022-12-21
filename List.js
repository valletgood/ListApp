import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { theme } from './colors';
import { Feather } from '@expo/vector-icons';

const List = ({ toDos, working, saveToDos, setToDos, done, setDone, doneToDo }) => {

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

    console.log(toDos)
    const editToDo = async (key) => {
        const target = toDos[key]
    }

    return (
        Object.keys(toDos).map(key =>
            toDos[key].working === working
                ?
                <View style={styles.toDo} key={key}>
                    <Text style={{ ...styles.toDoText, textDecorationLine: toDos[key].done ? 'line-through' : 'none' }}>{toDos[key].text}</Text>
                    <View style={styles.toDoBtns}>
                        <TouchableOpacity style={styles.toDoBtn} onPress={() => doneToDo(key)}>
                            <Text>
                                <Feather name="check" size={24} color={theme.grey} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toDoBtn} onPress={() => deleteToDo(key)}>
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
                :
                null)
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
    }
})


export default List;