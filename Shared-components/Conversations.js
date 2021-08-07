import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { ListItem, Input } from "react-native-elements";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Conversations(props) {
  /*****    hook d'état contenant la liste des messages de cette conversation    *****/

  const [messageListState, setMessageListState] = useState([]);

  /*****    hook d'état temporaire pour traiter un nouveau message    *****/

  const [currentMessage, setCurrentMessage] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const userId = useSelector((state) => state.user);
  const conversationId = useSelector((state) => state.user.conversation);
  //console.log("userId:", userId);
  //console.log("conversationId:", conversationId);

  // const baseUrl = "http://172.17.1.137:3000/"; // Willem
  const baseUrl = "https://swapyourskills.herokuapp.com/"; // Heroku

  /*****    gestion du datepicker   *****/

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  /*****    initialisation de la référence pour l'auto-scroll   *****/
  let autoScrollView = useRef(null);

  /*****    hook d'effet pour initialiser la liste des messages depuis la BDD   *****/

  useEffect(() => {
    let request = axios.post(`${baseUrl}messages/readed`, conversationId);
    request
      .then((res) => {
        console.log("Retour BDD passage message en lus \u001b[1;32m", res.data);
      })
      .catch((err) => console.log("Requete mySkill error: ", err));
  }, []);

  /*****    hook d'effet pour passer les messages en "lus" en BDD   *****/

  useEffect(() => {
    let request = axios.post(`${baseUrl}messages/conversation`, conversationId);
    request
      .then((res) => {
        // console.log("INFORMATION BACKND", res.data.message);
        setMessageListState(res.data.message);
      })
      .catch((err) => console.log("Requete mySkill error: ", err));
  }, []);

  /*****    validation de la date sur le picker et création d'un message spécial    *****/

  const handleConfirm = (date) => {
    // création de l'objet à envoyer en BDD , on passe la date sélectionnée dans le contenu du message
    // et on indique via la key withAppointment à true que ce message est particulier
    let form = {
      content: date.toLocaleDateString(),
      skillId: conversationId.skillId,
      receiverId:
        userId._id === conversationId.senderId
          ? conversationId.receiverId
          : conversationId.senderId,
      senderId: userId._id,
      withAppointment: true,
    };

    // en request on envoie le message en BDD via le back
    // en request2 on récupère les messages de la BDD à jour
    let request = axios.post(`${baseUrl}messages/createmessage`, form);
    request
      .then((res) => {
        console.log("reponse req addMessage:", res.data);
        let request2 = axios.post(
          `${baseUrl}messages/conversation`,
          conversationId
        );
        request2
          .then((res) => {
            console.log("INFORMATION BACKND", res.data.message);
            setMessageListState(res.data.message);
          })
          .catch((err) => console.log("Requete mySkill error: ", err));

        setCurrentMessage("");
        hideDatePicker();
      })
      .catch((err) => console.log("err:", err));
  };

  /*****    validation ou non de la date dans le message spécial    *****/

  let confirmAppointment = (validatedDate, mess) => {
    // on repasse la date en format UTC
    let UTCAppDate = new Date(Date.parse(validatedDate));
    console.log("UTCAppDate :", UTCAppDate);

    // création de l'objet rdv à envoyer en BDD
    let form = {
      appointmentDate: UTCAppDate,
      skillId: mess.skillId,
      receiverId:
        userId._id === mess.senderId ? mess.receiverId : mess.senderId,
      senderId: userId._id,
      done: false,
    };

    // création de l'objet message de confirmation du rdv à envoyer en BDD en parallèle

    let formMessValid = {
      content: `Votre swap du ${validatedDate} a été confirmé, il apparaîtra dans votre agenda. Bon swap !`,
      skillId: mess.skillId,
      receiverId: mess.senderId,
      senderId: mess.receiverId,
      withAppointment: false,
    };

    // en request on envoie le rdv en BDD via le back
    // en request2 on envoie le message de confirmation en BDD
    // en request3 on modifie le message de proposition de rdv pour ne plus faire apparaitre les boutons de validations
    // en request4 on récupère les messages de la BDD
    console.log("mess", mess);

    let formSwap = {
      skillId: mess.skillId,
      receiverId:
        userId._id === mess.senderId ? mess.senderId : mess.receiverId,
    };
    let request = axios.post(`${baseUrl}appointments/createappointment`, form);
    request
      .then((res) => {
        console.log("reponse req addAppointment:", res.data);
        let request2 = axios.post(
          `${baseUrl}messages/createmessage`,
          formMessValid
        );
        request2
          .then((res) => {
            console.log("reponse req addMessage:", res.data);
            let request3 = axios.post(`${baseUrl}messages/update`, mess);
            request3
              .then((res) => {
                console.log("INFORMATION BACKND", res.data.message);
                let request4 = axios.post(
                  `${baseUrl}messages/conversation`,
                  conversationId
                );
                request4
                  .then((res) => {
                    console.log("INFORMATION BACKND", res.data.message);
                    setMessageListState(res.data.message);
                    let request5 = axios.post(
                      `${baseUrl}skills/addswap`,
                      formSwap
                    );
                    request5
                      .then((res) => {
                        console.log("INFORMATION BACKND", res.data.user);
                      })
                      .catch((err) =>
                        console.log("Requete mySkill error: ", err)
                      );
                  })
                  .catch((err) => console.log("Requete mySkill error: ", err));
              })
              .catch((err) => console.log("Requete mySkill error: ", err));

            setCurrentMessage("");
            Keyboard.dismiss();
          })
          .catch((err) => console.log("err:", err));
      })
      .catch((err) => console.log("err:", err));
  };

  /*****    envoie d'un nouveau message via l'input    *****/

  let onSubmit = () => {
    // création de l'objet message à envoyer en BDD
    let form = {
      content: currentMessage,
      skillId: conversationId.skillId,
      receiverId:
        userId._id === conversationId.senderId
          ? conversationId.receiverId
          : conversationId.senderId,
      senderId: userId._id,
      withAppointment: false,
    };

    // en request on envoie le message en BDD via le back
    // en request2 on récupère les messages de la BDD à jour
    let request = axios.post(`${baseUrl}messages/createmessage`, form);
    request
      .then((res) => {
        console.log("reponse req addMessage:", res.data);
        let request2 = axios.post(
          `${baseUrl}messages/conversation`,
          conversationId
        );
        request2
          .then((res) => {
            console.log("INFORMATION BACKND", res.data.message);
            setMessageListState(res.data.message);
          })
          .catch((err) => console.log("Requete mySkill error: ", err));

        setCurrentMessage("");
        Keyboard.dismiss();
      })
      .catch((err) => console.log("err:", err));
  };

  /*****    map sur la liste des messages avec mécanique pour différencier les messages émis/reçus et les messages contenant un rdv   *****/

  let messagesToChat = messageListState.map((mess, i) => {
    let validationDate;
    let messageDisplay = mess.content;

    //préparation d'un message automatique si le mess contient une date
    if (mess.withAppointment === true) {
      let date = mess.content;
      console.log("date map", date);
      messageDisplay = `Je vous propose de se retrouver le ${date}. Ok pour vous ?`;
      validationDate = (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginTop: "8%",
            backgroundColor: "rgba(255,255,255,0.2)",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <MaterialIcons
            onPress={() => confirmAppointment(date, mess)}
            name="check-circle"
            size={40}
            color="black"
          />
          <MaterialIcons
            onPress={() => console.log("cancel date")}
            name="cancel"
            size={40}
            color="black"
            style={{ marginLeft: 20 }}
          />
        </View>
      );
    }

    return (
      <ListItem.Content
        style={
          userId._id === mess.senderId
            ? styles.messageRight
            : styles.messageLeft
        }
        key={i}
      >
        <Text
          style={
            userId._id === mess.senderId ? styles.textRight : styles.textLeft
          }
        >
          {messageDisplay}
        </Text>
        {validationDate}
      </ListItem.Content>
    );
  });

  /*****    return général   *****/

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        locale="fr_FR"
        date={new Date()}
        value={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <ScrollView
        ref={autoScrollView}
        onContentSizeChange={(wicontentWidth, contentHeight) => {
          autoScrollView.current.scrollToEnd({ animated: true });
        }}
        style={{ marginTop: "5%", padding: 0 }}
      >
        {messagesToChat}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={{ width: "100%" }}>
          <Input
            containerStyle={{
              marginBottom: 5,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 10,
            }}
            placeholderTextColor="rgba(255,255,255,0.5)"
            placeholder="write a message or suggest a date =>"
            onChangeText={(val) => {
              setCurrentMessage(val);
            }}
            value={currentMessage}
            rightIcon={
              <Entypo
                onPress={showDatePicker}
                name="calendar"
                size={24}
                color="black"
              />
            }
          />
          <Pressable
            onPress={() => (currentMessage !== "" ? onSubmit() : null)}
            style={styles.containerBtn}
          >
            <Text style={styles.text}>send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  textLeft: {
    width: "100%",
    fontFamily: "Quicksand_400Regular",
    fontSize: 20,
    color: "grey",
    marginHorizontal: 8,
  },
  textRight: {
    justifyContent: "center",
    width: "100%",
    fontFamily: "Quicksand_400Regular",
    fontSize: 20,
    color: "pink",
    marginHorizontal: 8,
  },

  messageRight: {
    width: "75%",
    alignSelf: "flex-end",
    backgroundColor: "rgba(0, 150, 136, 0.5)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: "10%",
  },

  messageLeft: {
    width: "75%",
    alignSelf: "flex-start",
    backgroundColor: "pink",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: "10%",
  },
  containerBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    maxHeight: 60,
    minHeight: 60,
    backgroundColor: "rgba(0, 150, 136, 0.5)",
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontFamily: "Quicksand_700Bold",
    fontSize: 25,
  },
});

// function mapStateToProps(state) {
//   return { cat: state.categoriesList };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     addCategories: function (categories) {
//       dispatch({ type: "addCategories", categories: categories });
//     },
//   };
// }

export default Conversations;
