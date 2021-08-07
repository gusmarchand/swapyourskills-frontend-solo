import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import BtnGrand from "../Shared-components/buttons/btnGrand";
import Header from "../Shared-components/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

//home http://192.168.86.152:3000

//caps http://172.17.1.35:3000

function Signin(props) {
  const [form, setForm] = useState({ email: "", password: "" }); // Formulaire
  const [error, setError] = useState({ password: "", email: "" }); // Formulaire gestion des erreurs

  // const baseUrl = "http://172.17.1.137:3000/";
  const baseUrl = "https://swapyourskills.herokuapp.com/"; // Heroku

  let dispatch = useDispatch();
  const navigation = useNavigation();

  /**
   *
   * @param {String} value Valeur du champs
   * @param {String} name clé sur laquelle la valeur va être ajouté
   */
  const handleChange = (value, name) => {
    setForm({ ...form, [name]: value });
    setError({ password: "", email: "" });
  };

  const sendForm = () => {
    // Vérification password et email non vide
    if (form.password !== "" && form.email !== "") {
      let request = axios.post(`${baseUrl}users/signin`, form);
      request
        .then((res) => {
          console.log("res:", res.data);
          if (res.data.status === false) setError(res.data.message);
          if (res.data.status === true) {
            AsyncStorage.setItem("token", res.data.message.token); // Ajout du token en localStorage
            AsyncStorage.setItem("alreadySeen", "true"); // MEP clé alreadyseen dans localstorage, pour davoir Signup/Signin
            dispatch({ type: "addUser", payload: res.data.message }); // MEP info user dans le store
            navigation.navigate("Main");
          }
        })
        .catch((err) => console.log("err:", err)); // Gestion des erreurs HTTP
    } else {
      // gestion erreurs du form
      let myError = { password: "", email: "" };
      if (form.password === "") myError.password = "Saisissez un mot de passe";
      if (form.email === "") myError.email = "Saisissez un email";
      setError(myError);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={styles.containerLayout}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ width: "92%" }}
        >
          <Text style={styles.title}>connection</Text>

          <View style={styles.containerForm}>
            <Text style={styles.label}>email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChange(value, "email")}
              value={form.email}
              placeholder="your email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#A9A9A9"

            />
            {error.email ? (
              <Text style={styles.error}>{error.email}</Text>
            ) : null}

            <Text style={styles.label}>password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(value) => handleChange(value, "password")}
              value={form.password}
              placeholder="your password"
              keyboardType="default"
              autoCapitalize="none"
              placeholderTextColor="#A9A9A9"
            />
            {error.password ? (
              <Text style={styles.error}>{error.password}</Text>
            ) : null}
          </View>
          <Pressable onPress={() => props.navigation.navigate("Signup")}>
            <Text style={styles.signup}>sign up</Text>
          </Pressable>

          <View
            style={{ justifyContent: "space-around", flexDirection: "row" }}
          >
            <BtnGrand text="go back" onPress={props.navigation.goBack} />
            <BtnGrand text="connection" onPress={sendForm} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLayout: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",

    // backgroundColor: 'teal'
  },
  title: {
    color: "#009688",
    fontSize: 34,
    fontFamily: "Quicksand_700Bold",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  input: {
    //borderWidth: 1,
    height: 40,
    width: "90%",
    marginLeft: "5%",
    borderColor: "#FE816C",
    // borderWidth: 1,

    borderRadius: 2,
    paddingHorizontal: 15,

    backgroundColor: "white",
    // shadowColor: "red",
    // shadowOpacity: 0.99,
    // elevation: 4,
    // shadowRadius: 100,
    // shadowOffset: { width: 50, height: 15 },
  },
  label: {
    color: "#009688",
    marginLeft: "5%",
    marginVertical: 10,
    fontFamily: "Quicksand_700Bold",
    fontSize: 16,
    marginTop: 30,
  },
  error: {
    color: "#FF0000",
    marginLeft: "5%",
    fontFamily: "Quicksand_700Bold",
    fontSize: 14,
  },
  containerForm: {
    backgroundColor: "rgba(0, 150, 136, 0.5)",
    marginTop: 30,
    width: "100%",
    borderRadius: 12,
    paddingBottom: 50,
  },
  signup: {
    color: "#FE816C",
    textAlign: "right",
    margin: 10,
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Quicksand_700Bold",
  },
});

export default Signin;
