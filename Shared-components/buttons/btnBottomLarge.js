import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function BtnBottomLarge(props) {
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
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    maxHeight: 60,
    minHeight: 60,
    backgroundColor: "#FE816C",
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
  },
  text: {
    color: "white",
    fontFamily: "Quicksand_700Bold",
    fontSize: 34,
  },
});

export default BtnBottomLarge;
