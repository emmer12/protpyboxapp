import * as React from 'react';
import { Text, View, StyleSheet,Switch } from 'react-native';
import { List } from 'react-native-paper';
import Api from '../../api';
import { AlertContext } from '../../context/GlobalAlert';
import AuthContext from '../../store/context';
import AuthReducer from '../../store/Reducers/auth';
import theme from '../../theme';

interface EditAccountProps {}

const EditAccount = (props: EditAccountProps) => {

  const {alert:Alert} =React.useContext(AlertContext)
  const {user} =React.useContext(AuthContext)


  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
 
  const onToggleSwitch = () => {
    user.reveal_contact=!isSwitchOn;
    setIsSwitchOn(prev=>!prev)
    Api.patch('update-user',user).then(()=>{
    }).catch((err)=>{
      setIsSwitchOn(prev=>prev)
    })
  };

  React.useEffect(()=>{
    setIsSwitchOn(user.reveal_contact)
  },[])


  return (
    <View style={styles.container}>
       <List.Item
        title="Make Contact public"
        right={(props) => <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSwitchOn ? theme.colors.primary : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onToggleSwitch}
          value={isSwitchOn}
        />}
        />      
    </View>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  container: {}
});
