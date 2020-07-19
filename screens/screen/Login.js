import React, { Component } from 'react';
import { View,Text,TouchableOpacity, Alert } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import {Form,Item,Label,Button,Icon, Input,Picker } from "native-base"
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {MaterialCommunityIcons,AntDesign,Entypo} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import axios from "axios";
import { AsyncStorage } from 'react-native';
let baseUrl = `https://knekisan.com/`;
export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          // selected: "",
          username: "",
          password: "",
          responce: null
        };
      }
      loginSubmit= ()=>{
        axios({
          method: 'POST',
          url: `${baseUrl}api/v1/authentication/login`,
          data: {
            'userName' : this.state.username,
            'password' : this.state.password
          }
        }).
        then  ( respone=>{
          let responce = JSON.stringify(respone.data.token)
          this.setState({responce})
          // console.log('Sucess :  ::::::::::::::::::::::  \n\n\n\n\n'+ respone.data.id);
          // this.storeData();
         AsyncStorage.setItem( "user",respone.data.id).
          then(async()=>{
            AsyncStorage.setItem('username',this.state.username)
            .then(async()=>{
              Alert.alert("You've been Successfully logged in!")
              this.setState({
                username:null,
                password:null,
                responce:null
              })
              this.props.nav.navigate("Home")
              // this.props.navigation.goBack();
            // let test= await AsyncStorage.getItem('username')
            // console.log('test :'+JSON.stringify(test));  
            })
            .catch((e)=>{
              console.log('error setting user name : '+e);
            })
          }).
          catch(e=>{
            console.log('error setting user id\n\n\n : '+e);
          })
        }).catch(e=>{
          console.log('error from backend: '+e);
          Alert.alert("Credentials not valid!")
          
        })
      }

    render(){
        return(
            <View>
                <Text style={{fontSize:20,marginTop:35,textAlign:"center"}}>Hey,User</Text>
                <Form> 
             <Item floatingLabel>
                <Label>User Name</Label>
                 <Input 
                value={this.state.username}
                onChangeText={
                username=>this.setState({username})
                }
               />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
                <Input 
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={
                password=>this.setState({password})
                }
            />
            </Item>
            </Form> 
    
            <View style={{alignItems:"center"}}>
            <Button 
            onPress={()=>this.loginSubmit()}
            style={{width:150,marginTop:45,justifyContent:"center",backgroundColor:"green"}}
            >
                <Text style={{textAlign:"center",color:"#fff"}}>Login</Text>
            </Button>
            </View>
            </View>
        );
    }
}