import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Modal, Alert, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from './colors';

const Edit = ({ toDo, toDos, saveToDos, setIsEdit, setModal, modal, before }) => {

    const [newText, setNewText] = useState()

    const editList = async () => {
        const newToDos = { ...toDos }
        if (newText.length < 1) {
            Alert.alert('한 글자 이상 입력해주세요!')
        } else if (newText === before) {
            Alert.alert('수정된 내용이 없습니다!')
        } else {
            toDo.text = newText
            saveToDos(newToDos)
            setIsEdit(false)
        }
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
        <View style={{ paddingVertical: 23, paddingHorizontal: 20, alignItems: 'center' }}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModal(!modal);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>수정 전 : {before}</Text>
                        <TextInput style={styles.input}
                            placeholder="Edit your ToDo"
                            onChangeText={onChangeText}
                            onSubmitEditing={editList}
                            returnKeyType='done'
                            value={newText}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => toggleEdit()}
                        >
                            <Text style={styles.textStyle}>수정 취소</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', }}>수정중...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 20,
        fontSize: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: theme.grey,
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: 'tomato',
        paddingHorizontal: 15
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    toDoText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
})
export default Edit;