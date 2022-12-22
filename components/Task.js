import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import moment from "moment/moment";
const Task = ({ event,deleteTask}) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                {/* <TouchableOpacity style={styles.square}></TouchableOpacity> */}
                <View style={styles.itemTextContainer}>
                    <Text style={styles.eventTitle}>{event?.eventName}</Text>
                    <Text style={styles.eventDescription}>{event?.eventDescription}{"\n"}</Text>
                    <Text style={styles.date}>{moment(event?.date).format("ddd, MMM Do YYYY, h:mm a")}</Text>
                </View>
            </View>
            <Pressable style={styles.circular} onPress={()=>{deleteTask(event.eventName)}} />
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55bcf6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemTextContainer: {
        width: '90%'

    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55bcf6',
        borderWidth: 2,
        borderRadius: 5
    },
    eventTitle:{
        fontWeight:"bold",
        fontSize:17
    },
    date:{
        fontSize:12,
        color:'grey'
    }
})
export default Task;