import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Hie nthi chi tiet cac chi so thoi tiet
const Detail = ({ wind_speed, visibility, humidity, pressure, current_co, current_uvi, current_pm25, current_no2 }) => {
    let pm25 = parseFloat(current_pm25)
    let uvi = parseFloat(current_uvi)
    let co = parseFloat(current_co)
    let no2 = parseFloat(current_no2)

    return (
        <View style={styles.container}>

            <View style={styles.detailTop}>
                {/* Độ ẩm */}
                <View style={styles.weatherList}>

                    <Text style={styles.textDetail}>Độ ẩm</Text>
                    <Text style={styles.textDetail}>{humidity}</Text>
                    <Text style={styles.textDetail}>%</Text>

                    <View style={styles.infoBar}>
                        <View
                            style={{
                                width: humidity / 2.2,
                                height: 5,
                                backgroundColor: 'green',
                            }}
                        />
                    </View>
                </View>
                {/* Sức gió */}
                <View style={styles.weatherList}>
                    <Text style={styles.textDetail}>Sức gió</Text>
                    <Text style={styles.textDetail}>{wind_speed}</Text>
                    <Text style={styles.textDetail}>m/s</Text>
                    <View style={styles.infoBar}>
                        <View
                            style={{
                                width: wind_speed * 5,
                                height: 5,
                                backgroundColor: 'red',
                            }}
                        />
                    </View>
                </View>
                {/* Tầm nhìn */}
                <View style={styles.weatherList}>
                    <Text style={styles.textDetail}>Tầm nhìn</Text>
                    <Text style={styles.textDetail}>{Math.floor(visibility / 1000)}</Text>
                    <Text style={styles.textDetail}>km</Text>
                    <View style={styles.infoBar}>
                        <View
                            style={{
                                width: Math.floor(visibility / 1000) * 3,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                        />
                    </View>
                </View>
                {/* Áp suất */}
                <View style={styles.weatherList}>
                    <Text style={styles.textDetail}>Áp suất</Text>
                    <Text style={styles.textDetail}>{pressure}</Text>
                    <Text style={styles.textDetail}>hPa</Text>
                    <View style={styles.infoBar}>
                        <View
                            style={{
                                width: pressure / 50,
                                height: 5,
                                backgroundColor: 'green',
                            }}
                        />
                    </View>
                </View>

            </View>
            <View style={styles.detailBottom}>
                {/* NO2 */}
                <View style={styles.weatherList}>
                    <Text style={styles.textDetail}>NO2</Text>
                    <Text style={styles.textDetail}>{no2.toFixed(2)}</Text>
                    <Text style={styles.textDetail}>ug/m3</Text>
                    <View style={styles.infoBar}>
                        <View
                            style={{
                                width: no2 / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                        />
                    </View>

                </View>
                {/* UV */}
                <View style={styles.weatherList}>
                    <Text style={styles.textDetail}>UV</Text>
                    <Text style={styles.textDetail}>{uvi.toFixed(2)}</Text>
                    <Text style={styles.textDetail}>index</Text>
                    <View style={styles.infoBar}>
                        <View
                            style={{
                                width: uvi * 3,
                                height: 5,
                                backgroundColor: 'orange',
                            }}
                        />
                    </View>

                </View>
                {/* CO */}
                <View style={styles.weatherList}>
                    <Text style={styles.textDetail}>CO</Text>
                    <Text style={styles.textDetail}>{co.toFixed(2)}</Text>
                    <Text style={styles.textDetail}>ug/m3</Text>
                    <View style={styles.infoBar}>
                        <View
                            style={{
                                width: co / 80,
                                height: 5,
                                backgroundColor: 'green',
                            }}
                        />
                    </View>
                </View>
                {/* PM25 */}
                <View style={styles.weatherList}>
                    <Text style={styles.textDetail}>PM25</Text>
                    <Text style={styles.textDetail}>{pm25.toFixed(2)}</Text>
                    <Text style={styles.textDetail}>ug/m3</Text>
                    <View style={styles.infoBar}>
                        <View
                            style={{
                                width: pm25 / 5,
                                height: 5,
                                backgroundColor: 'red',
                            }}
                        />
                 </View>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    detailTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'


    },
    detailBottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,

    },
    image: {
        width: 70,
        height: 70,
    },
    textDetail: {
        fontSize: 15,
        color: 'white',
    },
    iconWeaher: {
        flexDirection: 'row',
    },
    weatherList: {
        alignItems: 'center',
        margin: 15,

    },
    infoBar: {
        width: 45,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },

});

export default Detail
