import React from "react";
import { View,Text,StyleSheet } from "react-native";

import { Saat } from "./components/Saat";
import { DovizApi } from "./components/DovizApi";

const App = () =>{
    return(
        <View style={myStyle.container}>
            <Saat />

            <DovizApi />
        </View>
    );
};

const myStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#394867'
    }
});
export {App};