import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Image, View } from 'react-native';
import Search_Header from "../components/Search_Header";
const { width , height} = Dimensions.get('window')

export default class Basket extends React.Component {
  
  render(){
    return (
      <View style={{flex:1,backgroundColor:"#D3D3D3"}}>
        <Search_Header navigation={this.props.navigation}/>
        <ScrollView>
          <View style={{height:height-70,justifyContent: "center", alignItems:"center"}}>
              <Text>
                  Search
              </Text>
          </View> 
        </ScrollView>      
      </View>
  );
  }
}

const styles = StyleSheet.create({


})
