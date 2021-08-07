import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Header from "../Shared-components/Header";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import BtnGrand from "../Shared-components/buttons/btnGrand";
import formData from "form-data";
import { useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

export default function AddSkill(props) {
  //172.17.1.35:19000
  // const [form, setForm] = useState(n: "", location: "{ title: "", category: selectedCat, subcategory: selectedSubcat, descriptio", imgUrl: image });
  //   const baseUrl = "http://172.17.1.35:3000/";
  const baseUrl = "https://swapyourskills.herokuapp.com/"; // Heroku

  const navigation = useNavigation();

  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  // const [imgUrl, setImgUrl] = useState("");

  const [image, setImage] = useState();

  const [selectedCat, setSelectedCat] = useState(false);
  const [selectedSubcat, setSelectedSubcat] = useState(false);

  let subcatList = {
    Cuisine: [
      { label: "Française", value: "Française" },
      { label: "Anglaise", value: "Anglaise" },
      { label: "Américaine", value: "Américaine" },
      { label: "Hallal", value: "Hallal" },
      { label: "Casher", value: "Casher" },
      { label: "Méditerranéenne", value: "Méditerranéenne" },
      { label: "Italienne", value: "Italienne" },
      { label: "Asiatique", value: "Asiatique" },
    ],
    Bricolage: [
      { label: "Menuiserie", value: "Menuiserie" },
      { label: "Plomberie", value: "Plomberie" },
      { label: "Electricité", value: "Electricité" },
      { label: "Outillage", value: "Outillage" },
      { label: "Peinture", value: "Peinture" },
      { label: "Gros-oeuvre", value: "Gros-oeuvre" },
    ],
    Jardinage: [
      { label: "Potager", value: "Potager" },
      { label: "Fleur", value: "Fleur" },
      { label: "Gazon/Pelouse", value: "Gazon/Pelouse" },
      { label: "Taille", value: "Taille" },
      { label: "Arbres fruitiers", value: "Arbres fruitiers" },
      { label: "Intérieurs", value: "Intérieurs" },
    ],
    Education: [
      { label: "Sciences et technologie", value: "Sciences et technologie" },
      { label: "Littérature", value: "Littérature" },
      { label: "Langues", value: "Langues" },
      { label: "Histoire/Géographie", value: "Histoire/Géographie" },
      { label: "Droit", value: "Droit" },
      { label: "Mathématiques", value: "Mathématiques" },
      { label: "Culture", value: "Culture" },
    ],
    Informatique: [
      { label: "Dépannage matériel", value: "Dépannage matériel" },
      { label: "Programmation", value: "Programmation" },
      { label: "Bureautique", value: "Bureautique" },
      { label: "CAO", value: "CAO" },
      { label: "Impression 3D", value: "Impression 3D" },
      { label: "Création/design", value: "Création/design" },
      { label: "Réseaux", value: "Réseaux" },
      { label: "Réseaux Sociaux", value: "Réseaux Sociaux" },
    ],
    Musique: [
      { label: "Instruments à vents", value: "Instruments à vents" },
      { label: "Instruments à cordes", value: "Instruments à cordes" },
      { label: "Instruments numériques", value: "Instruments numériques" },
      { label: "Chant", value: "Chant" },
      { label: "Solfège", value: "Solfège" },
      { label: "Compositions", value: "Compositions" },
      { label: "MAO", value: "MAO" },
    ],
    Sport: [
      { label: "Yoga", value: "Yoga" },
      { label: "Course à pieds", value: "Course à pieds" },
      { label: "Tennis", value: "Tennis" },
      { label: "Cyclisme", value: "Cyclisme" },
      { label: "Football", value: "Football" },
      { label: "Escalade", value: "Escalade" },
      { label: "Roller", value: "Roller" },
      { label: "Skateboard", value: "Skateboard" },
      { label: "Ski/Snowboard", value: "Ski/Snowboard" },
    ],
    Loisirs: [
      { label: "Couture", value: "Couture" },
      { label: "Crochet", value: "Crochet" },
      { label: "Tricot", value: "Tricot" },
      { label: "Tapisserie", value: "Tapisserie" },
      { label: "Photographie", value: "Photographie" },
      { label: "Décoration", value: "Décoration" },
      { label: "Peinture", value: "Peinture" },
      { label: "Poterie", value: "Poterie" },
    ],
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("RESULT", result);

    setImage(result.uri);
  };

  const sendForm = () => {
    var form = new formData();
    form.append("title", title);
    form.append("category", category);
    form.append("subcategory", subcategory);
    form.append("description", description);
    form.append("location", location);
    form.append("teacherId", user._id);
    // (form.teacherId = user._id),
    form.append("imageFromFront", {
      uri: image,
      type: "image/jpeg",
      name: "skill_img.jpg",
    });

    let request = axios({
      method: "post",
      url: `${baseUrl}skills/addskill`,
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    });
    request
      .then((res) => {
        console.log("response server ok", res.data);
        navigation.navigate("Profil");
      })
      .catch((err) => console.log("err:", err));
  };

  const handleChange = (value, name) => {
    setTitle({ ...title, [name]: value });
  };

  const handlePickerCat = (value) => {
    setCategory(value);
    console.log(subcatList[value]);
  };

  const handlePickerSubcat = (value) => {
    setSubcategory(value);
  };

  const handlePickerLoc = (value) => {
    setLocation(value);
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />

      <View style={styles.containerLayout}>
        <Text style={styles.title}>add a skill</Text>

        <ScrollView style={styles.containerForm}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Name your skill"
              keyboardType="default"
              value={title}
              onChangeText={(value) => setTitle(value)}
            ></TextInput>

            <Text style={styles.label}>Category</Text>
            <RNPickerSelect
              style={{
                inputAndroid: { color: "white", marginLeft: "5%" },
                inputIOS: { color: "white", marginLeft: "5%" },
              }}
              onValueChange={(category) => handlePickerCat(category)}
              placeholder={{ label: "Select your category", value: null }}
              items={[
                { label: "Cuisine", value: "Cuisine" },
                { label: "Bricolage", value: "Bricolage" },
                { label: "Jardinage", value: "Jardinage" },
                { label: "Education", value: "Education" },
                { label: "Informatique", value: "Informatique" },
                { label: "Musique", value: "Musique" },
                { label: "Sport", value: "Sport" },
                { label: "Loisirs", value: "Loisirs" },
              ]}
            />

            <Text style={styles.label}>Subcategory</Text>
            <RNPickerSelect
              style={{
                inputAndroid: { color: "white", marginLeft: "5%" },
                inputIOS: { color: "white", marginLeft: "5%" },
              }}
              onValueChange={(subcategory) => handlePickerSubcat(subcategory)}
              placeholder={{ label: "Select your subcategory", value: null }}
              items={category ? subcatList[category] : []}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Describe your skill"
              keyboardType="default"
              value={description}
              onChangeText={(value) => setDescription(value)}
            ></TextInput>

            <Text style={styles.label}>City</Text>
            <RNPickerSelect
              style={{
                inputAndroid: { color: "white", marginLeft: "5%" },
                inputIOS: { color: "white", marginLeft: "5%" },
              }}
              onValueChange={(location) => handlePickerLoc(location)}
              placeholder={{ label: "Select your city", value: null }}
              items={[
                { label: "Paris", value: "Paris" },
                { label: "Lyon", value: "Lyon" },
                { label: "Marseille", value: "Marseille" },
                { label: "Lille", value: "Lille" },
                { label: "Nantes", value: "Nantes" },
                { label: "Bordeaux", value: "Bordeaux" },
              ]}
            />

            <Text style={styles.label}>Image</Text>
            <View style={styles.imagePicker}>
              <Button
                color="#009688"
                title="Import image"
                onPress={pickImage}
              />
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: 200 }}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          marginBottom: 30,
        }}
      >
        <BtnGrand text="cancel" onPress={() => navigation.goBack()} />
        <BtnGrand text="submit" onPress={sendForm} />
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
  },
  title: {
    color: "#009688",
    fontSize: 34,
    fontFamily: "Quicksand_700Bold",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  containerForm: {
    backgroundColor: "rgba(0, 150, 136, 0.5)",
    marginTop: 0,
    width: "90%",
    height: "60%",
    borderRadius: 12,
  },
  input: {
    height: 40,
    width: "90%",
    marginLeft: "5%",
    borderColor: "#FE816C",
    borderRadius: 2,
    paddingHorizontal: 15,
    backgroundColor: "white",
    //shadowColor: "red",
    //shadowOpacity: 0.99,
    elevation: 4,
    //shadowRadius: 100,
    //shadowOffset: { width: 50, height: 15 },
  },
  label: {
    color: "#009688",
    marginLeft: "5%",
    marginVertical: 10,
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
  },
  Picker: {
    color: "#FFFFFF",
    marginLeft: "5%",
    marginVertical: 10,
    fontFamily: "Quicksand_700Bold",
    fontSize: 16,
  },
  imagePicker: {
    flex: 1,
    width: "90%",
    marginLeft: "5%",
  },
  RNPickerSelect: {},
});
