import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
  ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, Button, TouchableOpacity, Modal, Alert, AppState } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Weather from './mini_screens/Weather';
import Home from './Home';
import { initializeApp, getApps, getApp } from 'firebase/app';
import "firebase/auth";
import { getDatabase, ref, set, push, onValue, remove  } from "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [sizeDB, setSizeDB] = useState(0);
  const [text, setText] = React.useState("");
  useEffect(() => {
    const config = {  
        apiKey: "AIzaSyDGmR7nX8uRcOMfiewHQg2YS8YqQ-9c-as",
        authDomain: "weatherv2-5fca8.firebaseapp.com",
        databaseURL: "https://weatherv2-5fca8-default-rtdb.firebaseio.com",
        projectId: "weatherv2-5fca8",
        storageBucket: "weatherv2-5fca8.appspot.com",
        messagingSenderId: "15770291457",
        appId: "1:15770291457:web:0387f1c7b0bf0a5f02df00",
        measurementId: "G-ZF9SJVL2Z5",
    };
    
    getApps().length === 0 ? initializeApp(config) : getApp();
    GET_DB()
  }, [])

  const GET_DB = () => {
    const db = getDatabase();
    const starCountRef = ref(db, 'city/');
    onValue(starCountRef, (snapshot) => {
        const Size = snapshot.size;
        console.log("There are " + Size);
        setSizeDB(Size)
        if(Size > 0){
            let item_data = snapshot.val();
            
            var i
            let data_temp = []
            if(Size <= 5){
              i = Size - 1
              while(i >= 0){
                data_temp.push({
                      id: Object.keys(item_data)[i],
                      name: Object.values(item_data)[i].City
                  })
                  i--;
              }
              setData(data_temp)
              console.log(data_temp)
            }else{
              for(i = Size-1; i > Size - 6; i--){
                    data_temp.push({
                          id: Object.keys(item_data)[i],
                          name: Object.values(item_data)[i].City
                      })
              }
              setData(data_temp)
              console.log(data_temp)
            }
          }
    })

  }

const addCity = (cityName) => {
  const db = getDatabase();
  push(ref(db, 'city/'), {
      City: cityName
  }, function (error) {
      if(error) {
          alert("Loi")
      }else{
          alert("Thanh cong")
      }
  })
}

const deleteCity = (id) => {
  const db = getDatabase();
  remove(ref(db, 'city/' + id))
}

  return (
    <View style={styles.containerHome}>

      <View style={styles.containerTop}>
          <TextInput
              value={text}
              style={styles.input}
              placeholder="Nhập tên thành phố..."
              onChangeText={(user) => setText(user)}
              
          />
          <View style ={styles.buttonSearch}>
          <Button
            title="Tìm"
            onPress={() => {
              addCity(text)
              // navigation.navigate('Detail', {
              // nameCity: text,
              // });
            }}
          />
          </View>
        

      </View>

      <View style={styles.containerCenter}>
          <FlatList data={data} keyExtractor={(item) => item.id.toString()} 
               renderItem={({item, index}) => {
                return ( 
                  <TouchableOpacity style={styles.item} onPress={() => {
                     navigation.navigate('Detail', {
                     nameCity: item.name,
                     });
                  }}
                  >
                    <View style={styles.nameCity}>
                      <Text style={styles.text}>{item.name}</Text>
            
                    </View>
            
                    <View style={styles.button}>
                      <Button onPress={()=> {
                        deleteCity(item.id)
                      }}
                          title="Xóa"                          
                      />
                    </View>
                  </TouchableOpacity>
                )
            
              }}/>
      </View>

    </View>
  );


}

const WeatherScreen = ({ route, navigation }) => {
  const {nameCity} = route.params
  console.log(nameCity)
  return (
  <View style={styles.containerWeather}>
    <Weather nameCity={nameCity}/>
  </View>

  )
}

const Stack = createNativeStackNavigator();


const Favorite = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false,}}/>
        <Stack.Screen name="Detail" component={WeatherScreen} options={{backgroundColor: '#55B4C2'}}/>
      </Stack.Navigator>
   
  );

  
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    backgroundColor: '#55B4C2',
    
    alignItems: 'center',
    justifyContent: 'center',

    
   
  },
  containerCenter: {
    flex: 3,
    backgroundColor: '#55B4C2',
    borderTopWidth: 2,
    borderTopColor: 'white',
   
  },
    containerWeather: {
      flex: 1,
     
    },
    containerHome: {
      flex: 1,
      marginTop: StatusBar.currentHeight
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: 'white',
      borderLeftWidth: 2,
      borderLeftColor: 'white',
      borderRightWidth: 2,
      borderRightColor: 'white',
      
    },
    
    nameCity: {
      flex: 2,
      alignItems: 'flex-start',
      justifyContent: 'center',

    },
    button: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      margin: 10,

    },
    buttonSearch: {
      // marginRight: 10,
      
      
    },
    input: {
      height: "30%",
      width: "85%",
      backgroundColor: 'white',
      margin: 5,
  
     
    },
    text: {
      marginVertical: 20,
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,

    },
    modalView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textInput: {
      width: '90%',
      height: '10%',
      borderColor: 'red',
      borderWidth: 1,
      padding: 10,
      fontSize: 20,
    },
    touchSave: {
      backgroundColor: 'orange',
      paddingHorizontal: 50,
      alignItems: 'center',
      marginTop: 20,
    }
});

export default Favorite
