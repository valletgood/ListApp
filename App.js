import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from './List';

const STORAGE_KEY = '@toDos'

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('')
  const [toDos, setToDos] = useState({})
  const [done, setDone] = useState()
  useEffect(() => {
    loadToDos();
    setDone(false)
  }, [])

  // Travel을 터치하면 working을 false로 설정 후 travel 화면으로
  const travel = () => {
    setWorking(false);
  }

  // Work를 터치하면 working을 true로 설정 후 work 화면으로
  const work = () => {
    setWorking(true);
  }

  const onChangeText = (e) => {
    setText(e)
  }

  const addToDo = async () => {
    if (text === '') {
      return
    }
    const newToDos = {
      [Date.now()]: { text, working, done: false }, ...toDos
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (e) {
      Alert.alert({ e })
    }
  }

  // const doneToDo = async () => {
  //   console.log(Object.keys(toDos))
  // }

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    setToDos(JSON.parse(s))
  }

  const doneToDo = async (key) => {
    const target = toDos[key]
    const newToDos = { ...toDos }
    setDone((prev => !prev))
    target.done = done
    saveToDos(newToDos)
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: !working ? 'white' : theme.grey }}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input}
        placeholder={working ? 'Add To Do' : "Where do you want to go?"}
        onChangeText={onChangeText}
        onSubmitEditing={addToDo}
        returnKeyType='done'
        value={text}
      />
      <StatusBar style="light" />
      <ScrollView>
        <List toDos={toDos} working={working} saveToDos={saveToDos} setToDos={setToDos} done={done} setDone={setDone} doneToDo={doneToDo} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 45,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 15,
  },

});
