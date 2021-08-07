import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

function SubCategories(props) {
  let subCatList = [
    [
      "Française",
      "Anglaise",
      "Américaine",
      "Hallal",
      "Casher",
      "Méditerranéenne",
      "Italienne",
      "Asiatique",
    ],
    [
      "Menuiserie",
      "Plomberie",
      "Electricité",
      "Outillage",
      "Peinture",
      "Gros-oeuvre",
    ],
    [
      "Potager",
      "Fleur",
      "Gazon/Pelouse",
      "Taille",
      "Arbres fruitiers",
      "Intérieurs",
    ],
    [
      "Sciences et technologie",
      "Littérature",
      "Langues",
      "Histoire/Géographie",
      "Droit",
      "Mathématiques",
      "Culture",
    ],
    [
      "Dépannage matériel",
      "Programmation",
      "Bureautique",
      "CAO",
      "Impression 3D",
      "Création/design",
      "Réseaux",
      "Réseaux Sociaux",
    ],
    [
      "Instruments à vents",
      "Instruments à cordes",
      "Instruments numériques",
      "Chant",
      "Solfège",
      "Compositions",
      "MAO",
    ],
    [
      "Yoga",
      "Course à pieds",
      "Tennis",
      "Cyclisme",
      "Football",
      "Escalade",
      "Roller",
      "Skateboard",
      "Ski/Snowboard",
    ],
    [
      "Couture",
      "Crochet",
      "Tricot",
      "Tapisserie",
      "Photographie",
      "Décoration",
      "Peinture",
      "Poterie",
    ],
  ];

  let catIndex = props.catIndex;
  return (
    <View style={styles.container}>
      <ScrollView>
        {subCatList[catIndex].map((subCat, i) => {
          return (
            <ListItem
              key={i}
              onPress={() => {
                props.toggleOverlay("close", subCat);
                props.addSubCategories(subCat);
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={styles.category}>
                  {subCat}
                </ListItem.Title>
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

function mapStateToProps(state) {
  return { cat: state.categoriesList };
}

function mapDispatchToProps(dispatch) {
  return {
    addSubCategories: function (subCategories) {
      dispatch({ type: "addSubCategories", subCategories: subCategories });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategories);
