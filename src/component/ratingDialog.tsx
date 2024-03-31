import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Dialog, Portal, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RatingDialog({
  visible,
  hideDialog,
}: {
  visible: boolean;
  hideDialog: () => void;
}) {
  const [starRating, setStarRating] = useState(5);
  const [text, setText] = React.useState('');

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Tab to rate</Dialog.Title>
        <Dialog.Content>
          <View style={styles.row}>
            <Text style={styles.heading}>{starRating}</Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.marginRight}
              onPress={() => setStarRating(1)}>
              <Icon
                name={starRating >= 1 ? 'star' : 'star-o'}
                size={32}
                style={styles.starColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.marginRight}
              onPress={() => setStarRating(2)}>
              <Icon
                name={starRating >= 2 ? 'star' : 'star-o'}
                size={32}
                style={styles.starColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.marginRight}
              onPress={() => setStarRating(3)}>
              <Icon
                name={starRating >= 3 ? 'star' : 'star-o'}
                size={32}
                style={styles.starColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.marginRight}
              onPress={() => setStarRating(4)}>
              <Icon
                name={starRating >= 4 ? 'star' : 'star-o'}
                size={32}
                style={styles.starColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.marginRight}
              onPress={() => setStarRating(5)}>
              <Icon
                name={starRating >= 5 ? 'star' : 'star-o'}
                size={32}
                style={styles.starColor}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.skip}></View>
          <TextInput
            label="Comment"
            value={text}
            onChangeText={text => setText(text)}
            outlineColor="#2f4858"
            multiline={true}
          />
        </Dialog.Content>
        <Dialog.Actions style={styles.spaceAround}>
          <Button
            style={styles.button}
            mode="outlined"
            onPress={hideDialog}
            textColor="#2f4858">
            Cancel
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={hideDialog}
            buttonColor="#2f4858">
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  starColor: {
    color: '#2f4858',
  },
  marginRight: {
    marginRight: 10,
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  button: {
    borderColor: '#2f4858',
    width: 130,
  },
  skip: {
    height: 20,
  },
});
