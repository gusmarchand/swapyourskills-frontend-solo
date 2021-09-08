import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import CardsMini from "../Shared-components/CardsMini";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import envs from "../config/env";

function PublicProfil(props) {
  const [userSkills, setuserSkills] = useState([]);
  let navigation = useNavigation();
  let user = props.selectedSkill.teacher;
  const { PROD_BACKEND_URL } = envs;

  const baseUrl = PROD_BACKEND_URL;

  /**   Hook d'effet à l'initialisation du composant pour récupérer les skills du user dont le profil est affiché */

  useEffect(() => {
    let request = axios.post(`${baseUrl}skills/searchUserskills`, {
      userId: user._id,
    });
    request
      .then((res) => {
        setuserSkills(res.data);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  /**   return du composant */

  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={() => navigation.goBack()}
        name="cancel"
        size={40}
        color="#009688"
        style={{ marginTop: 20, marginLeft: 5 }}
      />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          position: "absolute",
          top: "5%",
          left: 0,
          right: 0,
        }}
      >
        <Text style={styles.title}>welcome to {user.username}'s</Text>
        <Text style={styles.bio}>
          "Je suis passionné par l'informatique, l'aviation et les nouvelles
          technologies. Je suis curieux de tout, j'aime apprendre et j'aime
          également partager mes connaissances avec les autres."
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
      <View
        style={{
          alignItems: "center",
          backgroundColor: "rgba(254, 129, 108, 0.5)",
          height: "40%",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Text style={styles.text}>browse my skills</Text>
        <ScrollView horizontal style={styles.scrollhor}>
          {userSkills.map((card, i) => {
            return (
              <CardsMini
                onPress={() => {
                  console.log("selcetedskill in profil minicards : ", card);
                  props.addSelectedSkill(card);
                  props.navigation.navigate("Skill");
                }}
                key={i}
                cardData={card}
              ></CardsMini>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  scrollhor: {
    marginTop: "auto",
    marginBottom: 0,
    width: "100%",
  },
  text: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
    color: "#fff",
    marginVertical: 10,
  },
  bio: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
    color: "#009688",
    marginVertical: 10,
    textAlign: "justify",
    width: "80%",
    paddingVertical: 10,
  },
  title: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 30,
    color: "#009688",
    marginTop: 30,
    textAlign: "center",
    marginBottom: 10,
  },
});

function mapStateToProps(state) {
  return { selectedSkill: state.selectedSkill };
}

function mapDispatchToProps(dispatch) {
  return {
    addSelectedSkill: function (skill) {
      dispatch({ type: "addSelectedSkill", skill: skill });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfil);
