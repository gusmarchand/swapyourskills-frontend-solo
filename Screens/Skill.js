import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../Shared-components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import CardsXl from "../Shared-components/CardsXl";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import BtnBottomLarge from "../Shared-components/buttons/btnBottomLarge";
import axios from "axios";
import CardsMini from "../Shared-components/CardsMini";
import { Ionicons } from "@expo/vector-icons";

function Skill(props) {
  // const baseUrl = "https://172.17.1.137:19000"
  const baseUrl = "https://swapyourskills.herokuapp.com/"; // Heroku
  const navigation = useNavigation();
  let selectedSkill = props.selectedSkill;
  const [searchList, setSearchList] = useState([]);

  const resetAll = () => {
    props.resetCat;
    props.resetSubCat;
  };

  let goThen = () => {
    console.log("user in skill", props.user);
    if (props.user._id === undefined) {
      navigation.navigate("Signup", { previous: "skills" });
    } else {
      console.log(" skill to message ok");
      navigation.navigate("Message");
      //resetAll();
    }
  };

  useEffect(() => {
    console.log("selectedSkill :", selectedSkill);
    let request = axios.post(`${baseUrl}skills/searchskills`, {
      cat: selectedSkill.category,
    });
    request
      .then((res) => {
        setSearchList(res.data.searchedSkills);
      })
      .catch((err) => console.log("err:", err));
    console.log("searchList: ", searchList);
  }, [props.selectedSkill]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          onPress={() => navigation.goBack()}
          name="cancel"
          size={40}
          color="#009688"
          style={{ marginTop: 20, marginLeft: 5 }}
        />
      </View>

      <CardsXl
        onPress={() => navigation.navigate("ProfilPublic")}
        cardDataXl={selectedSkill}
      ></CardsXl>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "rgba(254, 129, 108, 0.5)",
        }}
      >
        <Text style={styles.text}>other skills in the same category</Text>
        <ScrollView horizontal style={styles.scrollhor}>
          {searchList.map((card, i) => {
            return (
              <CardsMini
                onPress={() => props.addSelectedSkill(card)}
                key={i}
                cardData={card}
              ></CardsMini>
            );
          })}
        </ScrollView>
      </View>
      <BtnBottomLarge
        text={`talk with ${selectedSkill.teacher.username}`}
        onPress={() => {
          console.log("clik on talk with");
          goThen();
        }}
      />
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
});

function mapStateToProps(state) {
  return { selectedSkill: state.selectedSkill, user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    addSelectedSkill: function (skill) {
      dispatch({ type: "addSelectedSkill", skill });
    },
    resetCat: function () {
      dispatch({ type: "resetCat" });
    },
    resetSubCat: function () {
      dispatch({ type: "resetSubCat" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Skill);
