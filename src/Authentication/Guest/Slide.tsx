import React from 'react'
import { View,Text,Image, ImageProps, Animated,Dimensions } from 'react-native'
// import styled from 'styled-components/native';
import Create from './slides/Create';
import List from './slides/List';
import Earn from './slides/Earn';
import Find from './slides/Find';
import Connect from './slides/Connect';

// export const Container = sbtyled.View`
//     height:${height*0.62};
//     width:${width};
//     justify-content:center;
//     align-items:center;
//     background:#fcfcfc;
//     border-bottom-left-radius:50px;
//     border-bottom-right-radius:50px;
// `;


const {width,height}=Dimensions.get('screen');

interface SliderProps {
    url:ImageProps ;
    description:string;
    color:string;
    type:string;
    scrollX:any;
    index:number
    
}

const Display=({types}:{types:string})=>{    
    return (
         <View style={{width,justifyContent:'center',alignItems:'center'}}>
             {types === "List" ? <List height={height*0.6} /> : types === "Find" ? <Find /> : types === "Connect" ? <Connect /> : <Earn /> }
         </View>
    )
}



const Slider: React.FC<SliderProps> = ({color,description,type,url,scrollX,index}) => {
    const inputRange=[(index-1) * width,index*width ,(index+1) * width ] 
    
    const move=scrollX.interpolate({
        inputRange,
        outputRange:[10,100,20]
    })
    
    return (
            <View>
                <Display types={type}/>
                <Animated.View style={{
                    transform:[{
                        translateY:move
                    }]
                }}>
                </Animated.View>
            </View>
        );
}

export default Slider