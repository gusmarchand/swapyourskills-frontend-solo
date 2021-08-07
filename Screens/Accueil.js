import React, {useEffect} from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import BtnGrand from '../Shared-components/buttons/btnGrand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import axios from 'axios';




export default function Accueil(props) {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    let dispatch = useDispatch();

    const baseUrl = "https://swapyourskills.herokuapp.com/"; // Heroku
    // const baseUrl = "http://172.17.1.137:3000/"; // Willem
    // const baseUrl = "http://172.17.1.35:3000/"; // gus
    
  useEffect(() => {
    AsyncStorage.getItem("token", function(error, data) {
      console.log("Vérification local storage TOKEN: \u001b[1;32m", data);
      if (data !== null) {
        let request = axios.post(`${baseUrl}users/loaduser`, {token: data});
    request.then(res => {
      console.log('response verifition du token local storage au chargement:', res.data.message.username)
      if (res.data.status === true) {
        dispatch({ type: "addUser", payload: res.data.message}) 
      } else { AsyncStorage.removeItem('token') }
    }).catch(err => console.log('Error chargement user dans le store temporaire.js 26:', err))
      }
    }); 
  }, [])

    return (
        <View style={{ flex: 1, width: '100%' }}>

            <Video
                ref={video}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                source={{ uri: 'https://res.cloudinary.com/swap-your-skills/video/upload/v1627891776/SYS_720_LOW_kvuifl.mp4' }}
                isMuted
                shouldPlay
                resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.position}  >
                <Text style={styles.text}>swap your skills</Text>
                <View style={styles.buttons}>
                    <BtnGrand text={"let's start !"} onPress={() => props.navigation.navigate("Main")} />
                  
                </View>
            </View >

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: 'transparent',
    },
    position: {
        width: '100%',
        flex: 1,
        justifyContent: "space-between",
        alignItems: 'center',
        position: 'absolute',
        top: 200,
        left: 0,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    text: {
        color: "#009688",
        fontFamily: "Quicksand_700Bold",
        fontSize: 34,
        marginBottom: 200,
        top: 100,
        elevation: 1,
        shadowRadius: 4,
        shadowOffset: { width: -1, height: -1 },
    },
    buttons: {
        flexDirection: 'row',
        bottom: 50
    },
});