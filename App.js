import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import user from "./Reducers/User.reducer";
import categoriesList from "./Reducers/categories.reducer";
import subCategoriesList from "./Reducers/subCategories.reducer";
import selectedSkill from "./Reducers/selectedSkill.reducer";
import citySelected from "./Reducers/city.reducer";

import AccueilScreen from "./Screens/Accueil";
import MainScreen from "./Screens/Main";
import ProfilScreen from "./Screens/Profil";
import SigninScreen from "./Screens/Signin";
import SignupScreen from "./Screens/Signup";
import AddSkillScreen from "./Screens/AddSkill";
import SkillScreen from "./Screens/Skill";
import PublicProfilScreen from "./Screens/PublicProfil";
import MessageScreen from "./Screens/Message";

//import de polices
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

// import Apploading component pour gestion d'erreur de la police
import { AppLoading } from "expo";

const store = createStore(
  combineReducers({
    user,
    categoriesList,
    subCategoriesList,
    selectedSkill,
    citySelected,
  })
);

export default function App() {
  const Stack = createStackNavigator();

  //vérification du bon chargement des polices

  let fontsLoaded = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });


  if (!fontsLoaded[0]) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Accueil" component={AccueilScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Profil" component={ProfilScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="AddSkill" component={AddSkillScreen} />
            <Stack.Screen name="Skill" component={SkillScreen} />
            <Stack.Screen name="ProfilPublic" component={PublicProfilScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
