import React, {useEffect, useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default function SettingPage({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const navigation = useNavigation();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    setUser(Auth().currentUser);
  }, [user]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingVertical: 24}}>
        <View style={{paddingLeft: 24}}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.profile}>
          <Image
            source={{
              uri:
                user?.photoURL ??
                'https://firebasestorage.googleapis.com/v0/b/bubble-milk-tea-de1cd.appspot.com/o/user%2FdeflaultIcon.jpg?alt=media&token=64b4ec17-103e-40a3-aebd-9067c3f030aa',
            }}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>{user?.displayName ?? ''}</Text>

          <Text style={styles.profileEmail}>{user?.email}</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfilePage');
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>
              <FeatherIcon color="#000" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{paddingTop: 12}}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Preferences</Text>
          </View>
          <View style={styles.row}>
            <FeatherIcon
              color="#616161"
              name="bell"
              style={styles.rowIcon}
              size={22}
            />
            <Text style={styles.rowLabel}>Notification</Text>
            <View style={styles.rowSpacer} />
            <Switch onChange={val => {}} value={false} />
          </View>
          <View style={styles.row}>
            <FeatherIcon
              color="#616161"
              name="moon"
              style={styles.rowIcon}
              size={22}
            />
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <View style={styles.rowSpacer} />
            <Switch onChange={val => {}} value={false} />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PerferencePage');
            }}>
            <View style={styles.row}>
              <FeatherIcon
                color="#616161"
                name="heart"
                style={styles.rowIcon}
                size={22}
              />
              <Text style={styles.rowLabel}>Preference</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#ababab" name="chevron-right" size={22} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await Auth().signOut();
            // navigation.dispatch(StackActions.popToTop());
            navigation.navigate('LoginPage');
          }}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'serif',
    color: '#3b414c',
    marginBottom: 10,
  },
  profile: {
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e1e9e1',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4e6dc',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#c9d5bd',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    marginHorizontal: 12,
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  logoutButton: {
    marginTop: 16,
    marginHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#2f4858',
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
