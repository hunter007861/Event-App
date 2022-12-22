import { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState(["Event 1"]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const addTask = () => {
    setTaskItems([...taskItems, task])
    setTask("")
    Keyboard.dismiss();
  }
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>All Events</Text>
        <ScrollView style={styles.item}>
          {
            taskItems.map((item, index) => {
              return (<Task key={index} text={item} />)
            })
          }
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.AddWrapper} onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.addText}>
          <Text style={styles.textStyle}>Add New Event</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Event</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.writeTextWrapper}
            >
              <TextInput style={styles.input} placeholder={'Event Name'} onChangeText={e => setTask(e)} />
              <TextInput style={styles.inputArea} placeholder={'Event Description'} numberOfLines={10} onChangeText={e => setTask(e)} />
              <DateTimePicker mode="datetime" display='spinner' value={new Date()} />
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 90,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  item: {
    marginTop: 25,
    maxHeight: "85%"
  },
  AddWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    width:150,
    margin:5,
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
  modalButtonContainer:{
    flexDirection:"row",
    justifyContent:'center',
    alignItems:'center'
  }
});
