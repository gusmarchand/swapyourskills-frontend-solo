import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BtnGrand from "../Shared-components/buttons/btnGrand";
import Header from "../Shared-components/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

function Signup(props) {
  console.log("Keyboard", Keyboard);
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    avatar: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    avatar: "",
  });

  let dispatch = useDispatch();
  const route = useRoute();

  const navigation = useNavigation();

  const baseUrl = "https://swapyourskills.herokuapp.com/"; // Heroku

  const avatar = [
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629224/skill%27s%20images/Avatars/avatar13_pwzsk2.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629224/skill%27s%20images/Avatars/avatar12_wvj0r7.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629224/skill%27s%20images/Avatars/avatar14_lq14jp.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629224/skill%27s%20images/Avatars/avatar11_nuljdd.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629224/skill%27s%20images/Avatars/avatar10_ayhepp.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629223/skill%27s%20images/Avatars/avatar9_gxwx5g.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629223/skill%27s%20images/Avatars/avatar8_uy2c3t.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629223/skill%27s%20images/Avatars/avatar7_jcm3b7.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629223/skill%27s%20images/Avatars/avatar3_poimdw.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629223/skill%27s%20images/Avatars/avatar5_mv8hdx.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629223/skill%27s%20images/Avatars/avatar6_qt1zq6.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629223/skill%27s%20images/Avatars/avatar2_xdaduz.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629223/skill%27s%20images/Avatars/avatar4_lhtcii.png",
    "https://res.cloudinary.com/swap-your-skills/image/upload/v1627629223/skill%27s%20images/Avatars/avatar1_xxosyg.png",
  ];
  const avatarlist = avatar.map((img, index) => {
    return (
      <Pressable key={index} onPress={() => setForm({ ...form, avatar: img })}>
        <Image
          key={index}
          style={{
            margin: 10,
            height: form.avatar === img ? 65 : 50,
            width: form.avatar === img ? 65 : 50,
            borderColor: "#FE816C",
            borderWidth: form.avatar === img ? 3 : 0,
            borderRadius: 50,
          }}
          source={{ uri: img }}
        />
      </Pressable>
    );
  });

  const handleChange = (value, name) => {
    setForm({ ...form, [name]: value });
  };

  const sendForm = () => {
    // console.log('verif des 2 password:', form.password === form.confirmPassword);
    if (form.password === form.confirmPassword) {
      let request = axios.post(`${baseUrl}users/signup`, form);
      request
        .then((res) => {
          console.log("response server:", res.data);
          if (res.data.status === false) setError(res.data.message);
          if (res.data.status === true) {
            AsyncStorage.setItem("token", res.data.message.token); // Ajout du token en localStorage
            AsyncStorage.setItem("alreadySeen", "true"); // MEP clé alreadyseen dans localstorage, pour davoir Signup/Signin
            dispatch({ type: "addUser", payload: res.data.message }); // MEP info user dans le store
            route.params.previous === "skills" //vérifie d'où vient si il y des infos dans les params pour redirection vers message si le user était sur un skill avant de s'incrire
              ? props.navigation.navigate("Message") // MECANIQUE A RETESTER !!!!
              : props.navigation.navigate("Main");
          }
        })
        .catch((err) => console.log("err:", err));
    } else {
      setError({ ...error, password: "Les 2 mots de passe sont différents" });
    }
  };

  //const { previous } = route.params;
  //console.log("previous params", previous);

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />

      <View style={styles.containerLayout}>
        <Text style={styles.title}>sign up</Text>

        <View style={{ width: "92%" }}>
          <View style={styles.containerForm}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
            >
              <Text style={styles.label}>nickname</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => handleChange(value, "username")}
                value={form.username}
                placeholder="choose a nickname"
                keyboardType="default"
                placeholderTextColor="#A9A9A9"
              />
              {error.username ? (
                <Text style={styles.error}>{error.username}</Text>
              ) : null}

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
                onChangeText={(value) => handleChange(value, "password")}
                value={form.password}
                placeholder="choose a tricky password"
                keyboardType="default"
                secureTextEntry={true}
                placeholderTextColor="#A9A9A9"
              />
              {error.password ? (
                <Text style={styles.error}>{error.password}</Text>
              ) : null}

              <Text style={styles.label}>confirm password</Text>

              <TextInput
                name="confirmPassword"
                style={styles.input}
                onChangeText={(value) => handleChange(value, "confirmPassword")}
                value={form.confirmPassword}
                placeholder="confirm your tricky password"
                keyboardType="default"
                secureTextEntry={true}
                placeholderTextColor="#A9A9A9"
              />

              <Text style={styles.label}>choose an avatar</Text>
              <ScrollView horizontal>{avatarlist}</ScrollView>
              {error.avatar ? (
                <Text style={styles.error}>{error.avatar}</Text>
              ) : null}
            </KeyboardAvoidingView>
          </View>

          <Pressable onPress={() => props.navigation.navigate("Signin")}>
            <Text style={styles.signin}>sign in</Text>
          </Pressable>
        </View>

        <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
          <BtnGrand text="go back" onPress={props.navigation.goBack} />
          <BtnGrand text="sign up" onPress={sendForm} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerLayout: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    color: "#009688",
    fontSize: 34,
    fontFamily: "Quicksand_700Bold",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  input: {
    height: 40,
    width: "90%",
    marginLeft: "5%",
    borderColor: "#FE816C",
    borderRadius: 2,
    paddingHorizontal: 15,

    backgroundColor: "white",
    // shadowColor: "red",
    //shadowOpacity: 0.5,
    elevation: 4,
    // shadowRadius: 4,
    // shadowOffset: { width: 2, height: 2 },
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
  },
  signin: {
    color: "#FE816C",
    textAlign: "right",
    margin: 10,
    marginTop: 5,
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Quicksand_700Bold",
  },
});

export default Signup;
