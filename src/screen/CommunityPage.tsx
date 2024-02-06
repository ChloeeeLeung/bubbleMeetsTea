import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import CardUI from '../component/card';
import {firebase} from '@react-native-firebase/database';
import {getPreciseDistance} from 'geolib';

export default function CommunityPage() {
  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'serif',
    color: '#3b414c',
    marginBottom: 10,
    marginTop: 15,
    paddingLeft: 5,
  },
  row: {
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
  },
});
