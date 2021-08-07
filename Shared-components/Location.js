import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

function Location(props) {
  let citiesList = [
    "Paris",
    "Lyon",
    "Marseille",
    "Lille",
    "Nantes",
    "Bordeaux",
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {citiesList.map((city, i) => {
          return (
            <ListItem
              key={i}
              onPress={() => {
                props.addCity(city);

                props.toggleOverlayCity("close");
                console.log("city from Location overlay :", city);
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={styles.category}>{city}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 34,
    color: "#009688",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addCity: function (city) {
      console.log("city in dispatch :", city);
      dispatch({ type: "addCity", city: city });
    },
  };
}

export default connect(null, mapDispatchToProps)(Location);
