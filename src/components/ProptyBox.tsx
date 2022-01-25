import * as React from 'react';
import { View, StyleSheet,Animated,Text,Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { baseURL } from '../api';
import { ListingType } from '../Authentication/type';
import { AlertContext } from '../context/GlobalAlert';
import { ListingAuthNavigation, ListingNavigation,AuthenticationType } from '../navigation/type';
import AuthContext from '../store/context';


interface ProptyBox {
    list:ListingType;
    navigation:ListingAuthNavigation;
    guest?:boolean;
}

const {width,height}=Dimensions.get('window')

const ProptyBox=({list,navigation,guest}:ProptyBox)=>{
    
    const LeftContent = (props:any)=> <Avatar.Icon {...props} icon="folder" />
    const imageUrl=list && list.images && `${baseURL}/uploads/listing/${list.images[0]?.filename}` 
    const { action : Action } = React.useContext(AlertContext);
    const {user} =React.useContext(AuthContext)

    // const ActionMenu=()=>(
    //     <View style={styles.actionCon}>
    //     <Title>This the action text</Title>
    //     </View>
    // )


    const cap = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };




  
    return (
    <View style={styles.cardCon}>
       <Card style={{backgroundColor:'#fff',width:width-30*2}} >
            {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
            <View style={styles.top}>
                {list.boosted && <Button>Boosted</Button>}

               {user?.id === list.user.id && (<TouchableRipple onPress={()=>Action({show:true,id:list.slug,navigation})}>
                   <MaterialCommunityIcons name="dots-vertical" size={26} />
                </TouchableRipple>)
               }
            </View>
            <TouchableWithoutFeedback style={{paddingHorizontal:10,paddingVertical:10}} onPress={() => {guest ? navigation.navigate('GuestListingDetails',{id:list.slug ,type:list.space_title,guest}) : navigation.navigate('ListDetailsScreen',{id:list.slug ,type:list.space_title,guest}) }} >
              <Card.Cover 
              source={list.images.length >= 1 ? { uri:imageUrl } : require('../../assets/no-image.png') }
              />
              
            </TouchableWithoutFeedback>
            <Card.Content>
            <Title>{cap(list.space_title) }</Title>

            <Paragraph numberOfLines={2}>{ list.about_property }</Paragraph>
            </Card.Content>
            <View style={styles.top}>
            <Text style={{textTransform:'uppercase',paddingHorizontal:14,marginTop:5}}><MaterialCommunityIcons color="gray" name='map-marker' size={16} /> {list.space_state}</Text>
                 {/* <Text>HElo</Text> */}
                 <View style={styles.views}>
                   <Title style={{marginHorizontal:10,fontSize:16}}>&#8358;{list.rent }</Title>
                   {/* <MaterialCommunityIcons name='eye' color="#aaa" size={20} /> */}
                   {/* <Text style={styles.vcount}>{ list.views.length }</Text> */}
                 </View>
            </View>
        </Card>

   </View>
   )
}

const styles=StyleSheet.create({
    cardCon:{
        marginVertical:10,
        marginHorizontal:30
    },
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        // padding:5
        paddingVertical:10
    },
    views:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        justifyContent:'flex-end'
    },
    vcount:{
        color:'#aaa',
        marginLeft:5
    },
})


export default ProptyBox;
