import React,{useEffect,useState,Component} from "react";
import { View,Text,StyleSheet,Dimensions,TextInput,TouchableOpacity, Alert } from "react-native";
import {Picker} from '@react-native-picker/picker';

const {width,height} = Dimensions.get('window')


class DovizApi extends Component{
    constructor(){
        super();
        this.state={
            USDdata:[],
            EURdata:[],
            GBPdata:[],
            para1: 'USD',
            para2: 'TL',
            input1: '',
            sonuc: 0,
            ortalamaUSD: 0,
            ortalamaEUR: 0,
            ortalamaGBP: 0,
            picker1: '',
            picker2: ''
        };
    }
    
    componentWillmount(){
        //this.getApi();
        //this.ortalama();
    }
    componentDidMount (){
        this.getApi();
        //this.ortalama();
    }

    ortalama = () =>{
        if(this.state.input1 === '')
        {
            alert('Bir Sayı Giriniz')
        }
        else{
            let a,b,c
            a = parseFloat(this.state.USDdata.BanknoteBuying.replace(",","."));
            b = parseFloat(this.state.USDdata.BanknoteSelling.replace(",","."));
            c = (a+b)/2
            this.setState({ortalamaUSD: c})

            a = parseFloat(this.state.EURdata.BanknoteBuying.replace(",","."));
            b = parseFloat(this.state.EURdata.BanknoteSelling.replace(",","."));
            c = (a+b) / 2
            this.setState({ortalamaEUR: c});

            a = parseFloat(this.state.GBPdata.BanknoteBuying.replace(",","."));
            b = parseFloat(this.state.GBPdata.BanknoteSelling.replace(",","."));
            c = (a+b) / 2
            this.setState({ortalamaGBP: c});


            const paralar = ['TL','USD','EUR','GBP'];
            let paraDegerleri = [1, this.state.ortalamaUSD, this.state.ortalamaEUR,this.state.ortalamaGBP];
            
            let hesapSonucu;
            let picker1Degeri = paraDegerleri[paralar.indexOf(this.state.para1)]
            let picker2Degeri = paraDegerleri[paralar.indexOf(this.state.para2)]

            hesapSonucu = ( picker1Degeri / picker2Degeri) * this.state.input1
            hesapSonucu = hesapSonucu.toFixed(2);
            this.setState({sonuc: hesapSonucu});

        }
       
    }

    //api okuma
    getApi = () =>{
        fetch('https://dovizkurlari-l6vtviaacq-uc.a.run.app/api/doviz/usd')
            .then((response) => response.json())
            .then(res => {this.setState({USDdata : res });  })
        
        fetch('https://dovizkurlari-l6vtviaacq-uc.a.run.app/api/doviz/eur')
            .then((response) => response.json())
            .then(res => {this.setState({EURdata : res});  })
    
        fetch('https://dovizkurlari-l6vtviaacq-uc.a.run.app/api/doviz/gbp')
            .then((response) => response.json())
            .then(res => {this.setState({GBPdata : res});  })

    }
    

    render(){        
        return(
            <>
                <View style={myStyle.container}>
                    <View >
                        <Text style={myStyle.tesxt1Style} > </Text>
                        <Text style={myStyle.tesxt1Style} >USD </Text>
                        <Text style={myStyle.tesxt1Style} >EUR </Text>
                        <Text style={myStyle.tesxt1Style} >GBP </Text>
                    </View>
        
                    <View >
                        <Text style={myStyle.tesxt1Style} >ALIŞ ₺</Text>
                        <Text style={myStyle.tesxt1Style} >{this.state.USDdata.BanknoteBuying}  </Text>
                        <Text style={myStyle.tesxt1Style} >{this.state.EURdata.BanknoteBuying} </Text>
                        <Text style={myStyle.tesxt1Style} >{this.state.GBPdata.BanknoteBuying} </Text>
                    </View>
        
                    <View >
                        <Text style={myStyle.tesxt1Style} >SATIŞ ₺</Text>
                        <Text style={myStyle.tesxt1Style} >{this.state.USDdata.BanknoteSelling}  </Text>
                        <Text style={myStyle.tesxt1Style} >{this.state.EURdata.BanknoteSelling} </Text>
                        <Text style={myStyle.tesxt1Style} >{this.state.GBPdata.BanknoteSelling} </Text>
                    </View>
                </View>

                <View style={myStyle.container2}>
                    <Picker
                        selectedValue = {this.state.para1}
                        style={myStyle.picker1Style}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({para1: itemValue})
                        }>
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="GBP" value="GBP" />
                        <Picker.Item label="TL" value="TL" />
                    </Picker>

                    <Picker
                        selectedValue = {this.state.para2}
                        style={myStyle.picker1Style}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({para2: itemValue})
                        }>
                        <Picker.Item label="TL" value="TL" />
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="GBP" value="GBP" />
                    </Picker>
                </View>

                <View style={myStyle.container3}>
                    <TextInput 
                        value = {this.state.input1}
                        onChangeText= {input1 => this.setState({input1})}
                        style={myStyle.textInput1Style}
                        placeholder='Sayı Giriniz'
                        keyboardType = 'numeric'
                    />
                    
                    { // sonuc değişkeni boş iken gri renkte Sonuc yazısı olacak,
                      // sonuc değişkeni dolu iken siyah kalın yazı sitili olacak
                        this.state.sonuc === 0 
                        ? <Text style={myStyle.text2Style2}>Sonuç</Text>
                        : <Text style={myStyle.text2Style}>{this.state.sonuc}</Text>
                    }
                    
                </View>

                <View style={myStyle.container4}>
                   <TouchableOpacity onPress={()=> this.ortalama()}>
                       <Text style={myStyle.buttonStyle}>Hesapla</Text>
                   </TouchableOpacity>
                </View>
            </>
        );
    }
};

const myStyle = StyleSheet.create({
    container:{
        marginTop: width *0.09,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: width * 0.1
    },
    tesxt1Style:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#F6FCFF'
    },
    container2:{
        marginTop: width *0.2,
        marginHorizontal: width * 0.05,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    picker1Style:{
        height: width * 0.11, 
        width: width * 0.35, 
        backgroundColor:'#F6FCFF'
    },
    container3:{
        marginTop: width *0.04,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: width * 0.05,
    },
    textInput1Style:{
        height:  width * 0.1,
        width: width * 0.4,
        borderColor: 'gray', 
        borderWidth: 1,
        backgroundColor: '#F6FCFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text2Style:{
        height:  width * 0.1,
        width: width * 0.4,
        backgroundColor: '#F6FCFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlignVertical:'center',
        paddingLeft: 3,
        color: '#000000'
    },
    text2Style2:{
        height:  width * 0.1,
        width: width * 0.4,
        backgroundColor: '#F6FCFF',
        fontSize: 18,
        textAlignVertical:'center',
        paddingLeft: 3,
        color:'gray'
    },
    container4:{
        marginTop: width *0.2,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonStyle:{
        width: width * 0.4,
        height: width * 0.09,
        borderRadius:10,
        textAlign:'center',
        paddingTop: 4,
        backgroundColor: '#F6FCFF',
        fontWeight: 'bold',
        fontSize: 20
    }
});
export {DovizApi};