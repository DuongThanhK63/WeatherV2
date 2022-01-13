import React, { useState } from 'react';
import {
    StyleSheet, Text, View, Image
} from 'react-native';

const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
// Ham lay data cua 6 ngay tiep theo 
const DailyFuture = ({
    d_min0, d_max0, d_icon0,
    d_min1, d_max1, d_icon1,
    d_min2, d_max2, d_icon2,
    d_min3, d_max3, d_icon3,
    d_min4, d_max4, d_icon4,
    d_min5, d_max5, d_icon5,
    d_min6, d_max6, d_icon6,
}) => {

    const [day1, setday1] = useState('')
    const [day2, setday2] = useState('')
    const [day3, setday3] = useState('')
    const [day4, setday4] = useState('')
    const [day5, setday5] = useState('')
    const [day6, setday6] = useState('')


    // Dinh dang ngay
    setInterval(() => {
        const time = new Date();
        const day0 = time.getDay();


        const day1 = day0 + 1
        const day1F = day1 <= 6 ? day1 : day1 - 7

        const day2 = day1 + 1
        const day2F = day2 <= 6 ? day2 : day2 - 7

        const day3 = day2 + 1
        const day3F = day3 <= 6 ? day3 : day3 - 7

        const day4 = day3 + 1
        const day4F = day4 <= 6 ? day4 : day4 - 7

        const day5 = day4 + 1
        const day5F = day5 <= 6 ? day5 : day5 - 7

        const day6 = day5 + 1
        const day6F = day6 <= 6 ? day6 : day6 - 7

        setday1(days[day1F]);
        setday2(days[day2F]);
        setday3(days[day3F]);
        setday4(days[day4F]);
        setday5(days[day5F]);
        setday6(days[day6F]);

    }, 1000);

    return (
        <View style={styles.container}>
            {/* Ngay hien tai */}
            <CurrentWeather d_min={d_min0} d_max={d_max0} d_icon={d_icon0} />
            {/* 6 ngay tiep theo */}
            <FutureItem d_min={d_min1} d_max={d_max1} d_icon={d_icon1} day={day1} />
            <FutureItem d_min={d_min2} d_max={d_max2} d_icon={d_icon2} day={day2} />
            <FutureItem d_min={d_min3} d_max={d_max3} d_icon={d_icon3} day={day3} />
            <FutureItem d_min={d_min4} d_max={d_max4} d_icon={d_icon4} day={day4} />
            <FutureItem d_min={d_min5} d_max={d_max5} d_icon={d_icon5} day={day5} />
            <FutureItem d_min={d_min6} d_max={d_max6} d_icon={d_icon6} day={day6} />

        </View>
    )
}
// Ngay hien tai
const CurrentWeather = ({ d_min, d_max, d_icon }) => {
    const img = { uri: 'http://openweathermap.org/img/wn/' + d_icon + '@2x.png' }

    return (
        <View style={styles.futureContainer}>
            <View style={styles.day}>
                <Text style={styles.text}>Hôm nay</Text>
            </View>

            <View style={styles.icon}>
                <Image source={img} style={styles.image} />
            </View>

            <View style={styles.temp}>
                <Text style={styles.text}>T: {Math.floor(d_min)}&#176;C</Text>
                <Text style={styles.text}>C: {Math.floor(d_max)}&#176;C</Text>
            </View>

        </View>

    )
}
// Cac ngay tiep theo
const FutureItem = ({ d_min, d_max, d_icon, day }) => {

    const img = { uri: 'http://openweathermap.org/img/wn/' + d_icon + '@2x.png' }
    return (
        <View style={styles.futureContainer}>
            <View style={styles.day}>
                <Text style={styles.text}>{day}</Text>
            </View>

            <View style={styles.icon}>
                <Image source={img} style={styles.image} />
            </View>

            <View style={styles.temp}>
                <Text style={styles.text}>T: {Math.floor(d_min)}&#176;C</Text>
                <Text style={styles.text}>C: {Math.floor(d_max)}&#176;C</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    futureContainer: {
        width: 350,
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        height: 56,
        padding: 5,

    },
    day: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'

    },
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    temp: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'

    },
    image: {
        width: 50,
        height: 50,
    },
    text: {
        color: 'white',
        fontSize: 15,
    }

});

export default DailyFuture
