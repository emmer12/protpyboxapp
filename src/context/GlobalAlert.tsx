import React, { useEffect, useState } from "react";
import { StyleSheet,Dimensions,View,Text,Animated } from "react-native";
import style from "../style";
import { Ionicons } from "@expo/vector-icons";
import ActionCard from "../components/ActionCard";


const {width}=Dimensions.get('window')


// export const AlertConsumer=AlertContext.Consumer;

interface AlertInterface{
    title:string;
    body?:string;
    type:'success' | 'primary' |'warning' | 'error' ; // error, success ,info 
    action?:()=>void;
    confirm?:boolean;
    position?:'top' | 'bottom' | 'center';
    visible:boolean;
}

interface ActionInterface{
    id?:number,
    show:boolean,
    navigation?:any
}


interface ContextInterface{
    alert:(value:AlertInterface)=>void
    action:(value:ActionInterface)=>void
}

const defaultValue:AlertInterface={
    title:'',
    body:'',
    type:'primary',
    action:undefined,
    confirm:false,
    position:'top',
    visible:false,
}


export const AlertContext=React.createContext<ContextInterface>({alert})

export const AlertProvider=({customStyle,children}:any)=>{
    
    const [value,setValue]=useState(defaultValue)
    const [show,setShow]=useState(false)
    const [listId,setListId]=useState<any>(null)
    const [navigation,setNav]=useState<any>(null)
    let {title,body,type,position,confirm,action,visible}=value
    let AnimatedVal=new Animated.Value(0)
    
    const getCustomStyle = ()=>{
        let icon={}, text=[]
        let theme=customStyle[type]
        icon=theme.icon
        text=theme.text
        
        return {
            icon,
            text 
        }
    }


    useEffect(()=>{
        Animated.timing(AnimatedVal,{
            toValue:1,
            useNativeDriver:true,
            duration:500
        }).start()
     },[value])
    
    const setAlert=({title='',type='primary',action=undefined,confirm=false,body='',position='top',visible=false}:AlertInterface)=>{ 
        setValue({
             title,
             body,
             type,
             action,
             confirm,
             position,
             visible
         })
    }

    const setAction=({show,id,navigation}:ActionInterface)=>{
        setShow(show)
        id && setListId(id)
        navigation && setNav(navigation)
    }

    const AlertRender=()=>{
        let containerStyle=[styles.AlertContainer]
        let {icon,text} = getCustomStyle()
        
        let textStyle=[styles.titleColor]

    
    
        textStyle.push(text)

        setTimeout(()=>{
            setValue({
                ...value,
                visible:false
            })
        },10000)

        position === 'top' ? containerStyle.push(styles.top) && containerStyle.push({
            transform:[
                {translateY:AnimatedVal.interpolate({
                    inputRange:[0,1],
                    outputRange:[-width,0]
                })}
            ]
        })  : position === 'bottom' ? containerStyle.push(styles.bottom) && containerStyle.push({
            transform:[
                {translateY:AnimatedVal.interpolate({
                    inputRange:[0,1],
                    outputRange:[width,0]
                })}
            ]
        }) : containerStyle.push(styles.center)
       return (
           
         <Animated.View style={containerStyle}>
             <View style={styles.inner}>
                 <View style={[styles.icon,{marginRight:10}]}>
                     <Ionicons name={icon.name} color={icon.color} size={40} />
                 </View>
                <Text style={textStyle}>{title}</Text>
             </View>  
         </Animated.View>)
         
        }
         

   


    return (
        <AlertContext.Provider value={{alert:setAlert,action:setAction}}>
             {children}
             {
                 visible && AlertRender()   
             }

             {show && <ActionCard {...{listId,navigation}}  />}
        </AlertContext.Provider>
    )
}


const styles=StyleSheet.create({
    AlertContainer:{
        backgroundColor:'#fff',
        padding:10,
        width:width-20,
        margin:10,
        borderRadius:20,
        shadowColor:'#ddd',
        shadowOpacity:5
    },
    inner:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'

    },
    titleColor:{
        color:'red'
    },
    top:{
        position:"absolute",
        top:50,
        left:0,
    },
    bottom:{
        position:"absolute",
        bottom:50,
        left:0,
    },
    center:{

    }

})