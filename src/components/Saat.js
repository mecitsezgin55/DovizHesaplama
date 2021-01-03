import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const {width,height} = Dimensions.get('window')


class Saat extends Component {

  constructor() {
    super();

    this.state = { currentTime: null, currentDay: null }
    this.daysArray = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    this.monthsArray = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos','Eylül', 'Ekim', 'Kasım', 'Aralık'];
  }

  UNSAFE_componentWillMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    
    let month = new Date().getMonth();
    let day = new Date().getDay();
    let monthDay = new Date().getUTCDate();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour < 10) {
      hour = '0' + hour;
    }

    this.setState({ currentTime: hour + ':' + minutes + ':' + seconds });

    //this.daysArray.map((item, key) => {
      //if (key == new Date().getDay()) {
        //this.setState({ currentDay: item.toUpperCase() });
      //}
    //})
    this.setState({ currentDay: monthDay+ '  ' + this.monthsArray[month] + '  ' + this.daysArray[day]})
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  render() {

    return (
      <View style={myStyles.container}>
          <View>
            <Text style={myStyles.timeStyle}>{this.state.currentTime}</Text>
            <Text style={myStyles.dateStyle}>{this.state.currentDay}</Text>
          </View>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    timeStyle:{
        fontSize:40,
        marginTop: width * 0.07,
        color: '#F6FCFF'
    },
    dateStyle:{
        alignSelf:'center',
        fontSize:18,
        fontWeight:'bold',
        color: '#F6FCFF'
    }

  });

  export {Saat};