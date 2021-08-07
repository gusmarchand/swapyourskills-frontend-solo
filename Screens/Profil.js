import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BtnGrand from "../Shared-components/buttons/btnGrand";
import Header from "../Shared-components/Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import AgendaIcon from "../Shared-components/AgendaIcon";
import Conversations from "../Shared-components/Conversations";
import { Input, Overlay, Badge } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-ratings";

import { connect } from "react-redux";
import Starscounter from "../Shared-components/Starscounter";

function Profil(props) {
  const [mySkills, setMySkills] = useState([]);
  const [messageRecap, setMessageRecap] = useState([]);
  const [mode, setMode] = useState("message");
  const [visible, setVisible] = useState(false);
  const [unreadMessage, setUnreadMessage] = useState({ list: [] });
  const [notation, setNotation] = useState(false);
  const [rdv, setRdv] = useState([]);
  // console.log('unreadMessage:', messageRecap)

  let dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.user);
  console.log("PROFIL user information: ", user);

  const conversationId = useSelector((state) => state.user.conversation);
  console.log("conversationId:", conversationId);

  // const baseUrl = "http://172.17.1.137:3000/"; // Willem
  const baseUrl = "https://swapyourskills.herokuapp.com/"; // Heroku
  // const baseUrl = "http://192.168.1.11:3000/";

  useEffect(() => {
    let request = axios.post(`${baseUrl}skills/myskills`, {
      token: user.token,
    });
    request
      .then((res) => setMySkills(res.data.message))
      .catch((err) => console.log("Requete mySkill error: ", err));

    let request2 = axios.post(`${baseUrl}appointments/getappointment`, {
      token: user.token,
    });
    request2
      .then((res) => {
        console.log("requete forRDV", res.data.message);
        setRdv(res.data.message);
      })
      .catch((err) => console.log("Requete appointement error 53: ", err));
  }, []);

  useEffect(() => {
    let request2 = axios.post(`${baseUrl}messages/readmessage`, {
      token: user.token,
    });
    request2
      .then((res) => {
        //console.log(res.data);
        setMessageRecap(res.data.message);
        setUnreadMessage({
          list: res.data.myMessageUnread,
          total: res.data.totalUnreadMessage,
        });
      })
      .catch((err) => console.log("Requete profil error: ", err));
  }, [visible]);

  const goTo = () => {
    navigation.navigate("Main");
  };

  const toggleOverlay = (skillId, receiverId, senderId, receiverName, senderName
  ) => {
    console.log("function toggle overlay")
    console.log('skillId:', skillId)
    setVisible(!visible); // Switch ouverture/fermeture Overlay
    if (skillId)
      dispatch({
        type: "setConversationId",
        payload: {
          userId: user._id,
          skillId: skillId,
          receiverId: receiverId,
          senderId: senderId,
          receiverName: receiverName,
          senderName: senderName,
        },
      });
  };

  const slicer = (word, nbr) => {
    if (word.length > nbr) {
      return word.slice(0, nbr) + "...";
    } else {
      return word;
    }
  };

  // *********************************************   LISTE DES SWAP    *********************************************** //
  const mySwap = mySkills.map((skill, index) => {
    // console.log(skill)
    return (
      <Pressable key={skill._id} onPress={() => setNotation(!notation)}>
        <View
          style={{
            Width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor:
              user._id === skill.teacher._id ? "#009688" : "#FE816C",
            marginVertical: 5,
            borderRadius: 8,
            position: "relative",
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={{ uri: skill.imgUrl }}
          />
          <View style={{ marginHorizontal: 20, width: 200 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Quicksand_700Bold",
                color: "white",
              }}
            >
              {skill.title}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Quicksand_400Regular",
                color: "white",
              }}
            >
              {skill.category}
            </Text>
          </View>
          <View
            style={{
              width: 50,
              height: "100%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Quicksand_400Regular",
                color: "white",
                alignSelf: "flex-end",
                marginBottom: 5,
              }}
            >
              {skill.teacher.username}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  });

  // *********************************************   LISTE DES MESSAGES    *********************************************** //
  const myMessageRecap = messageRecap.map((message, index) => {
    // console.log("message:", message);
    return (
      <Pressable
        key={index}
        onPress={() =>
          toggleOverlay(
            message.skillId._id,
            message.receiverId._id,
            message.senderId._id,
            message.receiverId.username,
            message.senderId.username
          )
        }
      >
        <Animated.View
          style={{
            Width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor:
              user._id === message.skillId.teacher ? "#009688" : "#FE816C",
            marginVertical: 5,
            borderRadius: 8,
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={{ uri: message.skillId.imgUrl }}
          />
          <View style={{ marginHorizontal: 20, width: 215 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Quicksand_700Bold",
                color: "white",
              }}
            >
              {message.skillId.title}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Quicksand_400Regular",
                color: "white",
              }}
            >
              {slicer(message.content, 75)}
            </Text>
          </View>

          <View
            style={{
              width: 60,
              height: "100%",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <View
              style={[
                styles.badge3,
                { borderWidth: unreadMessage.list[index] === 0 ? 0 : 1 },
              ]}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Quicksand_400Regular",
                  fontSize: 10,
                }}
              >
                {unreadMessage.list[index] === 0
                  ? null
                  : unreadMessage.list[index]}
              </Text>
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontFamily: "Quicksand_400Regular",
              }}
            >
              {user._id === message.senderId._id
                ? slicer(message.receiverId.username, 10)
                : slicer(message.senderId.username, 10)}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  });

  // *********************************************   Wishlist    *********************************************** //
  const myWishlistRecap = user.wishList.map((skill, index) => {
    // console.log("message:", message);
    return (
      <Pressable
        key={index}
        onPress={() => {
          props.addSelectedSkill(skill);
          props.navigation.navigate("Skill");
        }}
      >
        <Animated.View
          style={{
            Width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "#FE816C",
            marginVertical: 5,
            borderRadius: 8,
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={{ uri: skill.imgUrl }}
          />
          <View style={{ marginHorizontal: 20, width: 200 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Quicksand_700Bold",
                color: "white",
              }}
            >
              {skill.title}
            </Text>
          </View>

          <View
            style={{
              width: 60,
              height: "100%",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <View style={[styles.badge3, {}]}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Quicksand_400Regular",
                  fontSize: 10,
                }}
              >
                {skill.teacher.username}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    );
  });

  // *********************************************   LISTE DES RENDEZ-VOUS    *********************************************** //
  const myRdvRecap = rdv.map((message) => {
    // console.log("message:", message);
    let date = new Date(message.appointmentDate);
    return (
      <Animated.View
        key={message._id}
        style={{
          Width: "100%",
          height: 50,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor:
            user._id === message.receiverId._id ? "#009688" : "#FE816C",
          marginVertical: 5,
          borderRadius: 8,
        }}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={{ uri: message.skillId.imgUrl }}
        />
        <View style={{ marginHorizontal: 20, width: 200 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Quicksand_700Bold",
              color: "white",
            }}
          >
            {date.toLocaleDateString()}
          </Text>
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Quicksand_400Regular",
              color: "white",
            }}
          >
            {message.senderId._id === user._id
              ? message.receiverId.username
              : message.senderId.username}
          </Text>
        </View>
        <View
          style={{
            width: 50,
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Quicksand_400Regular",
              color: "white",
              alignSelf: "flex-end",
              marginBottom: 5,
            }}
          >
            {message.done === false ? "En cours..." : "Terminée"}
          </Text>
        </View>
      </Animated.View>
    );
  });

  // pour afficher le nom du user avec qui on discute en haut de l'overlay

  let messageUserName = "";
  if (conversationId)
    user._id === conversationId.senderId
      ? (messageUserName = conversationId.receiverName)
      : (messageUserName = conversationId.senderName);
  console.log("messageUserName :", messageUserName);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerLayout}>
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          fullScreen="true"
        >
        <View style={{ flexDirection: "row", marginTop: 40, width: "100%" }}>
            <MaterialIcons
              onPress={() => toggleOverlay()}
              name="cancel"
              size={40}
              color="rgba(0, 150, 136, 0.5)"
              style={{ marginLeft: 20 }}
            />
            <Text style={styles.messageUserName}>{messageUserName}</Text>
          </View>
          <Conversations />
        </Overlay>

        <Overlay
          // name="swap_note"
          overlayStyle={styles.overlay2}
          isVisible={notation}
          // fullScreen="false"
        >
          <Text
            style={{
              color: "#FE816C",
              fontSize: 36,
              fontFamily: "Quicksand_700Bold",
            }}
          >
            rate this swap
          </Text>
          <Pressable onPress={() => setNotation(!notation)}></Pressable>
          <Starscounter />
          <BtnGrand text="confirm" onPress={() => setNotation(!notation)} />
        </Overlay>

        <Text style={styles.title}>{user.username}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="ios-star-sharp" size={24} color="#FE816C" />
          <Ionicons name="ios-star-sharp" size={24} color="#FE816C" />
          <Ionicons name="ios-star-sharp" size={24} color="#FE816C" />
          <Ionicons name="ios-star-sharp" size={24} color="#FE816C" />
          <Ionicons
            name="ios-star-sharp"
            size={24}
            color="rgba(254, 129, 108, 0.3)"
          />
          <Text style={{ color: "black" }}>+ 12 votes</Text>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Pressable
            onPress={() => setMode("message")}
            style={{ width: "44%" }}
          >
            <View
              style={[
                styles.containerForm,
                { borderWidth: mode === "message" ? 2 : 0 },
              ]}
            >
              <Text style={styles.label}>my messages</Text>
              <View style={{ positon: "relative", top: 10, opacity: 0.7 }}>
                {/* <Image
                  height={50}
                  width={50}
                  source={require("../assets/images/messageIcon.png")}
                /> */}
                <Ionicons name="chatbubbles" size={70} color="#009688" />
              </View>
              <View style={styles.badge1}>
                <Text>{unreadMessage.total}</Text>
              </View>
            </View>
          </Pressable>

          <Pressable onPress={() => setMode("agenda")} style={{ width: "44%" }}>
            <View
              style={[
                styles.containerForm,
                { borderWidth: mode === "agenda" ? 2 : 0 },
              ]}
            >
              <Text style={styles.label}>my schedule</Text>
              {/* <AgendaIcon /> */}
              <Ionicons name="calendar" size={70} color="#009688" />
              <View style={styles.badge2}>
                <Text>{rdv.length}</Text>
              </View>
            </View>
          </Pressable>
        </View>

        <Animated.View
          style={[
            {
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              flexWrap: "wrap",
            },
            { opacity: 1 },
          ]}
        >
          <Pressable onPress={() => setMode("normal")} style={{ width: "44%" }}>
            <View
              style={[
                styles.containerForm,
                { borderWidth: mode === "normal" ? 2 : 0 },
              ]}
            >
              <Text style={styles.label}>my history</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <Text style={styles.skillingText}>20</Text> */}
                {/* <Image
                  height={50}
                  width={50}
                  source={require("../assets/images/skilling.png")}
                /> */}
                <Ionicons name="repeat" size={70} color="#009688" />
              </View>
            </View>
          </Pressable>

          <Pressable
            style={{ width: "44%" }}
            onPress={() => setMode("wishlist")}
          >
            <View
              style={[
                styles.containerForm,
                { borderWidth: mode === "wishlist" ? 2 : 0 },
              ]}
            >
              <Text style={styles.label}>my wishlist</Text>
              <Ionicons name="heart" size={70} color="#009688" />
            </View>
          </Pressable>
        </Animated.View>

        {mode === "normal" ? (
          <ScrollView style={{ marginTop: 12, width: "92%", height: 300 }}>
            {mySwap}
          </ScrollView>
        ) : null}

        {mode === "message" ? (
          <ScrollView style={{ marginTop: 12, width: "92%", height: 300 }}>
            {myMessageRecap}
          </ScrollView>
        ) : null}
        {mode === "agenda" ? (
          <ScrollView style={{ marginTop: 12, width: "92%", height: 300 }}>
            {myRdvRecap}
          </ScrollView>
        ) : null}

        {mode === "wishlist" ? (
          <ScrollView style={{ marginTop: 12, width: "92%", height: 300 }}>
            {myWishlistRecap}
          </ScrollView>
        ) : null}

        <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
          <BtnGrand
            text="add skill"
            onPress={() => navigation.navigate("AddSkill")}
          />
          <BtnGrand text="find skill" onPress={goTo} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerLayout: {
    flex: 1,
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    color: "#009688",
    fontSize: 34,
    fontFamily: "Quicksand_700Bold",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  messageUserName: {
    color: "rgba(0, 150, 136, 0.5)",
    fontSize: 34,
    fontFamily: "Quicksand_700Bold",
    marginLeft: "15%",
  },

  label: {
    color: "#009688",
    marginVertical: 10,
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
    marginTop: 10,
  },
  containerForm: {
    backgroundColor: "rgba(0, 150, 136, 0.5)",
    borderColor: "#FE816C",
    height: 140,
    marginTop: 30,
    // width: '44%',
    borderRadius: 12,
    alignItems: "center",
  },
  skillingText: {
    color: "#FE816C",
    fontSize: 50,
    fontFamily: "Quicksand_700Bold",
    marginHorizontal: 10,
    position: "relative",
    top: -5,
  },
  badge1: {
    backgroundColor: "#FE816C",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontFamily: "Quicksand_700Bold",
    fontSize: 16,
    position: "relative",
    top: -70,
    left: 38,
  },
  badge2: {
    backgroundColor: "#FE816C",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontFamily: "Quicksand_700Bold",
    fontSize: 16,
    position: "relative",
    // top: -140,
    // left: 42,
    top: -70,
    left: 38,
  },
  badge3: {
    // backgroundColor: "#FE816C",
    borderRadius: 50,
    // borderWidth: 1,
    borderColor: "white",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  overlay: {
    backgroundColor: "#FE816C",
    width: "100%",
  },
  overlay2: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "#FE816C",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-around",
    // opacity: 0.6,
    borderRadius: 12,
    height: "50%",
    width: "90%",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addSelectedSkill: function (skill) {
      dispatch({ type: "addSelectedSkill", skill });
    },
  };
}

export default connect(null, mapDispatchToProps)(Profil);
