import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from './List';

const STORAGE_KEY = '@toDos'
const STATE_KEY = '@lastClick'

export default function App() {
  const [state, setState] = useState('');
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('')
  const [toDos, setToDos] = useState({})
  const ID = useRef(0)

  useEffect(() => {
    getState();
    loadToDos();
  }, [])

  // Travel을 터치하면 working을 false로 설정 후 travel 화면으로
  const travel = () => {
    setWorking(false)
    setState(false);
    saveState(false)
  }

  // Work를 터치하면 working을 true로 설정 후 work 화면으로
  const work = () => {
    setWorking(true)
    setState(true);
    saveState(true)
  }

  // 텍스트 입력값을 받아오는 함수
  const onChangeText = (e) => {
    setText(e)
    if (e.length > 20) {
      Alert.alert('입력 가능한 글자 수를 초과하였습니다!')
    }
  }

  // 리스트를 추가하는 함수
  const addToDo = async () => {
    if (text === '') {
      return
    } else {
      const newToDos = {
        [Date.now()]: { id: ID.current, text, working, done: false }, ...toDos
      };
      setToDos(newToDos);
      await saveToDos(newToDos);
      setText("");
      ID.current += 1
    }
  };

  // 리스트를 저장소에 저장하는 함수
  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (e) {
      Alert.alert({ e })
    }
  }

  // 리스트를 불러오는 함수
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    if (s) {
      setToDos(JSON.parse(s))
    }
  }
  // 마지막 터치를 저장하는 함수
  const saveState = async (state) => {
    await AsyncStorage.setItem(STATE_KEY, JSON.stringify(state))
  }

  // 마지막 터치를 불러오는 함수
  const getState = async () => {
    const g = await AsyncStorage.getItem(STATE_KEY)
    if (g === 'true') {
      setState(true)
    } else if (g === 'false') {
      setState(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: state ? 'white' : theme.grey }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: !state ? 'white' : theme.grey }}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input}
        placeholder={state ? '오늘의 할 일은 무엇인가요?' : "어디를 여행하고 싶으신가요?"}
        onChangeText={onChangeText}
        onSubmitEditing={addToDo}
        returnKeyType='done'
        value={text}
      />
      <StatusBar style="light" />
      <ScrollView>
        <List toDos={toDos} state={state} working={working} saveToDos={saveToDos} setToDos={setToDos} text={text} setText={setText} />
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
