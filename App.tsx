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

import { AuthenticationNavigator,AuthNavigator } from './src/navigation';
import { AlertProvider } from './src/context/GlobalAlert';
import { GlobalLoading } from './src/components/Loading';

export default function App() {
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
      signIn: async (data: string) => {
        try {
          await AsyncStorage.setItem('token', data)
          dispatch({ type: 'SIGN_IN', token: data });
        } catch (err) {
          console.log(err);

        }

      },
      signOut:async () => {
        try {
          await AsyncStorage.removeItem('token')
          dispatch({ type: 'SIGN_OUT' });
        } catch (err) {
          console.log(err);

        }
      
      },
      signUp: async (data: string) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext} >
      <PaperProvider theme={theme}>
        <AlertProvider customStyle={customAlertStyle}>
        <NavigationContainer>
          {
            state.isLoading ? <GlobalLoading  /> :
              state.token ?
                <>
                  <StatusBar backgroundColor='' />
                  <AuthNavigator />
                </>
                :
                <AuthenticationNavigator />
          }
        </NavigationContainer>
        </AlertProvider>
      </PaperProvider>
    </AuthContext.Provider>
  );
}