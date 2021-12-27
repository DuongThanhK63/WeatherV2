import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
  ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, Button, TouchableOpacity, Modal, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Weather from './mini_screens/Weather';
import Home from './Home';


const DATA = [
  {id: 1, text: 'Hà Nội'},
  {id: 2, text: 'Hải Dương'},
  {id: 3, text: 'Nam Định'},
  {id: 4, text: 'Thái Bình'},
  {id: 5, text: 'Hải Phòng'},
]

const HomeScreen = ({ navigation }) => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [data, setData] = useState(DATA);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setinputText] = useState();
  const [editItem, seteditItem] = useState();
  const [isRender, setisRender] = useState(false);
  const [text, setText] = React.useState("");

  const [isWeatherVisible, setisWeatherVisible] = useState(false);
  const [name, setname] = useState();

  const onPressItem = (item) => {
    setisModalVisible(true);
    setinputText(item.text);
    seteditItem(item.id);

  }

  const onPressButton = (item) => {
    setisWeatherVisible(true);
    setname(item.text);
    

  }
  

  const onPressSave = () => {
    const newData = data.map(item => {
      if (item.id == editItem) {
        item.text = inputText;
        return item;
      }
      return item;
    })

    setData(newData)
    setisModalVisible(false);
    setisRender(!isRender);
  }

  const renderItem = ({item, index}) => {
    return (
      
      <TouchableOpacity style={styles.item} onPress={() => 
          navigation.navigate('Detail', {
              nameCity: item.text
          })

        }>
        <View style={styles.nameCity}>
          <Text style={styles.text}>{item.text}</Text>

        </View>

        <View style={styles.button}>
          <Button
              title="Sửa"
              onPress={() => {
                onPressItem(item)

              }}
               
          />

        </View>
      </TouchableOpacity>
    )

  };

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
              navigation.navigate('Detail', {
              nameCity: text,
              });
            }}
          />
          </View>
        

      </View>

      <View style={styles.containerCenter}>

      <FlatList data={data} keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem} extraData={isRender}/>

        <Modal animationType='fade' visible={isModalVisible} onRequestClose={() => setisModalVisible(false)}>

          <View style={styles.modalView}>
              <Text style={styles.text}>Thành phố yêu thích</Text>
              <TextInput 
                style={styles.textInput} 
                onChangeText={(text) => setinputText(text)}
                defaultValue={inputText}
                editable={true}
                multiline={false}
                maxLength={20}
              
              />
              

              <TouchableOpacity style={styles.touchSave} onPress={() => {onPressSave()}}>
                <Text style={styles.text}>Lưu</Text>

              </TouchableOpacity>

          </View>

        </Modal>

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
      justifyContent: 'center'

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
