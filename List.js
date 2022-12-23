import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { theme } from './colors';
import { Feather } from '@expo/vector-icons';
import Edit from './Edit';
import { Fontisto } from '@expo/vector-icons';

const List = ({ toDos, state, saveToDos, working, setToDos }) => {

    // 모달
    const [modal, setModal] = useState(false);

    const [done, setDone] = useState()

    const [newText, setNewText] = useState()

    const [isEdit, setIsEdit] = useState()

    const [editItem, setEditItem] = useState();
    const deleteToDo = async (key) => {
        if (Platform.OS === 'web') {
            const ok = confirm('정말 삭제하시겠습니까?')
            if (ok) {
                const newToDos = { ...toDos }
                delete newToDos[key]
                setToDos(newToDos);
                saveToDos(newToDos);
            }
        } else {
            Alert.alert("리스트 삭제",
                "정말 삭제하시겠습니까?",
                [
                    {
                        text: '삭제',
                        style: 'destructive',
                        onPress: () => {
                            const newToDos = { ...toDos }
                            delete newToDos[key]
                            setToDos(newToDos);
                            saveToDos(newToDos);
                        }
                    },
                    { text: "취소" },
                ]);
        }
    }

    const toggleEdit = (key) => {
        setIsEdit((prev => !prev))
        setNewText(toDos[key].text)
        setEditItem(key)
        setModal((prev => !prev))
    }

    const doneToDo = async (key) => {
        const target = toDos[key]
        const newToDos = { ...toDos }
        setDone((prev => !prev))
        target.done = !target.done
        saveToDos(newToDos)
    }

    return (
        state ? (
            Object.keys(toDos).map(key =>
                toDos[key].working === working && (
                    isEdit &&
                        key === editItem ?
                        (
                            <View style={styles.editItem} key={key}>
                                <Edit id={key} toDo={toDos[key]} saveToDos={saveToDos} setIsEdit={setIsEdit} toDos={toDos} setModal={setModal} modal={modal}
                                    before={newText} />
                            </View>
                        )
                        :
                        (
                            <View style={styles.toDo} key={key}>
                                <TouchableOpacity style={styles.toDoBtn} onPress={() => doneToDo(key)}>
                                    <Text>
                                        {toDos[key].done === false ?
                                            <Fontisto name="checkbox-passive" size={24} color={theme.grey} />
                                            :
                                            <Fontisto name="checkbox-active" size={24} color={theme.grey} />
                                        }
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', textDecorationLine: toDos[key].done === true ? 'line-through' : 'none' }}>
                                    {toDos[key].text}
                                </Text>
                                <View style={styles.toDoBtns}>
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
            ))
            :
            Object.keys(toDos).map(key =>
                toDos[key].working === false && (
                    isEdit && key === editItem ? (
                        <View style={styles.editItem} key={key}>
                            <Edit toDo={toDos[key]} saveToDos={saveToDos} setIsEdit={setIsEdit} toDos={toDos} />
                        </View>
                    )
                        :
                        (
                            <View style={styles.toDo} key={key}>
                                <TouchableOpacity style={styles.toDoBtn} onPress={() => doneToDo(key)}>
                                    <Text>
                                        {toDos[key].done === false ?
                                            <Fontisto name="checkbox-passive" size={24} color={theme.grey} />
                                            :
                                            <Fontisto name="checkbox-active" size={24} color={theme.grey} />
                                        }
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', textDecorationLine: toDos[key].done ? 'line-through' : 'none' }}>{toDos[key].text}</Text>
                                <View style={styles.toDoBtns}>
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
        overflow: 'hidden'
    },
    toDoText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
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
    editItem: {
        backgroundColor: theme.toDoBg,
        marginBottom: 10,
        borderRadius: 15,
        paddingHorizontal: 20,

    }
})


export default List;