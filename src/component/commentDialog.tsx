import {Rating} from '@kolking/react-native-rating';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Dialog,
  List,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CommentDialog({
  visible,
  hideDialog,
}: {
  visible: boolean;
  hideDialog: () => void;
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Comment</Dialog.Title>
        <Dialog.Content style={{height: 350}}>
          <ScrollView>
            <List.Item
              title={
                <Rating
                  rating={4}
                  size={15}
                  disabled={true}
                  variant={'stars-outline'}
                  fillColor={'#000000'}
                  baseColor={'#000000'}
                />
              }
              description={
                <Text>
                  Good. I like it!! I will come again and again beacause of this
                  drink.
                </Text>
              }
              left={props => (
                <Icon {...props} name="user" color="#000000" size={30} />
              )}
            />
            <List.Item
              title={
                <Rating
                  rating={4}
                  size={15}
                  disabled={true}
                  variant={'stars-outline'}
                  fillColor={'#000000'}
                  baseColor={'#000000'}
                />
              }
              description={
                <Text>
                  Good. I like it!! I will come again and again beacause of this
                  drink.
                </Text>
              }
              left={props => (
                <Icon {...props} name="user" color="#000000" size={30} />
              )}
            />
            <List.Item
              title={
                <Rating
                  rating={4}
                  size={15}
                  disabled={true}
                  variant={'stars-outline'}
                  fillColor={'#000000'}
                  baseColor={'#000000'}
                />
              }
              description={
                <Text>
                  Good. I like it!! I will come again and again beacause of this
                  drink.
                </Text>
              }
              left={props => (
                <Icon {...props} name="user" color="#000000" size={30} />
              )}
            />
            <List.Item
              title={
                <Rating
                  rating={4}
                  size={15}
                  disabled={true}
                  variant={'stars-outline'}
                  fillColor={'#000000'}
                  baseColor={'#000000'}
                />
              }
              description={
                <Text>
                  Good. I like it!! I will come again and again beacause of this
                  drink.
                </Text>
              }
              left={props => (
                <Icon {...props} name="user" color="#000000" size={30} />
              )}
            />
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            style={styles.button}
            mode="contained"
            onPress={hideDialog}
            buttonColor="#2f4858">
            Back
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#2f4858',
    width: 130,
  },
});
