
import { DefaultTheme} from 'react-native-paper';
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
    surface:'#EEF4FF',
    error:'#B22D1D'
  }
};


export const customAlertStyle={
   error:{
     icon:{
       color:'red',
       name:'warning-outline'
     },
     text:{
       color:'red'
     }
   },

   success:{
    icon:{
      color:'green',
      name:'checkmark-circle-outline'
    },
    text:{
      color:'green'
    }
  },

  info:{
    icon:{
      color:'blue',
      name:'information-circle-outline'
    },
    text:{
      color:'blue'
    }
  }
}

export default theme;