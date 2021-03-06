import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import {Ionicons, Feather,EvilIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
import axios from "axios";
const { width } = Dimensions.get('window')
const mycolor = "#212121" 
let baseUrl = `https://knekisan.com/`;

export default class Search_Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchtext:"",
            products:[]

        }
        this.navigation = props.navigation
      }
      componentWillMount(){
        this.getProducts();
      }
        getProducts = () =>{
          axios.get(`${baseUrl}api/v1/product/getall`).
          then((res)=>{
             var products = res.data.data;
              this.setState({products})
              // var check = products[0].images[0]
              // console.log(":1:\n\n :2: \n\n"+ JSON.stringify(check).substring(7).slice(0, -1) );
            }).
            catch(e=>{
                Alert.alert('Error : '+ e);
                
            })
          }
  render(){
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:95 + Constant.statusBarHeight,
            backgroundColor:"#4CBB17",
            
        }}>
          <View style={{
              flexDirection:"row",
              marginVertical:5,
              marginHorizontal:20,
              width:width-40,
              justifyContent:"space-between",
          }}>
             <TouchableOpacity onPress={() => this.navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={30} color="white" />
            </TouchableOpacity>
             <View>
                 <Text style={{color:"#fff", fontSize:18}}>Search Products</Text>
             </View>
             <View >
                 <MaterialCommunityIcons name="barcode-scan" size={24} color="#fff" />
             </View>
          </View>
          <View style={{flexDirection:"row" ,height: 35, width:width-30, backgroundColor: "#fff", borderRadius:5, marginHorizontal:15}}>
                <TextInput
                    style={{
                        height: 35,
                        width:width-50,
                        fontSize: 17,
                        color: "#010101",
                        backgroundColor: "#fff",
                        borderRadius:5,
                        paddingHorizontal:15}}
                        autoCapitalize="none"
                        placeholder="Search"
                        onChangeText={searchtext => this.setState({ searchtext })}
                        value={this.state.searchtext}
                    autoFocus={true}
                ></TextInput>
                <EvilIcons name="search" size={28} color="#A9A9A9" style={{marginTop:5, marginLeft:-13}} />
             </View>
        </View>
      );
  }
}