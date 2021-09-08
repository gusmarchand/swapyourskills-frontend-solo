import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
let logo = require("../assets/images/logo.png");
import { useRoute } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { connect } from "react-redux";
import envs from "../config/env";

function Header(props) {
  let defaultAvatar =
    "https://swapyourskills.herokuapp.com/images/neutralAvatar.png";
  let dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute(); // Pour avoir le nom de la route

  const user = useSelector((state) => state.user);

  const { PROD_BACKEND_URL } = envs;

  const baseUrl = PROD_BACKEND_URL;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 90,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      padding: 5,
      backgroundColor: "rgba(0, 150, 136, 0.5)",
      marginTop: 0,
    },
    avatar: {
      width: 50,
      height: 50,
      opacity: 1,
      marginRight: 15,
      borderRadius: 50,
      borderColor: "rgba(254, 129, 108, 0.5)",
      borderWidth: 1.5,
    },
    logout: {
      width: 25,
      height: 25,
      opacity: 1,
      margin: 15,
      borderRadius: 50,
      borderColor: "rgba(254, 129, 108, 0.5)",
      borderWidth: 1.5,
    },
    logo: {
      width: 75,
      opacity: 1,
      marginLeft: 15,
      marginBottom: 10,
      borderRadius: 5,
      borderColor: "rgba(254, 129, 108, 0.5)",
      borderWidth: 1.5,
    },
  });

  const goTo = () => {
    AsyncStorage.getItem("token", function (error, data) {
      // console.log("local storage TOKEN: ", data);

      if (data !== null) {
        navigation.navigate("Profil");
      } else {
        AsyncStorage.getItem("alreadySeen", function (error, data) {
          // console.log("local storage ALREADY: ", data);
          if (data !== null) {
            navigation.navigate("Signin");
          } else {
            navigation.navigate("Signup");
          }
        });
      }
    });
  };

  const logout = () => {
    AsyncStorage.getItem("token", function (error, data) {
      console.log("local storage TOKEN: ", data);
      if (data !== null) {
        let request = axios.post(`${baseUrl}users/logout`, { token: data });
        request.then((res) => {
          if (res.data.status === true) {
            console.log(res.data.message);
            AsyncStorage.removeItem("token");
            dispatch({ type: "removeToken" });
            navigation.navigate("Main");
          }
          if (res.data.status === false) {
            console.log(res.data.message);
            navigation.navigate("Main");
          }
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          {
            navigation.navigate("Main");
          }
        }}
      >
        <Image style={styles.logo} source={logo} />
      </Pressable>

      {route.name !== "Profil" ? (
        <Pressable onPress={goTo}>
          <Image
            style={styles.avatar}
            source={{ uri: user.avatar || defaultAvatar }}
          />
        </Pressable>
      ) : (
        <Pressable onPress={() => logout()}>
          <Image
            style={styles.logout}
            source={require("../assets/images/logout.png")}
          />
        </Pressable>
      )}
    </View>
  );
}

export default Header;
