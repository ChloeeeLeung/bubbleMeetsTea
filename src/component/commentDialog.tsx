import {Rating} from '@kolking/react-native-rating';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Dialog, List, Portal, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CommentDialog({
  visible,
  hideDialog,
  commentList,
}: {
  visible: boolean;
  hideDialog: () => void;
  commentList: any[];
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Comment</Dialog.Title>
        <Dialog.Content style={{height: 350}}>
          <FlatList
            data={commentList !== null ? commentList : []}
            renderItem={({item}) => {
              return (
                <List.Item
                  title={
                    <Rating
                      rating={item.rate}
                      size={15}
                      disabled={true}
                      variant={'stars-outline'}
                      fillColor={'#000000'}
                      baseColor={'#000000'}
                    />
                  }
                  description={<Text>{item.detail}</Text>}
                  left={props => (
                    <Icon {...props} name="user" color="#000000" size={30} />
                  )}
                />
              );
            }}
          />
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
