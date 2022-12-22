import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task,setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const addTask = () =>{
    setTaskItems([...taskItems,task])
    setTask("")
    Keyboard.dismiss();
  }
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>All Events</Text>
        <ScrollView style={styles.item}>
          {
            taskItems.map((item,index)=>{
              return(<Task key={index} text={item}/>)
            })
          }
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTextWrapper}
      >
        <TextInput style={styles.input} placeholder={'Add Your Event'} value={task} onChangeText={e => setTask(e)}/>
        <TouchableOpacity onPress={addTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View> 
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    maxHeight:"85%"
  },
  writeTextWrapper: {
    position:'absolute',
    bottom:40,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  input: {
    padding:15,
    width:250,
    backgroundColor:'#fff',
    borderRadius:60,
    borderColor:'#c0c0c0',
    borderWidth:1,
  },
  addWrapper: {
    width:60,
    height:60,
    backgroundColor:'#fff',
    borderRadius:60,
    borderColor:'#c0c0c0',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
  addText: {},
});
