import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BtnMoyen from "./buttons/btnMoyen";

function CardsXl(props) {
  //console.log("props xlcard", props);
  let cardDataXl = props.cardDataXl;
  let onPress = props.onPress;
  //console.log("cardDataXl from XL  :", cardDataXl);

  return (
    <View style={styles.card}>
      <Image
        style={styles.img}
        source={{
          uri: cardDataXl.imgUrl,
        }}
      />

      <Text style={styles.title}>{cardDataXl.title}</Text>
      <Text style={styles.desc}>{cardDataXl.description}</Text>

      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
            width: "90%",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Quicksand_700Bold",
                fontSize: 15,
                color: "#fff",
                alignSelf: "flex-start",
                marginEnd: 10,
                marginVertical: 0,
              }}
            >
              {cardDataXl.teacher.username}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="ios-star-sharp" size={24} color="#FE816C" />
              <Ionicons name="ios-star-sharp" size={24} color="#FE816C" />
              <Ionicons name="ios-star-sharp" size={24} color="#FE816C" />
              <Ionicons name="ios-star-sharp" size={24} color="#FE816C" />
              <Ionicons
                name="ios-star-sharp"
                size={24}
                color="rgba(254, 129, 108, 0.3)"
              />
            </View>
          </View>
          <BtnMoyen text={"see profil"} onPress={onPress}></BtnMoyen>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50%",
    backgroundColor: "rgba(0, 150, 136, 0.5)",
  },
  img: {
    width: "100%",
    height: "45%",
  },
  title: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 30,
    color: "#fff",
    alignSelf: "center",
  },
  desc: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 14,
    color: "#000000",
    paddingHorizontal: 15,
    alignSelf: "center",
    textAlign: "justify",
    width: "100%",
  },
  userName: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 10,
    color: "#000000",
  },
});

export default CardsXl;
