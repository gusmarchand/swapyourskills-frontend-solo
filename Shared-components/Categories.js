import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";

function Categories(props) {
  let catList = [
    "Cuisine",
    "Bricolage",
    "Jardinage",
    "Education",
    "Informatique",
    "Musique",
    "Sport",
    "Loisirs",
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        {catList.map((cat, i) => {
          return (
            <ListItem
              key={i}
              onPress={() => {
                {
                  props.toggleOverlay("switch", i, cat);
                  props.addCategories(cat);
                }
              }}
            >
              <ListItem.Content
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ListItem.Title style={styles.category}>{cat}</ListItem.Title>
                <ListItem>
                  <Entypo name="triangle-right" size={25} color="#009688" />
                </ListItem>
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

// function mapStateToProps(state) {
//   return { cat: state.categoriesList };
// }

function mapDispatchToProps(dispatch) {
  return {
    addCategories: function (categories) {
      dispatch({ type: "addCategories", categories: categories });
    },
  };
}

export default connect(null, mapDispatchToProps)(Categories);
