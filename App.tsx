import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Onboarding } from "./src/Authentication"
import { SignInScreen } from "./src/screens/SignInScreen"
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';

const AuthenticationStack=createStackNavigator();
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      primary: string;
      accent: string;
    }

    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
    // Specify custom property in nested object
  colors: {
    primary: '#5895F9',
    accent:'#EEF4FF',
  }
};
// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#5895F9',
//     accent: '#EEF4FF',
//   },
// };


const AuthenticationNavigator=()=>{
   return (
   <AuthenticationStack.Navigator headerMode="none">
    <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
    <AuthenticationStack.Screen name="SignInScreen" component={SignInScreen} />
  </AuthenticationStack.Navigator>  
   )
};

export default function App() {
  return (
     <PaperProvider theme={theme}>
       <NavigationContainer>
       <AuthenticationNavigator />
     </NavigationContainer>
     </PaperProvider>
  );
}