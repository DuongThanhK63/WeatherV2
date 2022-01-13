import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
    ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, Button, TouchableOpacity, Modal, Alert, AppState } from 'react-native';
  
import { initializeApp } from 'firebase/app';
import "firebase/auth";
import { getDatabase, ref, set, push, onValue  } from "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const Test = () => {
    const [city, setCity] = useState('')
    const [database, setDB] = useState(null)
    
    
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
        
        initializeApp(config);
    
        GET_DB()
      }, [])

      const GET_DB = () => {
          let array = []
        const db = getDatabase();
        const starCountRef = ref(db, 'city/');
        onValue(starCountRef, (snapshot) => {
            const Size = snapshot.size;
            console.log("There are " + Size);

            if(Size > 0){
                let data = snapshot.val();
                var i = 0;
                while(i < Size){
                    array.push({
                        id: Object.keys(data)[i],
                        name: Object.values(data)[i].City
                    })
                    i++;
                }
            }
            console.log(array)

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
        // const db = getDatabase();
        // set(ref(db, 'city/'), {
        // City: cityName
        //  });

      }

      

    return (
        <View style={styles.container}>
            <TextInput
                value={city}
                placeholder="Nhập tên thành phố..."
                onChangeText={(text) => setCity(text)}
            />
            {/* Them */}
            <TouchableOpacity onPress={() => {
                addCity(city)
            }}>
                <Text>Them</Text>
            </TouchableOpacity>
            {/* Sua */}
            <TouchableOpacity>
                <Text>Sua</Text>
            </TouchableOpacity>
            {/* Xoa */}
            <TouchableOpacity>
                <Text>Xoa</Text>
            </TouchableOpacity>

        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    }
})
export default Test
