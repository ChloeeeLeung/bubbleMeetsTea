import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { StyleSheet, SafeAreaView, ScrollView, View, Image, TouchableOpacity, Switch } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'language', icon: 'globe', label: 'Language', type: 'select' },
      { id: 'notification', icon: 'bell', label: 'Notification', type: 'toggle' },
      { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
    ],
  },
  {
    header: 'Help',
    items: [
      { id: 'aboutUs', icon: 'activity', label: 'About Us', type: 'link' },
      { id: 'faqContact', icon: 'mail', label: 'FAQ / Contact Us', type: 'link' },
      {
        id: 'termOfUse', icon: 'alert-circle', label: 'Term of Use', type: 'link'
      },
      { id: 'privacyPolicy', icon: 'eye-off', label: 'Privacy Policy', type: 'link' },
      { id: 'helpFeedback', icon: 'help-circle', label: 'Help / Feedback', type: 'link' },
    ],
  },
];

export default function ProfilePage ()
{
  const [ form, setForm ] = useState( {
    language: 'English',
    notification: true,
    darkMode: false,
  } );

  const navigation = useNavigation();

  return (
    <SafeAreaView style={ { flex: 1 } }>
      <ScrollView contentContainerStyle={ { paddingVertical: 24 } }>
        <View style={ { paddingLeft: 24 } }>
          <Text style={ styles.title }>Settings</Text>
        </View>

        <View style={ styles.profile }>
          <Image
            alt=""
            source={ {
              uri: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            } }
            style={ styles.profileAvatar }
          />

          <Text style={ styles.profileName }>User1</Text>

          <Text style={ styles.profileEmail }>user1@gmail.com</Text>

          <TouchableOpacity
            onPress={ () =>
            {
            } }>
            <View style={ styles.profileAction }>
              <Text style={ styles.profileActionText }>Edit Profile</Text>
              <FeatherIcon color="#000" name="edit" size={ 16 } />
            </View>
          </TouchableOpacity>
        </View>

        { SECTIONS.map( ( { header, items } ) => (
          <View style={ { paddingTop: 12 } } key={ header }>
            <View style={ styles.sectionHeader }>
              <Text style={ styles.sectionHeaderText }>{ header }</Text>
            </View>
            <View style={ styles.sectionBody }>
              { items.map( ( { id, label, icon, type }, index ) =>
              {
                return (
                  <View
                    key={ id }
                    style={ [
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ] }>
                    <TouchableOpacity
                      onPress={ () =>
                      {
                        // handle onPress
                      } }>
                      <View style={ styles.row }>
                        <FeatherIcon
                          color="#616161"
                          name={ icon }
                          style={ styles.rowIcon }
                          size={ 22 }
                        />

                        <Text style={ styles.rowLabel }>{ label }</Text>

                        <View style={ styles.rowSpacer } />

                        { type === 'select' && (
                          <Text style={ styles.rowValue }>{ form[ id ] }</Text>
                        ) }

                        { type === 'toggle' && (
                          <Switch
                            onChange={ val => setForm( { ...form, [ id ]: val } ) }
                            value={ form[ id ] }
                          />
                        ) }

                        { ( type === 'select' || type === 'link' ) && (
                          <FeatherIcon
                            color="#ababab"
                            name="chevron-right"
                            size={ 22 }
                          />
                        ) }
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              } ) }
            </View>
          </View>
        ) ) }
        <TouchableOpacity
          style={ styles.logoutButton }
          onPress={ () => navigation.navigate( 'LoginPage' ) }>
          <Text style={ styles.logoutButtonText }>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create( {
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
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000000',
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  logoutButton: {
    marginTop: 16,
    marginHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
} );