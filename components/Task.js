import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = ({ text }) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <View style={styles.itemTextContainer}>
                    <Text style={styles.eventTitle}>{text}</Text>
                    <Text style={styles.eventDescription}>{text}</Text>
                </View>
            </View>
            <View style={styles.circular}>

            </View>
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
        maxWidth: '80%'

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
    }
})
export default Task;