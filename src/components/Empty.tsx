import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { EmptyIcon } from "./../icons";

interface EmptyProps {
    text:string
}

const Empty = ({text}: EmptyProps) => {
  return (
    <View style={styles.container}>
      <EmptyIcon />
      <Text>{text}</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent:"center",
      alignItems:'center',
  }
});
