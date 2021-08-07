import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function BtnMoyen(props) {
  let text = props.text;
  let onPress = props.onPress;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 114,
    maxWidth: 114,
    alignItems: "center",
    justifyContent: "center",
    height: 43,
    maxHeight: 43,
    backgroundColor: "#FE816C",
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.7,
    elevation: 2,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
  },
  text: {
    color: "white",
    fontFamily: "Quicksand_700Bold",
    fontSize: 17,
  },
});

export default BtnMoyen;
