import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function ViewPost() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="chevron-left"
        size={25}
        iconColor="#2f4858"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
