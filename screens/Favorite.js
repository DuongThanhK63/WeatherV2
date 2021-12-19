import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
  ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, Button, TouchableOpacity, Modal } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Weather from './mini_screens/Weather';


const DATA = [
  {id: 1, text: 'Ha Noi'},
  {id: 2, text: 'Ha Noi'},
  {id: 3, text: 'Ha Noi'},
  {id: 4, text: 'Ha Noi'},
  {id: 5, text: 'Ha Noi'},
]

const Favorite = () => {
  const [data, setData] = useState(DATA);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setinputText] = useState();
  const [editItem, seteditItem] = useState();
  const [isRender, setisRender] = useState(false);

  const onPressItem = (item) => {
    setisModalVisible(true);
    setinputText(item.text);
    seteditItem(item.id);

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
      <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
          <Text style={styles.text}>{item.text}</Text>
      </TouchableOpacity>
    )

  };

  return (
    <View style={styles.container}>
        <FlatList data={data} keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem} extraData={isRender}/>

        <Modal animationType='fade' visible={isModalVisible} onRequestClose={() => setisModalVisible(false)}>

          <View style={styles.modalView}>
              <Text style={styles.text}>Change Text</Text>
              <TextInput 
                style={styles.textInput} 
                onChangeText={(text) => setinputText(text)}
                defaultValue={inputText}
                editable={true}
                multiline={false}
                maxLength={20}
              
              />

              <TouchableOpacity style={styles.touchSave} onPress={() => {onPressSave()}}>
                <Text style={styles.text}>Save</Text>

              </TouchableOpacity>

          </View>

        </Modal>
    </View>
  );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    item: {
      borderWidth: 1,
      borderColor: 'red',
      alignItems: 'flex-start',
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
