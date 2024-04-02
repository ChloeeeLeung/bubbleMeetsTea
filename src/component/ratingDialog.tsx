import React, {useState} from 'react';
import {
  ColorValue,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  ToggleButton,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebase} from '@react-native-firebase/database';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';
const windowWidth = Dimensions.get('window').width;

export default function RatingDialog({
  visible,
  hideDialog,
  shopID,
  id,
  drinkID,
}: {
  visible: boolean;
  hideDialog: () => void;
  shopID: String;
  id: number;
  drinkID: number;
}) {
  const [starRating, setStarRating] = useState(5);
  const [comment, setComment] = useState('');
  const [crowds, setCrowds] = useState('1');
  const [error, setError] = useState(false);

  const StarRating = ({starRating}: {starRating: number}) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <TouchableOpacity
            key={i}
            style={styles.marginRight}
            onPress={() => setStarRating(i)}>
            <Icon
              name={starRating >= i ? 'star' : 'star-o'}
              size={25}
              style={styles.starColor}
            />
          </TouchableOpacity>,
        );
      }
      return stars;
    };

    return <View style={styles.row}>{renderStars()}</View>;
  };

  const renderToggleButton = (
    buttonValue: string,
    iconColor: ColorValue,
    labelText: string,
  ) => {
    return (
      <ToggleButton
        style={styles.toggleButton}
        icon={() => (
          <View style={styles.iconContainer}>
            <Icon name={'child'} size={20} color={iconColor} />
            <Text style={styles.labelText}>{labelText}</Text>
          </View>
        )}
        value={buttonValue}
        onPress={() => setCrowds(buttonValue)}
      />
    );
  };

  const rate = async () => {
    if (comment !== '') {
      setError(false);
      setComment('');
      const drinkComment = await firebase
        .app()
        .database(databaseUrl)
        .ref(`drink/${shopID}/${drinkID}/comment/${id}`)
        .once('value');
      const commentLength = drinkComment.numChildren() ?? 0;
      firebase
        .app()
        .database(databaseUrl)
        .ref(`drink/${shopID}/${drinkID}/comment/${id}/${commentLength}`)
        .set({
          detail: comment,
          rate: starRating,
        });
      hideDialog();
      const clickTime = new Date().getTime();
      const clickDate = new Date(clickTime);
      const hour = clickDate.getHours();
      console.log('Click time:', hour);

      console.log(crowds);
    } else {
      setError(true);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Rate the Drink</Dialog.Title>
        <Dialog.Content>
          {error === true && (
            <Text style={styles.errorText}>
              Hey, it seems like you haven't filled in all the columns
            </Text>
          )}
          <View style={styles.row}>
            <Text style={styles.heading}>{starRating}</Text>
          </View>
          <StarRating starRating={starRating} />
          <View style={styles.skip} />
          <TextInput
            label="Leave a review for the drink"
            value={comment}
            onChangeText={text => setComment(text)}
            multiline={true}
            theme={{
              colors: {
                primary: '#2f4858',
              },
            }}
          />
          <View style={styles.skip} />
          <Text style={styles.labelText}>
            Please provide us with more information
          </Text>
          <Text style={styles.labelText}>
            What is the current level of activity in the shop?
          </Text>
          <ToggleButton.Row
            onValueChange={value => setCrowds(value)}
            value={crowds}>
            {renderToggleButton('1', '#acb6bc', 'Quiet')}
            {renderToggleButton('2', '#82919b', 'Busy')}
            {renderToggleButton('3', '#596d79', 'Very busy')}
            {renderToggleButton('4', '#2f4858', 'Packed')}
          </ToggleButton.Row>
        </Dialog.Content>
        <Dialog.Actions style={styles.spaceAround}>
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => {
              setError(false);
              setComment('');
              hideDialog();
            }}
            textColor="#2f4858">
            Cancel
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={rate}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
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
  toggleButton: {
    width: (windowWidth - 100) / 4,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    marginVertical: 2,
  },
  errorText: {
    color: '#D2042D',
  },
});
