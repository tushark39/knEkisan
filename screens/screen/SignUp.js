import React, { Component } from 'react';
import { View,Text,TouchableOpacity, Alert } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import {Form,Item,Label,Button,Icon, Input,Picker } from "native-base"
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {MaterialCommunityIcons,AntDesign,Entypo} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import axios from "axios";
// import { Dropdown } from "react-native-material-dropdown";
let baseUrl = `https://knekisan.com/`;
// let baseUrl = `http://192.168.29.157:4000/`;
export default class signUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          selected: "Adatiya",
          imageProfile: null,
          imageAadhar: null,
          imagePan: null,
          fullName:"",
          username:"",
          password:"",
          mNumber:"",
          land:"",
          area:"",
          comodity:"",
          accNumber:"",
          ifscCode:"",
          accHolderName:"",
          aadharNumber:"",
          pan:"",
          addressLine1:"",
          addressLine2:"",
          uState:'',
          uCity:"",
          check1:null,
          check2:null,
          check3:null,
        };
      }
      componentDidMount() {
        this.getPermissionAsync();
      }
      onValueChange(value) {
        this.setState({
          selected: value,
          image: null,
        });
      }
      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };
    
      _pickImageProfile = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ imageProfile: result.uri,check1:"check" });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
      _pickImageAadhar = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ imageAadhar: result.uri ,check2:"check"});
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
      _pickImagePan = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ imagePan: result.uri ,check3:"check"});
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
      submitData=(fullName,username,password,mNumber,land,area,comodity,accNumber,ifscCode,accHolderName,aadharNumber,pan,selected,image)=>{
        if(
          this.state.username !==""&&
          this.state.password !==""
        ){
          axios.post(`${baseUrl}api/v1/authentication/register/`,{
            "userType": selected,
            "userName": username,
            "password": password,
            "addressLine1": this.state.addressLine1,
            "addressLine2": this.state.addressLine2,
            "state": this.state.uState,
            "city": this.state.uCity,
            "mobile": mNumber,
            "landArea": land,
            "landAreaType": "accassre",
            "commodity": comodity,
            "bankDetails": {
                "accHolderName":accHolderName,
                "ifscCode":ifscCode,
                "accNumber":accNumber
            },
            "documentsUploaded": [
                {"profile" : image}
            ],
            "emailNotification": true,
            "pushNotification": true,
            "admin": false
        }).
        then((data)=>{
            console.log("sucess : "+ data)
            Alert,alert("User Regestered Sucessfully")
            this.props.nav.navigate("Home")
        }).
        catch((e)=>{
            console.log(e);
            
        })
        }
        else{
          Alert.alert("Invalid username or password")
        }
      }
    render(){
        let { image } = this.state;
        return(
    <ProgressSteps >
        <ProgressStep label="User">
            <View style={{ backgroundColor:"#fff" }}>
            {/* <Form> */}
            <Picker
              mode="dropdown"
              iosHeader="Select User Type"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width:200,marginLeft:5,marginBottom:-30 }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Adatiya" value="Adatiya" />
              <Picker.Item label="Brochoure" value="Brochoure" />
              <Picker.Item label="Farmer" value="Farmer" />
            </Picker>
            <Item style={{marginTop:20}} floatingLabel>
            <Label>Full Name</Label>
            <Input 
            style={{
            
            }}
                value={this.state.fullName}
                autoCorrect={false}
                autoCapitalize="sentences"
                keyboardType="default"
                onChangeText={
                fullName=>this.setState({fullName})
                }
            />
            </Item>
            <Item  floatingLabel>
            <Label>User Name</Label>
            <Input 
                value={this.state.username}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={
                username=>this.setState({username})
                }
            />
            </Item>
            <Item  floatingLabel>
            <Label>Password</Label>
            <Input 
                value={this.state.password}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={
                password=>this.setState({password})
                }
            />
            </Item>
            <Item  floatingLabel>
            <Label>Mobile Number</Label>
            <Input 
                value={this.state.mNumber}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={
                mNumber=>this.setState({mNumber})
                }
            />
            </Item>
            <Item  floatingLabel>
            <Label>Address 1</Label>
            <Input 
                value={this.state.addressLine1}
                autoCorrect={false}
                autoCapitalize="sentences"
                keyboardType="default"
                onChangeText={
                addressLine1=>this.setState({addressLine1})
                }
            />
            </Item>
            <Item  floatingLabel>
            <Label>Address 2</Label>
            <Input 
                value={this.state.addressLine2}
                autoCorrect={false}
                autoCapitalize="sentences"
                keyboardType="default"
                onChangeText={
                addressLine2=>this.setState({addressLine2})
                }
            />
            </Item>
            <Item  floatingLabel>
            <Label>City</Label>
            <Input 
                value={this.state.uCity}
                autoCorrect={false}
                autoCapitalize="sentences"
                keyboardType="default"
                onChangeText={
                uCity=>this.setState({uCity})
                }
            />
            </Item>
            <Item  floatingLabel>
            <Label>State</Label>
            <Input 
                value={this.state.uState}
                autoCorrect={false}
                autoCapitalize="sentences"
                keyboardType="default"
                onChangeText={
                uState=>this.setState({uState})
                }
            />
            </Item>
          {/* </Form> */}
            </View>
        </ProgressStep>
        <ProgressStep label="Land">
        <View style={{ backgroundColor:"#fff" }}>
            {/* <Form> */}
            <View style={{flexDirection:"row"}}>
            <View style={{flex:2}}>
            <Item floatingLabel
            
            style={{width:100}}
            >
            {/* <Icon active name='home' /> */}

            <Label>Land</Label>
            <Input 

                value={this.state.land}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={
                land=>this.setState({land})
                }
            />
            </Item>
            </View>
            <View>
            <Picker
              mode="dropdown"
              iosHeader="Select User Type"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width:15 ,flex:2}}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="sq" value="sq" />
              <Picker.Item label="acre" value="acre" />
            </Picker>
            </View>
            {/* <View style={{flex:1}}></View> */}
            </View>
            <Item  floatingLabel>
            <Label>Commodity</Label>
            <Input 
                value={this.state.comodity}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={
                comodity=>this.setState({comodity})
                }
            />
            </Item>
          {/* </Form> */}
            </View>
        </ProgressStep>
        <ProgressStep label="Bank">
        <View style={{ backgroundColor:"#fff" }}>
            {/* <Form> */}
            <Item floatingLabel>
              <Label>Account Number</Label>
              <Input 
                value={this.state.accNumber}
                  onChangeText={
                      accNumber=>this.setState({accNumber})
                  }
              />
            </Item>
            <Item floatingLabel>
              <Label>IFSC Code</Label>
              <Input 
                value={this.state.ifscCode}
                  onChangeText={
                      ifscCode=>this.setState({ifscCode})
                  }
              />
            </Item>
            <Item floatingLabel>
              <Label>Account Holder Name</Label>
              <Input 
                value={this.state.accHolderName}
                  onChangeText={
                      accHolderName=>this.setState({accHolderName})
                  }
              />
            </Item>
          {/* </Form> */}
            </View>
        </ProgressStep>
        <ProgressStep label="Personal ">
        <View style={{ backgroundColor:"#fff" }}>
            <Form>
            <Item floatingLabel>
              <Label>Aadhar Number</Label>
              <Input 
                  onChangeText={
                      aadharNumber=>this.setState({aadharNumber})
                  }
              />
            </Item>
            <Item floatingLabel>
              <Label>PAN</Label>
              <Input 
                  onChangeText={
                      pan=>this.setState({pan})
                  }
              />
            </Item>
          </Form>
            </View>
        </ProgressStep>
        <ProgressStep label="Upload "
        onSubmit={()=>this.submitData(
            this.state.fullName,
            this.state.username,
            this.state.password,
            this.state.mNumber,
            this.state.land,
            this.state.area,
            this.state.comodity,
            this.state.accNumber,
            this.state.ifscCode,
            this.state.accHolderName,
            this.state.aadharNumber,
            this.state.pan,
            this.state.selected,
            this.state.image
        )}
         >
        <View style={{ backgroundColor:"#fff" }}>
            <Form style={{alignItems:"center",marginTop:20}}>
            <TouchableOpacity onPress={this._pickImageProfile} style={{flexDirection:"row"}}>
            <MaterialCommunityIcons name="face-profile" size={26} color="black" />
                <Text>
                &nbsp;&nbsp;:Upload your photo
                </Text>
                <Text>
                &nbsp;&nbsp;<Entypo name={this.state.check1} size={18} color="green"/>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pickImageAadhar} style={{flexDirection:"row",marginTop:20}}>
            <AntDesign name="idcard" size={26} color="black" />
                <Text>
                &nbsp;&nbsp;:Upload your Aadhar
                </Text>
                <Text>
                &nbsp;&nbsp;<Entypo name={this.state.check2} size={18} color="green"/>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pickImagePan} style={{flexDirection:"row",marginTop:20}}>
            <AntDesign name="idcard" size={26} color="black" />
                <Text>
                &nbsp;&nbsp;:Upload your PAN
                </Text>
                <Text>
                &nbsp;&nbsp;<Entypo name={this.state.check3} size={18} color="green"/>
                </Text>
            </TouchableOpacity>
          </Form>

            </View>
        </ProgressStep>
    </ProgressSteps>

        );
    }
}