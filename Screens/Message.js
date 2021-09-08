import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Header from "../Shared-components/Header";
import { connect } from "react-redux";
import axios from "axios";
import BtnGrand from "../Shared-components/buttons/btnGrand";

import envs from "../config/env";

/* COMPOSANT D'ENVOI DU PREMIER MESSAGE POUR LA PRISE DE CONTACT  */

function Message(props) {
  const [message, setMessage] = useState("");
  let teacher = props.selectedSkill.teacher;
  let user = props.user;

  const { PROD_BACKEND_URL } = envs;

  const baseUrl = PROD_BACKEND_URL;

  const sendMessage = () => {
    //définition de l'objet à envoyer au back à l'envoi du message
    let form = {
      content: message,
      skillId: props.selectedSkill._id,
      receiverId: teacher._id,
      senderId: user._id,
    };

    // requete pour l'envoi du mess en BDD
    let request = axios.post(`${baseUrl}messages/createmessage`, form);
    request
      .then((res) => {
        console.log("reponse req addMessage:", res.data);
        props.navigation.navigate("Profil");
        setMessage("");
      })
      .catch((err) => console.log("err:", err));
  };

  /* return du composant */
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.title}>get in touch to swap</Text>
        <View style={{ width: "92%" }}>
          <View style={styles.containerForm}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setMessage(value)}
              value={message}
              placeholder={`your first message to ${teacher.username}`}
              keyboardType="default"
              blurOnSubmit={true}
              returnKeyType="done"
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            position: "absolute",
            bottom: 30,
          }}
        >
          <BtnGrand text="go back" onPress={props.navigation.goBack} />
          <BtnGrand text="send" onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 34,
    color: "#009688",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 30,
    color: "#009688",
    alignSelf: "flex-start",
    margin: 10,
  },
  label: {
    color: "#009688",
    marginLeft: "5%",
    marginVertical: 10,
    fontFamily: "Quicksand_700Bold",
    fontSize: 30,
    marginTop: 30,
  },
  containerForm: {
    backgroundColor: "rgba(0, 150, 136, 0.5)",
    marginTop: 30,
    width: "100%",
    borderRadius: 12,
    paddingBottom: 50,
    height: "40%",
    marginTop: "25%",
  },
  input: {
    //borderWidth: 1,
    height: "100%",
    width: "90%",
    marginLeft: "5%",
    borderColor: "#FE816C",
    fontSize: 20,
    padding: 0,
    borderRadius: 2,
    paddingHorizontal: 8,
    textAlignVertical: "center",
  },
});

function mapStateToProps(state) {
  return { selectedSkill: state.selectedSkill, user: state.user };
}

export default connect(mapStateToProps, null)(Message);
