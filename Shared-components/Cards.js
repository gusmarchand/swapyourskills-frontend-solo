import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function Cards(props) {
  let cardData = props.cardData;
  // console.log('cardData:', cardData)
  const myToken = useSelector((state) => state.user.token);
  let myWishlist = useSelector((state) => state.user.wishList);
  //console.log('myWishlist:', myWishlist)
  if (myWishlist === undefined) myWishlist = [];
  let dispatch = useDispatch();
  // console.log("myWishlist:", myWishlist);
  let onPress = props.onPress;
  // const baseUrl = "http://172.17.1.137:3000/"; // Willem
  const baseUrl = "https://swapyourskills.herokuapp.com/"; // Heroku

  const addToWishlist = (skillId, type) => {
    let url;
    if (type === 'add') url = `${baseUrl}users/addToWishlist`;
    if (type === 'remove') url = `${baseUrl}users/removeToWishlist`;
    let request = axios.post( url, {
      token: myToken,
      skillId: skillId,
    });
    request // 1ere requete pour ajouter le skill à la wishlist
      .then((res) => {
        let request2 = axios.post(`${baseUrl}users/loaduser`, {
          token: myToken,
        }); // 2eme requete pour MAJ user dans store avec la nouvelle wishlist
        request2
          .then((res) => {
            // console.log('response verifition du token local storage au chargement:', res.data)
            if (res.data.status === true) {
              dispatch({ type: "addUser", payload: res.data.message });
            }
          })
          .catch((err) => console.log("Requete addToSkill error: ", err));
      });
  };

  /**********     hook d'état pour le logo wishlist     *********/
  const [isLiked, setIsLiked] = useState(false);

  // let selectedCard = props.selectedCard

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress}>
        <Image
          style={styles.img}
          source={{
            uri: cardData.imgUrl,
          }}
        />
        <Text style={styles.title}>{cardData.title}</Text>
        <Text style={styles.desc}>
          {cardData.description.slice(0, 60) + "..."}
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          widht: "100%",
          justifyContent: "space-between",
          marginTop:2,
          marginBottom: 5,
          alignItems: "center",
          marginHorizontal: 5,
        }}
      >
        <Text style={styles.userNames}>{cardData.teacher.username}</Text>
        {myWishlist.some((id) => id._id === cardData._id.toString()) === false ? 
        (
          <Pressable onPress={() => addToWishlist(cardData._id, 'add')}>
            <Ionicons name="heart-outline" size={22} color="#009688" />
          </Pressable>
        ) : (
          <Pressable onPress={() => addToWishlist(cardData._id, 'remove')}>
            <Ionicons name="heart" size={22} color="#009688" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 220,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 5,
    padding: 5,
    justifyContent: "space-between",
  },
  img: {
    width: "98%",
    height: "45%",
    borderRadius: 5,
    margin: 5,
    alignSelf: "center",
  },
  title: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 15,
    color: "#009688",
    alignSelf: "center",
  },
  desc: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 12,
    color: "#000000",
    marginTop: 8,
    width: "98%",
    alignSelf: "center",
  },
  userName: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 10,
    color: "#000000",
  },
});

export default Cards;
