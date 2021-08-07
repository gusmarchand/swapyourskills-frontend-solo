import React from 'react';
import {View, Text, StyleSheet, TextInput, Image, Pressable} from "react-native";

function AgendaIcon() {

    const convert = date => {
        switch(date) {
            case 0: return 'Jan';
            case 1: return 'Fév';
            case 2: return 'Mars';
            case 3: return 'Avril';
            case 4: return 'Mai';
            case 5: return 'Juin';
            case 6: return 'Juil';
            case 7: return 'Aout';
            case 8: return 'Sept';
            case 9: return 'Oct';
            case 10: return 'Nov';
            case 11: return 'Déc';
        }
    }

    let date = new Date();
    const month = convert(date.getMonth()); /* Jun */
    const day = date.getDate();

    return (
        <View>
            <Image
            height={50}
            width={50}
            source={require('../assets/images/Agenda.png')}
            />
            <Text style={styles.month}>{month}</Text>
            <Text style={styles.day}>{day}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    month: {
      color: "white",
      fontSize: 20,
      fontFamily: "Quicksand_700Bold",
      position: 'relative',
      top: -62,
      left: 20
    },
    day: {
      color: "black",
      fontSize: 24,
      fontFamily: "Quicksand_700Bold",
      position: 'relative',
      top: -64,
      left: 26
    },
  });

export default AgendaIcon
