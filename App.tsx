import 'react-native-gesture-handler';
import * as React from 'react';
import { ActivityIndicator,Text,Image ,StatusBar} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { Onboarding } from "./src/Authentication"
import { SignInScreen } from "./src/screens/SignInScreen"
import { SignUpScreen } from "./src/screens/SignUpScreen"
import { HomeScreen } from "./src/screens/HomeScreen"
import { ListingScreen } from "./src/screens/ListingScreen"
import { ListDetailsScreen } from "./src/screens/ListDetailsScreen"
import { RequestScreen } from "./src/screens/RequestScreen"
import { ProfileScreen } from "./src/screens/ProfileScreen"
import { Provider as PaperProvider,Title } from 'react-native-paper';
import theme from "./src/theme"
import {Home,List,Request,Account,Add,Chat} from "./src/icons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthReducer from './src/store/Reducers/auth'
import AuthContext from './src/store/context'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import { createBottomTabNavigator,create } from '@react-navigation/bottom-tabs'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const AuthenticationStack=createStackNavigator();
const AuthStack=createStackNavigator();
const Tab = createMaterialBottomTabNavigator()

const AuthenticationNavigator=()=>{
   return (
   <AuthenticationStack.Navigator headerMode="none">
    <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
    <AuthenticationStack.Screen name="SignInScreen" component={SignInScreen} />
    <AuthenticationStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </AuthenticationStack.Navigator>  
   )
};

export const HomeTabNavigator = ({navigation,route}) => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#5895F9"
    inactiveColor="#444"
     barStyle={{backgroundColor:'#fff'}} screenOptions={({ route }) => ({})}>
      <Tab.Screen options={{tabBarColor: '',tabBarLabel:'Home',
          tabBarIcon: ({ color }) => (
            <Home color={color} />
          )}} name="Home" component={HomeScreen} />

         <Tab.Screen options={{tabBarColor: '',tabBarLabel:'Listing',
          tabBarIcon: ({ color }) => (
            <List color={color} />
            // <MaterialCommunityIcons name="tag-text-outline" color={color} size={26} />
          )}} name="Listing" component={ListingScreen} />

          <Tab.Screen options={{tabBarColor: '',tabBarLabel:'Create',
          tabBarIcon: ({ color }) => (
            <Add color={color} />
            // <MaterialCommunityIcons name="plus" color={color} size={26} />
          )}} name="Create" component={HomeScreen} />

          <Tab.Screen options={{tabBarColor: '',tabBarLabel:'Requests',
          tabBarIcon: ({ color }) => (
            <Request color={color} />
          )}} name="Requests" component={RequestScreen} />

          <Tab.Screen options={{tabBarColor: '',tabBarLabel:'Profile',
          tabBarIcon: ({ color }) => (
            <Account color={color} />
          )}} name="Profile" component={ProfileScreen} />
    </Tab.Navigator>

  )
}

const LogoTitle=()=>{
  return (
 <Image
      // style={{ width: 50, height: 50 }}
      source={require('./assets/logo.jpg')}
    />   
  );
}

const cap=(str)=>{
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootingClamping: false,
    resetDisplacementThreshold: 0.01,
    resetSpeedThreshold: 0.01,
  },
};

const AuthNavigator=()=>{ 
   
   return (
     <AuthStack.Navigator screenOptions={{gestureEnabled: true,gestureDirection: 'horizontal',transitionSpec: {open: config,close: config},cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
         <AuthStack.Screen name="HomeScreen"  component={HomeTabNavigator}
         options={{ headerTitle: props => <LogoTitle {...props} /> }}
         />

         
         <AuthStack.Screen name="ListDetailsScreen" component={ListDetailsScreen} 
         options={({route})=>({
          headerTitle: props => (<Title>{cap(route.params.type)}</Title>)
         })}
         />
     </AuthStack.Navigator>
   )
}

export default function App() {

  const [auth, setAuth] = React.useState(false)
  const initialState = {
    userToken: null,
    isSignout: false,
    isLoading: true,
  }
  const [state, dispatch] = React.useReducer(AuthReducer, initialState)

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;
  
      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }
  
      // After restoring token, we may need to validate it in production apps
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'FETCH_TOKEN', token });
    };
  
    bootstrapAsync();
  }, []);



  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try{
          await AsyncStorage.setItem('token',data)
          dispatch({ type: 'SIGN_IN', token: data });
        }catch(err){
          console.log(err); 
          
        }
  
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
  
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },                     
    }),
    []
  );

  
                                    


  return (
      <AuthContext.Provider value={authContext}>
    <PaperProvider theme={theme}>
       <NavigationContainer>
       {
            state.isLoading ? <ActivityIndicator size="large" color='grey' style={{justifyContent:'center',alignItems:'center',flex:1
          }} /> :
            state.token ? 
            <>
             <StatusBar backgroundColor='#5895F9' />
             <AuthNavigator />
            </>
            :     
            <AuthenticationNavigator />
        }
     </NavigationContainer>
     </PaperProvider>
     </AuthContext.Provider>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  );
}