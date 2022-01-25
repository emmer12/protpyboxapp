import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken=(token)=>{
    _storeData = async () => {
        try {
          await AsyncStorage.setItem(
            'token',
             token
          );
        } catch (error) {
          alert('Async Storage failed');
          
        }
      };
}

export const retriveToken=(token)=>{
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('TASKS');
          if (value !== null) {
            // We have data!!
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    
}

