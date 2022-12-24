import moment from 'moment';
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import AddModal from '../components/AddModal';
const QRScreen = () => {
  const [task,setTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const onInputChange = (e, name) => {
    const val = (e) || '';
    let _task = { ...task };
    _task[`${name}`] = val;
    setTask(_task);
  };

  const addTask = async () => {
    let _date = date.toISOString()
    console.log(_date)
    setTask({...task,date:_date});
    setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.QRScreenWrapper}>
       <View style={styles.QRScreen}>
           {task === null ? null: <QRCode size={250} value={`exp://192.168.0.116:19000/--/Home?eventName=${task.eventName}&eventDescription=${task.eventDescription}&date=${task.date}`}/>}
       </View>
       <TouchableOpacity style={styles.AddWrapper} onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.addText}>
          <Text style={styles.textStyle}>Add New Event</Text>
        </View>
      </TouchableOpacity>
      <AddModal setModalVisible={setModalVisible} modalVisible={modalVisible} onInputChange={onInputChange} addTask={addTask} date={date} setDate={setDate}/>
    </View>
  )
}
const styles = StyleSheet.create({
  QRScreenWrapper:{
    justifyContent:'center',
    alignItems:'center',
    width:"100%",
    height:"100%"
  },
  QRScreen:{
    width:250,
    height:250,
    borderColor:"#000",
    borderWidth:1
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
})
export default QRScreen