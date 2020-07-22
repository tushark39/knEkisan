import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Image, View, Alert,TouchableOpacity } from 'react-native';
import { Ionicons, Feather,EvilIcons,FontAwesome, AntDesign} from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { Header5 } from "../components/Header_components";
import { Form,Item,Label,Input, Button } from 'native-base';
import {AsyncStorage} from 'react-native';  
import  { Card1, Card2, Card3, Card4, Card5, LabelCard, LargeCategoryCards, SmallCategoryCards, ScrollHorizontal_Product_SuggestionView,  } from "../components/Card"
// import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'
import Modal from "react-native-modal";
// import Product_enquiy from './screen/Product_enquiy'
let baseUrl =`https://knekisan.com/`
const { width , height} = Dimensions.get('window')
export default class Product_Description extends React.Component {
    constructor(props) {
        super(props);
         
        this.state = {
            _productName:"",
            _productDisc:"",
            _productPrice:"",
            _productImages:[],
            _productFrontImage:'',
            _productqualityParameter:[],
            _productId: "",
            _modalVisible:false,
            bori: "",
            quality: "",
            weight: "",
            vehicleNo: "",
            driver: "",
            remarks: "",
            customer: "",
            product:"",
            disabledButton: true
    
        };
         }
    componentWillMount(){
        let user = AsyncStorage.getItem('user');  
        // let parsed = JSON.parse(user);  
    //    console.log('key:\n\n\n\n\n\n '+  JSON.stringify(user) );
       
        axios.get(`${baseUrl}api/v1/product/${this.props.route.params.itemId}`)
        .then((res)=>{
            console.log('result : ',JSON.stringify(res));
            var _productName = res.data.data.name
            var _productDisc = res.data.data.description
            var _productPrice = res.data.data.price
            var _productImages = res.data.data.images
            var _productqualityParameter = res.data.data.qualityParameters
            var productImage = _productImages[0]
            var _productId = res.data.data._id
            var trya = JSON.stringify(productImage).split('public')[1]
            // console.log('test : image : '+ trya.slice(0,-1));
            
            // var test = JSON.stringify(this.props.route.params.itemId)
            // let _productId1 = JSON.stringify(this.props.route.params.itemId).substring(1,1)
                // console.log('HII\n\n\n\n'+_productId)
            this.setState({
                _productName,_productDisc,_productPrice,_productImages:JSON.stringify(_productImages),
                _productFrontImage:trya.slice(0,-1),
                _productqualityParameter:_productqualityParameter[0],_productId
            })
            // console.log("HII \n\n\n\n " + _productqualityParameter[0]._id)
            // console.log('test\n'+this.props.route.params);
            // let _productId = this.props.params.itemId
            // let _productId = this.pro
            
        })
        .catch(err=>console.log('Error',err)
        )
    }
    componentDidMount(){
        
    }
    sendEnquire= async (parameter,values,id)=>{
        // console.log('State check :\n\n\n\n\n '+JSON.stringify(this.state));
         let _userKey = await AsyncStorage.getItem('user')
         axios.post(`${baseUrl}api/v1/inquiry/create/`,{
            "bori": this.state.bori,
            "quality": parameter,
            "weight": values,
            "vehicleNo": this.state.vehicleNo,
            "driver": this.state.driver,
            "remarks": this.state.remarks,
            "customer": _userKey,
            "product":id
        }).
        then((data)=>{
            console.log("sucess : "+ data)
            Alert.alert("Success","Inquiry sent! We will get back to you shortly.")
            this.props.navigation.goBack();
        }).
        catch((e)=>{
            console.log(e);
            
        })
        // Alert.alert("Sucess","We will contact you soon")
    }
    // disabledButtonCheck=()=>{
    //     if(
    //         this.state.bori !== ""&&
    //         this.state.weight !== ""&&
    //         this.state.vehicleNo !== ""&&
    //         this.state.driver !== ""&&
    //         this.state.remarks !== ""
    //     ){
    //         // this.setState({disabledButton:false})
    //         return false
    //     }
    //     else{
    //         return true
    //         // this.setState({disabledButton:true})
    //     }
    // }

