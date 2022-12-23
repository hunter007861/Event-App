import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React from 'react'
import { Modal, Platform, Pressable, TextInput, View } from 'react-native';

const AddModal = ({modalVisible,setModalVisible,addTask, onInputChange}) => {
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
              <DateTimePickerAndroid mode="datetime" display='spinner' value={date} onChange={(e, v) => setDate(v)} />
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

export default AddModal