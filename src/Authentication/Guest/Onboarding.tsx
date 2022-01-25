import { StatusBar } from 'expo-status-bar';
import React, { useRef,useState } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet, Animated,Alert,Dimensions,TouchableOpacity } from 'react-native';
import Slider from "./Slide";
import { Button, Title,Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


const {width,height} =Dimensions.get('window')
const DotWidth = 10
const DotHeight = 10


const slides=[
  {
      title:'List Property',
      description:'List your vacant apartment for free and connect with loads of home hunters now!',
      type:"List",
      color:"green",
  },

  {
    title:'Find you dream home',
    description:'Whether on your sofa or on the go you can find your ideal room. Proptybox makes your search fun!',
    type:"Find",
    color:"green",
},
{
    title:'Connect',
    description:'List your space for free and tell us about your ideal roommate in a few steps. ',
    type:"Connect",
    color:"green",
},
 
]

export default function OnBoarding({navigation:{navigate}}:any) {

    const scrollX = useRef(new Animated.Value(0)).current;
    const listRef=useRef<any>()
    const [pIndex, setIndex] = useState(0)
    const [actionText, setActionText] = useState<string>("Next")
    

    const inputRange=[-width,0, width]; 
    
    const move=scrollX.interpolate({
        inputRange,
        outputRange:[width,0,-width]
    })

    const translateX=scrollX.interpolate({
        inputRange,
        outputRange:[-DotWidth*2,0,DotHeight*2]
    })

    

    const Item = ({ item, scrollX, index }: any) => {
        return (
            <Slider scrollX={scrollX} url={item.url} index={index} color={item.color} description={item.description} type={item.type} />
        )
    }

      const Details = ({ description,index,title }: any) => {
        const inputRange=[(index-1) * width,index*width ,(index+1) * width ] 

        const zoom=scrollX.interpolate({
            inputRange,
            outputRange:[0.5,1,0.5]
        })
        const opacity=scrollX.interpolate({
            inputRange,
            outputRange:[0,1,0]
        })

        
          return (
            <Animated.View style={[styles.details,{opacity,transform:[{scale:zoom}]}]}>
                <Title style={styles.title} >{title}</Title>
                <Text style={styles.desc}>{description}</Text>
           </Animated.View>
          )
      }
      const setActiveIndex=(index:number)=>{
        setIndex(index)
      }


    const handleNext=()=>{
        if (pIndex < slides.length-1) {
            listRef?.current?.scrollToOffset({
                animated:true,
                offset:(pIndex+1)*width,
            })
            setIndex(pIndex+1)
         }
    }

    const handleStart=()=>{
          setIndex(0)
          navigate('SignInScreen')   
    } 
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark'   />
            <View >
                             
                 <Animated.FlatList
                    ref={listRef}
                    data={slides}
                    renderItem={({ item, index }) => <Item item={item} index={index} scrollX={scrollX} />}
                    keyExtractor={({ item, index }: any) => index}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        {
                            nativeEvent: { contentOffset: { x: scrollX } }
                        }
                    ],
                        { useNativeDriver: false }
                    )}
                    onMomentumScrollEnd={ev=>{
                        setActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x/width))
                    }}

                />
               
                <Animated.View style={{flexDirection:'row',width:slides.length * width,transform:[{translateX:move}]}}>
                {slides.map(({description,title},index)=> (
                        <Details description={description} index={index} title={title} />
                   ))
                }
            </Animated.View>

            <View style={styles.paginateCon}>
                    <View style={styles.paginateInner}>
                        {/* <Animated.View style={[styles.indicate,{transform:[{translateX}]}]}></Animated.View> */}
                        {
                            slides.map((slise,index) => {
                                const inputRange=[(index-1) * width,index*width ,(index+1) * width ] 
                                
                                const widthX=scrollX.interpolate({
                                    inputRange,
                                    outputRange:[DotWidth,DotWidth*2,DotWidth],
                                    extrapolate:'clamp'
                                
                                })
                            
                                return (<Animated.View style={[styles.paginate,{width:widthX}]} ></Animated.View>)
                                
                            })
                        }
                    </View>
                </View>

            
                <View style={styles.action}>
                    <Button onPress={() => navigate("SignInScreen")}>Skip</Button>
                     {
                        pIndex === slides.length-1 ?  
                        <Button mode="contained" onPress={handleStart}>Get Started</Button>
                        :
                        (<TouchableOpacity
                          style={styles.btn}
                            onPress={handleNext}
                          >
                            <Ionicons name="md-chevron-forward" size={32} color="#222" />
                          </TouchableOpacity>)
                        
                     }
                </View>


            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex:1  
        
    },
    details: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 20,
        textAlign: 'center', 
        width:width
    },
    paginateCon: {
        position:'relative',
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: DotHeight,
    },
    paginateInner: {
        flexDirection: 'row',
    },
    paginate: {
        height: DotHeight,
        width: DotWidth,
        borderRadius: DotWidth / 2,
        backgroundColor: 'grey',
        marginHorizontal: DotHeight / 2,

    },
    action: {
        justifyContent: 'space-between',
        marginHorizontal: 10,
        flexDirection: 'row',
        marginTop:50,
        // backgroundColor:'red'
    },
    indicate:{
        position:'absolute',
        height: DotHeight+5,
        width: DotWidth+5,
        top:-2.5,
        left:5/2,
        borderRadius: DotWidth / 2,
        // borderColor:'red',
        borderWidth:2,
        // backgroundColor: '#5895F9',
    },
    topNav:{

    },
    title:{
        fontSize:24,
        fontWeight:'700',
    },
    desc:{
        textAlign: 'center',
        lineHeight:22,
        fontSize:16
    },
    btn:{
        backgroundColor: '#5895F9',
        padding: 5,
        borderRadius:10,
        
        
    }
})