  render(){
    //   this.disabledButtonCheck();
    //   console.log('test',this.state._productqualityParameter[0])
    
    return (
        <View style={{flex:1,backgroundColor:"#D3D3D3"}}>
            <Header5 navigation={this.props.navigation}/>
            <ScrollView>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{padding:10}}>
                        <View style={{height:25, width:120, borderColor:"green", alignItems:"center", justifyContent:"center", borderWidth:1, borderRadius:2, backgroundColor:"#d0f0c0"}}>
                            <Text style={{fontSize:13, fontWeight:'bold'}}>{this.state._productName}</Text>                    
                        </View>
                        <Text style={{ fontSize:22, marginTop:5}}>{this.state._productDisc}</Text>
                        <View style={{flexDirection:'row', width:180, marginTop:3, justifyContent:"space-between"}}>
                            <Text style={{fontSize:15, fontWeight:"bold"}}>{this.state._productPrice}</Text>
                            {/* <View style={{flexDirection:'row', marginTop:3}}>
                                <Text style={{fontSize:13, color:'grey'}}>MRP:  </Text>
                                <Text style={{fontSize:13, color:'grey', textDecorationLine:"line-through", textDecorationColor:"grey"}}>{this.state._productPrice}</Text>
                            </View> */}
                            {/* <View style={{width:50, height:18, marginTop:2, backgroundColor:'red', borderRadius:2, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:12, color:'#fff'}}>37% off</Text>
                            </View> */}
                        </View>
                        {/* <Text style={{fontSize:10, color:'grey'}}>(inclusive of all taxes)</Text> */}
                    </View>
                    <View style={{height:350, width:width, elevation:3}}>
                        <Image
                            style={styles.image}
                            // source={{uri:`${baseUrl}${this.state._productFrontImage}`}}
                            // source={require("./../assets/swiper-1.png")}
                            source={
                            {uri:`${baseUrl}${this.state._productFrontImage}`=== null}
                                ? {uri:`${baseUrl}${this.state._productFrontImage}`}
                                : ("./../assets/swiper-1.png")
                            }
                        /> 
                    </View>
                    {/* <View style={{ paddingHorizontal:10, marginTop:15}}> */}
                        {/* <Text style={{fontSize:20}}>Pack Sizes</Text> */}
                        {/* <View style={{height:60, width:width-20, marginTop:10, borderColor:"green", borderWidth:1, borderRadius:5}}>
                            <View style={{width:50, height:15, backgroundColor:'red', borderRadius:2, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:10, color:'#fff'}}>37% off</Text>
                            </View>
                            <View style={{flexDirection:'row', paddingHorizontal:10, justifyContent:'space-between'}}>
                                <Text style={{fontSize:13, fontWeight:'bold'}}>1 kg</Text>
                                <View>
                                    <Text style={{fontSize:13, fontWeight:'bold'}}>{this.state._productPrice}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:13, color:'grey'}}>MRP:  </Text>
                                        <Text style={{fontSize:13, color:'grey', textDecorationLine:"line-through", textDecorationColor:"grey"}}>{this.state._productPrice}</Text>
                                    </View>
                                </View>
                                <RadioButton
                                    value="first"
                                    status='checked'
                                    color='black'
                                />
                            </View>
                        </View> */}
                        {/* <View style={{ flexDirection:'row', marginTop:15, marginBottom:15, justifyContent:'flex-end'}}>
                            <TouchableOpacity style={{ flexDirection:'row'}}>
                                <Text style={{ fontWeight:'bold'}}>+1 more combo  </Text>
                                <AntDesign name="right" size={18} color="black" />
                            </TouchableOpacity>
                        </View> */}
                    {/* </View> */}
                
                </View>
                {/* <View style={{height:60, paddingHorizontal:10, paddingVertical:10, marginTop:5, backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text>Your next available slot  </Text>
                        <Ionicons name="ios-information-circle-outline" size={20} color="grey" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            style={{height:15,width:20}}
                            source={require('./../assets/truck.png')}
                        />
                        <Text>  All Slots Full. Please Try Again Later</Text>
                    </View>
                </View> */}
                <View style={{marginTop:5, padding:10, backgroundColor:'#fff'}}>
                    <Text style={{fontSize:20}}>About this product</Text>
                </View>
                <View style={{height:1}}></View>
                {/* <View style={{padding:10, backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:16, color:'grey'}}>About</Text>
                        <TouchableOpacity>
                            <Ionicons name="ios-add" size={28} color="grey" style={{paddingRight:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingVertical:10, paddingHorizontal:15}}>
                        <Text style={{width:width-45, color:'grey'}}>
                            DSogufbfb fask bhf bdnff kl jbhfo ibh few oib nesf o k l f e wjbn few olifbe wbf fEW KJ BNFKE W FBN4EWJBE BN  REGKIWB N FBHI F HIGBN GFH NEWGF EBH REGNEW TEBNR
                        </Text> 
                    </View>
                </View> */}
                {/* <View style={{height:1}}></View>
                <View style={{padding:10, backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:16, color:'grey'}}>Nutritional Facts</Text>
                        <TouchableOpacity>
                            <Ionicons name="ios-add" size={28} color="grey" style={{paddingRight:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingVertical:10, paddingHorizontal:15}}>
                        <Text style={{width:width-45, color:'grey'}}>
                            DSogufbfb fask bhf bdnff kl jbhfo ibh few oib nesf o k l f e wjbn few olifbe wbf fEW KJ BNFKE W FBN4EWJBE BN  REGKIWB N FBHI F HIGBN GFH NEWGF EBH REGNEW TEBNR
                        </Text> 
                    </View>
                </View> */}
                <View style={{height:1}}></View>
                <View style={{padding:10, backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:16, color:'grey'}}>Quality Parameters</Text>
                        <TouchableOpacity>
                            <Ionicons name="ios-add" size={28} color="grey" style={{paddingRight:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingVertical:10, paddingHorizontal:15}}>
                        <Text style={{width:width-45, color:'grey'}}>
                         Parameter : {this.state._productqualityParameter.parameter}
                        </Text> 
                        <Text style={{width:width-45, color:'grey'}}>
                         Values : {this.state._productqualityParameter.values}
                        </Text> 
                        <Text style={{width:width-45, color:'grey'}}>
                         Factors : {this.state._productqualityParameter.factors}
                        </Text> 
                    </View>
                </View>
                <View style={{ height:60, marginTop:5}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:"center", backgroundColor:'black'}}>
                       <TouchableOpacity 
                       onPress={()=>{
                           this.setState({_modalVisible: true})
                        //    this.sendEnquire(
                        //        this.state._productqualityParameter.parameter,
                        //        this.state._productqualityParameter.values,
                        //        this.state._productqualityParameter._id
                        //    );
                       }}
                       style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:"center", backgroundColor:'black'}}>
                        <FontAwesome name="openid" size={24} color="white" />
                        <Text style={{fontSize:17, color:'#fff', paddingLeft:25}}>Send Inquiry</Text>
                       </TouchableOpacity>
                    </View>
                {/* Modal View */}
                <Modal style={{backgroundColor:"green",alignItems:"center"}} isVisible={this.state._modalVisible}>
                <View style={{flex:1}}>
                   <TouchableOpacity onPress={()=>this.setState({_modalVisible:false})}>
                   <FontAwesome style={{marginLeft:10,marginTop:5}} color="#fff" size={36} name="close"/>
              </TouchableOpacity> 

              <View style={{flex:1,backgroundColor:"#689f39", alignItems:"center", justifyContent:"center"}}>
          <View style={{flexDirection:"row",height:50, width:width-20, elevation:5, marginBottom:5}}>
          </View>
          <View style={{height:height-250, width:width-20, elevation:5, backgroundColor:"#fff"}}>
             
          <View>
                <Text style={{fontSize:20,marginTop:35,textAlign:"center"}}>Enter Details</Text>
                <Form style={{alignItems:"center"}}> 
             <Item floatingLabel >
                <Label>Bori</Label>
                 <Input 
                onChangeText={
                bori=>this.setState({bori})
                }
                 />
            </Item>
            <Item floatingLabel>
              <Label>weight</Label>
                <Input
                onChangeText={
                 weight=>this.setState({weight})
                }
                />
            </Item>
            <Item floatingLabel>
              <Label>vehicleNo</Label>
                <Input
                onChangeText={
                 vehicleNo=>this.setState({vehicleNo})
                }
                />
            </Item>
            <Item floatingLabel>
              <Label>driver</Label>
                <Input
                    onChangeText={
                 driver=>this.setState({driver})
                }
                />
            </Item>
            <Item floatingLabel>
              <Label>remarks</Label>
                <Input
                    onChangeText={
                 remarks=>this.setState({remarks})
                }
                />
            </Item>
            <Button 
            disabled={
            this.state.bori &&
            this.state.weight &&
            this.state.vehicleNo &&
            this.state.driver ? false : true
            }
            
            onPress={()=>{
                this.sendEnquire(
                 this.state._productqualityParameter.parameter,
                 this.state._productqualityParameter.values,
                 this.state._productId
            );
            }}
            style={{justifyContent:"center",marginTop:35,width:200,borderRadius:30,
            backgroundColor:
            this.state.bori &&
            this.state.weight &&
            this.state.vehicleNo &&
            this.state.driver &&
            this.state.remarks  ? "green" : "gray"}}
            success>
                <Text style={{color:"#fff"}}>Send Enquiry</Text>
            </Button>
            </Form> 
    

            
            </View>
 
          </View>       
      </View>
              {/* <Product_enquiy 
              parameter={this.state._productqualityParameter.parameter}
              values={this.state._productqualityParameter.values}
              _id={this.state._productqualityParameter._id}
              /> */}
              </View>
                </Modal>
                </View>
                <View style={{padding:10, marginTop:5, backgroundColor:'#fff'}}>
                    <Text style={{fontSize:16, marginBottom:10}}>Similar Products</Text>
                    <ScrollHorizontal_Product_SuggestionView/>
                </View>
                {/* <View style={{padding:10, marginTop:5, backgroundColor:'#fff'}}>
                    <Text style={{fontSize:16, marginBottom:10}}>Frequently Bought Together</Text>
                </View> */}
            </ScrollView>      
        </View>
  );
  }
}

const styles = StyleSheet.create({
    image:{
        flex: 1,
        height: null, 
        width: null, 
        resizeMode: 'contain', 
        borderWidth: 0.1, 
    },

})
