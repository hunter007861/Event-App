import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react'
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const AddModal = ({modalVisible,setModalVisible,addTask, onInputChange, date, setDate}) => {
  return (
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
              <TextInput style={styles.input} placeholder={'Event Name'} onChangeText={e => onInputChange(e, "eventName")} />
              <TextInput style={styles.inputArea} placeholder={'Event Description'} numberOfLines={10} onChangeText={e => onInputChange(e, "eventDescription")} />
              <DateTimePicker mode="datetime" display='spinner' value={date} onChange={(e, v) => setDate(v)} />
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => addTask()}
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
  )
}
const styles = StyleSheet.create({
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
  }
})
export default AddModal