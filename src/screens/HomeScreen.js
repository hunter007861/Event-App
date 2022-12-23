import { useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from '../components/Task';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import AddModal from '../components/AddModal';

const HomeScreen = () => {
  const [task, setTask] = useState({});
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  async function schedulePushNotification({ task, date }) {

    const trigger = new Date(date);
    console.log(trigger)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: task?.eventName,
        body: task?.eventDescription,
        sound: 'default',
        vibrate: true
      },
      trigger,
      repeats: true,
    });
  }

  useEffect(() => {
    AsyncStorage.getItem("storedData").then(data => {
      if (data !== null) {
        setTaskItems(JSON.parse(data))
      }
    }).catch((e) => {
      console.log(e)
    })
  }, [])

  const addTask = async () => {
    await AsyncStorage.setItem('storedData', JSON.stringify([...taskItems, { ...task, date: date }])).then(() => {
      schedulePushNotification({ task, date });
      setTaskItems([...taskItems, { ...task, date: date }])
      setTask({})
      setDate(new Date())
      Keyboard.dismiss();
      setModalVisible(!modalVisible)
    }).catch((e) => {
      console.log(e)
    })
  }

  const deleteTask = async (id) => {
    let _tasks = taskItems.filter((val) => val.eventName !== id);
    await AsyncStorage.setItem('storedData', JSON.stringify(_tasks)).then(() => {
      setTaskItems(_tasks);
    })
  };

  const onInputChange = (e, name) => {
    const val = (e) || '';
    let _task = { ...task };
    _task[`${name}`] = val;
    setTask(_task);
  };
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>All Event</Text>
        <ScrollView style={styles.item}>
          {
            taskItems.map((item, index) => {
              return (<Task key={index} event={item} deleteTask={deleteTask} />)
            })
          }
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.AddWrapper} onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.addText}>
          <Text style={styles.textStyle}>Add New Event</Text>
        </View>
      </TouchableOpacity>
      <AddModal setModalVisible={setModalVisible} modalVisible={modalVisible} onInputChange={onInputChange} addTask={addTask}/>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 70,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  item: {
    marginTop: 15,
    height: "80%",
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  AddWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    justifyContent: 'center',
    padding: 15,
    width: 310,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    marginBottom: 10,
  },
  inputArea: {
    justifyContent: 'center',
    padding: 15,
    width: 310,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    marginBottom: 10,
    height: 100,
    textAlign: 'top',
  },
  addText: {
    width: "80%",
    height: 60,
    backgroundColor: '#000',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "#000",
  },
  buttonClose: {
    backgroundColor: "#000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen