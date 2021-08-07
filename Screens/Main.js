import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import { Overlay } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import { connect } from "react-redux";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

import Cards from "../Shared-components/Cards";
import Header from "../Shared-components/Header";
import BtnDeroul from "../Shared-components/buttons/btnderoul";
import Location from "../Shared-components/Location";
import Categories from "../Shared-components/Categories";
import SubCategories from "../Shared-components/SubCategories";

function Main(props) {
  /**********     hook d'état pour le overlay des catégories     *********/
  const [visible1, setVisible1] = useState(false);

  /**********     hook d'état pour le overlay des sous-catégories     *********/
  const [visible2, setVisible2] = useState(false);

  /**********     hook d'état pour le lier cat et sous cat     *********/
  const [indexSub, setIndexSub] = useState(null);

  /**********     hook d'état pour le overlay des villes     *********/
  const [visibleCity, setVisibleCity] = useState(false);

  /**********     hook d'état pour le lier cat et sous cat     *********/
  const [subCatList, setSubCatList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const baseUrl = "https://swapyourskills.herokuapp.com/"; // Heroku

  /**********     reset des critères de recherche dès qu'on retourne sur le composant     *********/
  const isFocused = useIsFocused();

  /**********     affichage de la catégorie sélectionnée (suppression et reset de la cat à l'appui)    *********/
  let catBadge;
  if (props.subcat) {
    catBadge = (
      <Pressable
        onPress={() => {
          props.resetCat();
          props.resetSubCat();
        }}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeTxt}>
            {props.cat} / {props.subcat}
          </Text>
          <MaterialIcons name="cancel" size={22} color="#009688" />
        </View>
      </Pressable>
    );
  }

  /**********     affichage de la ville sélectionnée (suppression et reset ville à l'appui)    *********/
  let cityBadge;
  if (props.citySelected) {
    cityBadge = (
      <Pressable
        onPress={() => {
          props.resetCity();
        }}
      >
        <View style={styles.badgeCity}>
          <Text style={styles.badgeTxtCity}>{props.citySelected}</Text>
          <MaterialIcons name="cancel" size={22} color="#FE816C" />
        </View>
      </Pressable>
    );
  }


  useEffect(() => {
    props.resetCat();
    props.resetSubCat();
    props.resetCity();

    let request = axios.get(`${baseUrl}skills/searchskills`);
    request
      .then((res) => {
        setSearchList(res.data);
      })
      .catch((err) => console.log("err:", err));
  }, [isFocused]);



  useEffect(() => {
    // au changement de valeur des props. subcat ou city (suppression ou modif) relance d'une recherche avec les nouveaux paramètres

    //si il y a au moins la sous catégorie OU la ville sélectionnée => requet en post pour filtrer avec cette clé
    if (props.subcat || props.citySelected) {
      let request = axios.post(`${baseUrl}skills/searchskills`, {
        subCat: props.subcat,
        citySelected: props.citySelected,
      });
      request
        .then((res) => {
          setSearchList(res.data.searchedSkills);
        })
        .catch((err) => console.log("err:", err));
    }
    //si ni sous-catégorie ni ville => requet en get pour récupérer toutes les annonces
    else {
      let request = axios.get(`${baseUrl}skills/searchskills`);
      request
        .then((res) => {
          setSearchList(res.data);
        })
        .catch((err) => console.log("err:", err));
    }
  }, [props.subcat, props.citySelected]);


  /**********     mécanique pour l'ouverture/switch/fermeture des overlays cat et sous-cat     *********/
  const toggleOverlay = (toggleState, index, cat) => {
    if (toggleState === "open") {
      setVisible1(!visible1);
    }
    if (toggleState === "switch") {
      setVisible1(!visible1);
      setVisible2(!visible2);
      setIndexSub(index);
    }
    if (toggleState === "close") {
      setVisible1(false);
      setVisible2(false);
      setSubCatList([...subCatList, cat]);
    }
  };

  /**********     mécanique pour l'ouverture/fermeture de l'overlay des villes    *********/
  const toggleOverlayCity = (toggleState, city) => {
    if (toggleState === "open") {
      setVisibleCity(!visibleCity);
    }
    if (toggleState === "close") {
      setVisibleCity(false);
    }
  };

  /**********     return du composant    *********/

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={{ flex: 1, alignItems: "center" }}>

        {/* overlay pour la sélection d'une catégorie */}
        <Overlay isVisible={visible1} fullScreen="true">
          <MaterialIcons
            onPress={() => toggleOverlay("open")}
            name="cancel"
            size={40}
            color="#009688"
            style={{ marginTop: 40, marginLeft: 20 }}
          />
          <Categories toggleOverlay={toggleOverlay} />
        </Overlay>

        {/* overlay pour la sélection d'une sous-catégorie */}
        <Overlay isVisible={visible2} fullScreen="true">
          <MaterialIcons
            onPress={() => toggleOverlay("switch")}
            name="cancel"
            size={40}
            color="#009688"
            style={{ marginTop: 40, marginLeft: 20 }}
          />
          <SubCategories catIndex={indexSub} toggleOverlay={toggleOverlay} />
        </Overlay>

        {/* overlay pour la sélection d'une ville */}
        <Overlay isVisible={visibleCity} fullScreen="true">
          <MaterialIcons
            onPress={() => toggleOverlayCity("close")}
            name="cancel"
            size={40}
            color="#009688"
            style={{ marginTop: 40, marginLeft: 20 }}
          />
          <Location toggleOverlayCity={toggleOverlayCity} />
        </Overlay>

        <Text style={styles.title}>find a skill</Text>

        {/* boutons catégories et location */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 30,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <BtnDeroul
              onPress={() => {
                toggleOverlay("open");
              }}
              text={"category"}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <BtnDeroul
              onPress={() => toggleOverlayCity("open")}
              text={"location"}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          {catBadge}
          {cityBadge}
        </View>
        {/* container des skills (les randoms skills au lancement et les skills filtrés ensuite) */}
        <ScrollView style={styles.scroll}>
          <View style={styles.scrollContainer}>
            {searchList.map((card, i) => {
              return (
                <Cards
                  onPress={() => {
                    props.addSelectedSkill(card);
                    props.navigation.navigate("Skill");
                  }}
                  key={i}
                  cardData={card}
                ></Cards>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 0,
    padding: 3,
  },
  scroll: {
    backgroundColor: "rgba(254, 129, 108, 0.5)",
    width: "100%",
  
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 150, 136, 0.5)",
    borderRadius: 50,
    paddingLeft: 5,
    paddingRight: 3,
    paddingVertical: 3,
    margin: 5,
  },

  badgeCity: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(254, 129, 108, 0.5)",
    borderRadius: 50,
    paddingLeft: 5,
    paddingRight: 3,
    paddingVertical: 3,
    margin: 4,
  },

  badgeTxt: {
    justifyContent: "center",
    fontFamily: "Quicksand_700Bold",
    color: "#009688",
  },

  badgeTxtCity: {
    justifyContent: "center",
    fontFamily: "Quicksand_700Bold",
    color: "#FE816C",
  },

  title: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 34,
    color: "#009688",
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 30,
    color: "#009688",
    alignSelf: "flex-start",
    margin: 5,
  },
});

function mapStateToProps(state) {
  return {
    cat: state.categoriesList,
    subcat: state.subCategoriesList,
    citySelected: state.citySelected,
  };
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
    resetCity: function () {
      dispatch({ type: "resetCity" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
