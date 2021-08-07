import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

function BtnDeroul(props) {
  let text = props.text;
  let onPress = props.onPress;


  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Entypo name="triangle-down" size={24} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    maxHeight: 46,
    minHeight:46,
    backgroundColor: "#FE816C",
    borderRadius: 5,
    margin: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.7,
    elevation: 2,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
  },
  text: {
    color: "white",
    fontFamily: "Quicksand_700Bold",
    fontSize: 18,
    marginLeft: 5,
  },
});

export default BtnDeroul;
