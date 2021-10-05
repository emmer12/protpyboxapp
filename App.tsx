import 'react-native-gesture-handler';
import * as React from 'react';
import { ActivityIndicator, Text, StatusBar, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { Provider as PaperProvider, Title } from 'react-native-paper';
import theme,{customAlertStyle} from "./src/theme"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthReducer from './src/store/Reducers/auth'
import AuthContext from './src/store/context'


import { AuthenticationNavigator,DrawerAuth } from './src/navigation';
import { AlertProvider } from './src/context/GlobalAlert';
import { GlobalLoading } from './src/components/Loading';
import Api, { deleteAuth } from "./src/api"

export default function App() {
  const initialState = {
    token: null,
    isLoading: true,
    user:null
  }
  const [state, dispatch] = React.useReducer(AuthReducer, initialState)

  const getUser=async ()=>{
    let response=await Api.get('auth-user');
    let user=response.data.data
    return user;
  }


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        dispatch({ type: 'LOADING',payload:true});
        token = await AsyncStorage.getItem('token');
        let user=await getUser();

        dispatch({ type: 'LOADING',payload:false})
        dispatch({ type: 'USER_LOGIN_FULFILLED', payload:{token,user} });
      } catch (e) {
        dispatch({ type: 'LOADING',payload:false})
  
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
     

    
    };

    bootstrapAsync();
  }, []);



  const authContext = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        try {
          await AsyncStorage.setItem('token', token)
          let user=await getUser();
          dispatch({ type: 'SIGN_IN', payload:{token,user} });
        } catch (err) {
          alert('Unknown Error')
        }

      },
      signOut:async () => {
        try {
          await AsyncStorage.removeItem('token')
          dispatch({ type: 'SIGN_OUT' });
          deleteAuth()
        } catch (err) {
      

        }
      
      },
      // user:!state.isLoading && state.user
    }),
    []
  );

  return (
    <AuthContext.Provider value={{authContext,user:state.user}} >
      <PaperProvider theme={theme}>
        <NavigationContainer>
        <AlertProvider customStyle={customAlertStyle}>
          {
            state.isLoading ? <GlobalLoading  /> :
              state.token ?
                <>
                  <StatusBar
                  barStyle="light-content" />
                  <DrawerAuth />
                </>
                :
                <AuthenticationNavigator />
          }
        </AlertProvider>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}