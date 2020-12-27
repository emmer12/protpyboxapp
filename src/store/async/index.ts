import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken=(token)=>{
    _storeData = async () => {
        try {
            console.log("saved")
          await AsyncStorage.setItem(
            'token',
             token
          );
        } catch (error) {
          console.log(error)
        }
      };
}

export const retriveToken=(token)=>{
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('TASKS');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    
}

