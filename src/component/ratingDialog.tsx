import React, {useEffect, useState} from 'react';
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
import DatePicker from 'react-native-date-picker';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';
const windowWidth = Dimensions.get('window').width;

export default function RatingDialog({
  visible,
  hideDialog,
  shopID,
  id,
  drinkID,
  drinkList,
}: {
  visible: boolean;
  hideDialog: () => void;
  shopID: String;
  id: number;
  drinkID: number;
  drinkList: [] | any[];
}) {
  const [starRating, setStarRating] = useState(5);
  const [comment, setComment] = useState('');
  const [crowds, setCrowds] = useState('1');
  const [error, setError] = useState(false);
  const [time, setTime] = useState(new Date());

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
      setStarRating(5);
      setCrowds('1');
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

      let totalRatingSum = 0;
      let totalRatingCount = 0;
      drinkList.forEach(item => {
        if (item.comment?.[id] !== undefined) {
          const ratings = item.comment[id].map(
            (comment: {rate: number}) => comment.rate,
          );
          const ratingSum = ratings.reduce((a: number, b: number) => a + b, 0);
          totalRatingSum += ratingSum;
          totalRatingCount += ratings.length;
        }
      });
      const averageRating =
        totalRatingCount > 0 ? totalRatingSum / totalRatingCount : 0;

      firebase.app().database(databaseUrl).ref(`shop/${id}`).update({
        rating: averageRating,
      });

      var Sentiment = require('sentiment');
      var sentiment = new Sentiment();
      var result = sentiment.analyze(comment);
      console.log(result.comparative);

      hideDialog();
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
          <View style={styles.row}>
            {Array.from({length: 5}, (_, index) => (
              <TouchableOpacity
                key={index + 1}
                style={styles.marginRight}
                onPress={() => setStarRating(index + 1)}>
                <Icon
                  name={starRating >= index + 1 ? 'star' : 'star-o'}
                  size={25}
                  style={styles.starColor}
                />
              </TouchableOpacity>
            ))}
          </View>
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
          <Text style={styles.labelText}>When did you visit the shop?</Text>
          <DatePicker
            date={time}
            onDateChange={setTime}
            mode="time"
            style={{height: 60}}
          />
          <Text style={styles.labelText}>
            What is the current level of activity in the shop at that time?
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
              setStarRating(5);
              setCrowds('1');
              setComment('');
              hideDialog();
              setTime(new Date());
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
