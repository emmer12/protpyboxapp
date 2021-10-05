import * as React from 'react';
import { View, StyleSheet,Animated,Text,Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { baseURL } from '../api';
import { ListingType } from '../Authentication/type';
import { AlertContext } from '../context/GlobalAlert';
import { ListingAuthNavigation, ListingNavigation } from '../navigation/type';
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

    const ActionMenu=()=>(
        <View style={styles.actionCon}>
        <Title>This the action text</Title>
        </View>
    )
  
  
    return (
    <View style={styles.cardCon}>
       <Card style={{backgroundColor:'#fff',width:width-10*2}} >
            {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
            <View style={styles.top}>
                <Button>Boosted {list.id}</Button>

               {user?.id === list.user.id && (<TouchableRipple onPress={()=>Action({show:true,id:list.id,navigation})}>
                   <MaterialCommunityIcons name="dots-vertical" size={26} />
                </TouchableRipple>)
               }
            </View>
            <TouchableWithoutFeedback onPress={() => {guest ? navigation.navigate('GuestListingDetails',{id:list.id ,type:list.space_type,guest}) : navigation.navigate('ListDetailsScreen',{id:list.id ,type:list.space_type,guest}) }} >
              <Card.Cover source={list.images ? { uri:imageUrl } : require('../../assets/meduim-product-placeholder.png') } />
            </TouchableWithoutFeedback>
            <Card.Content>
            <Title>{list.space_type }</Title>

            <Title style={{color:'#777'}}>{ list.space_address }</Title>
            <Paragraph numberOfLines={2}>Card content Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, ex repellendus nisi iste dolorem deserunt beatae! Error ratione accusantium provident!</Paragraph>
            </Card.Content>
            <View style={styles.top}>
                <Button><MaterialCommunityIcons name='decagram' size={26} /></Button>
                 <View style={styles.views}>
                   <Title style={{marginHorizontal:10,fontSize:16}}>&#8358;{list.rent }</Title>
                   <MaterialCommunityIcons name='eye' color="#aaa" size={20} />
                   <Text style={styles.vcount}>{ list.views.length }</Text>
                 </View>
            </View>
        </Card>

   </View>
   )
}

const styles=StyleSheet.create({
    cardCon:{
        margin:10,
    },
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5
    },
    views:{
        flexDirection:'row',
        alignItems:'center' 
    },
    vcount:{
        color:'#aaa',
        marginLeft:5
    },
})


export default ProptyBox;
