import React, {useState} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';


const days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY = '78daf74e0c3e372089b6fd6202f50cfa';

const TopTemp = ({current_temp, name, current_weather}) => {
    const img = {uri: 'http://openweathermap.org/img/wn/'+ current_weather.icon +'@2x.png'}
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

      

        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
            const minutes = time.getMinutes();
            
            setTime((hoursIn12HrFormat < 10? '0' + hoursIn12HrFormat : hoursIn12HrFormat) 
            + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm);

            setDate(days[day] + ', ' + date + ' ' + months[month]);

        }, 1000);
    



    return (
        <View style={styles.container}>

            <View style={styles.location}>
              
                <Text style={styles.text_location}>{name}</Text>

            </View>

            <View style={styles.time_temp}>

                <View style={styles.time}>
                    <Text style={styles.timeFont}>{date}</Text>
                    <Text style={styles.timeFont}>{time}</Text>

                    <View style={styles.detail}>
                        <Image source={img} style={styles.image}/>
                        <Text style={styles.timeFont}>{current_weather.main}</Text>
                    </View>
                </View>

                <View style={styles.temp}>
                
                    <Text style={styles.tempFont}>{Math.floor(current_temp)}&#176;C</Text>
                    

                </View>
                
            </View>
            
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    time_temp: {
        flex: 3,
        flexDirection: 'row',

    },
    location: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    time: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    temp: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        
    },
    image: {
        width: 50,
        height: 50,
    },
    timeFont: {
        fontSize: 20,
        color: 'white',
    },
    tempFont: {
        fontSize: 90,
        color: 'white',

    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_location: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },




    
});

export default TopTemp
