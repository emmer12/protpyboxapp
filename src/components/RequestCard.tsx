import * as React from 'react';
import { View, StyleSheet,Animated,Text, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Caption } from 'react-native-paper';
import { RequestType } from '../Authentication/type';
import { RequestNavigation } from '../navigation/type';
import theme from '../theme';


const { width,height } = Dimensions.get('window')

interface RequestCard {
    request:RequestType;
    navigation:RequestNavigation;
    from:string
}

const RequestCard=({request,navigation,from}:RequestCard)=>{
    
    // const imageUrl=request && `https://proptybox.com/uploads/listing/${request.images[0]}`
   return (
    <View style={[styles.cardCon,{width:from === 'request' ? width-20 : 300 }]} >
             <View style={styles.left}>
                <Avatar.Image size={60} source={require('../../assets/avatar.png')} />
             </View>
             <View style={styles.details}>
                 <Title>{request.user.fullname.length >20 ? request.user.fullname.substr(0,15) + '...' : request.user.fullname} </Title>
                 <Caption>{request.user.age} yrs | {request.user.gender}</Caption>
                 <Text>Budget &#8358;{request.min_budget}-{request.max_budget}</Text>
             </View>
   </View>
   )
}

const styles=StyleSheet.create({
    cardCon:{
        height:120,
        backgroundColor:'#f9f9f6',
        margin:10,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
          shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 1 ,
        borderLeftColor:theme.colors.primary,
        borderLeftWidth:4
        

    },
    left:{
        paddingHorizontal:10

    },
    details:{

    }
    
})


export default RequestCard;
