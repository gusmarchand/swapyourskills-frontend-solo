import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function BtnCategory(props) {
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
    justifyContent: "space-between",
    height: 56,
    backgroundColor: "#FE816C",
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: "white",
    fontFamily: "Quicksand_700Bold",
    fontSize: 34,
  },
});

export default BtnCategory;
