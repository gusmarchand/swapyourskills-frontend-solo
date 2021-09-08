import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import axios from "axios";
import envs from "../config/env";

// page de navigation temporaire pour le dev

function Accueil(props) {
  let dispatch = useDispatch();

  // Heroku
  const { PROD_BACKEND_URL } = envs;

  const baseUrl = PROD_BACKEND_URL;

  // AsyncStorage.setItem("token", "HONtg3BjA8hGPVmcmpIMhg2Oz033h6ru")
  useEffect(() => {
    AsyncStorage.getItem("token", function (error, data) {
      console.log("Vérification local storage TOKEN: \u001b[1;32m", data);
      if (data !== null) {
        let request = axios.post(`${baseUrl}users/loaduser`, { token: data });
        request
          .then((res) => {
            console.log(
              "response verifition du token local storage au chargement:",
              res.data
            );
            if (res.data.status === true) {
              dispatch({ type: "addUser", payload: res.data.message });
            } else {
              AsyncStorage.removeItem("token");
            }
          })
          .catch((err) =>
            console.log(
              "Error chargement user dans le store temporaire.js 26:",
              err
            )
          );
      }
    });
  }, []);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Text>Page Temporaire</Text>
      <Button
        title="Go to Accueil"
        onPress={() => props.navigation.navigate("Accueil")}
      />
      <Button
        title="Go to Main Page"
        onPress={() => props.navigation.navigate("Main")}
      />
      <Button
        title="Go to Profil Page"
        onPress={() => props.navigation.navigate("Signup")}
      />
      <Button
        title="Go to Add Skill Page"
        onPress={() => props.navigation.navigate("AddSkill")}
      />
      <Button
        title="Go to Public Profil Page"
        onPress={() => props.navigation.navigate("ProfilPublic")}
      />
      <Button
        title="Go to Contact Page"
        onPress={() => props.navigation.navigate("Contact")}
      />
      <Button
        title="Go to Message Page"
        onPress={() => props.navigation.navigate("Message")}
      />
      <Button
        title="Se déconnecter"
        onPress={() => {
          AsyncStorage.getItem("token", function (error, data) {
            console.log("local storage TOKEN: ", data);
            if (data !== null) {
              let request = axios.post(`${baseUrl}users/logout`, {
                token: data,
              });
              request.then((res) => {
                if (res.data.status === true) {
                  console.log(res.data.message);
                  AsyncStorage.removeItem("token");
                  dispatch({ type: "removeToken" });
                }
                if (res.data.status === false) {
                  console.log(res.data.message);
                  props.navigation.navigate("Main");
                }
              });
            }
          });
        }}
      />
    </View>
  );
}

export default Accueil;
