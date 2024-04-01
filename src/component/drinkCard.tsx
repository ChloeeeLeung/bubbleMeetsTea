import {Rating} from '@kolking/react-native-rating';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IconButton, Text, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import RatingDialog from './ratingDialog';
import CommentDialog from './commentDialog';
import {firebase} from '@react-native-firebase/database';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function DrinkCard() {
  const [ratingDialogVisible, setRatingDialogVisible] = useState(false);
  const showRatingDialog = () => setRatingDialogVisible(true);
  const hideRatingDialog = () => setRatingDialogVisible(false);

  const [commentDialogVisible, setCommentDialogVisible] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const showCommentDialog = (comment: []) => {
    setCommentDialogVisible(true);
    setCommentList(comment);
  };
  const hideCommentDialog = () => {
    setCommentDialogVisible(false);
  };

  const [drinkList, setDrinkList] = useState<[] | any[]>([]);

  const getDrink = async () => {
    const data = await firebase
      .app()
      .database(databaseUrl)
      .ref(`drink/0`)
      .once('value');
    const drinkData = data.val();
    setDrinkList(drinkData);
  };

  useEffect(() => {
    getDrink();
  }, []);

  return (
    <View style={styles.flex}>
      <RatingDialog
        visible={ratingDialogVisible}
        hideDialog={hideRatingDialog}
      />
      <CommentDialog
        visible={commentDialogVisible}
        hideDialog={hideCommentDialog}
        commentList={commentList}
      />
      <FlatList
        data={drinkList !== null ? drinkList : []}
        renderItem={({item}) => {
          let averageRating = 3;
          if (item.comment !== undefined) {
            const ratings = item.comment.map(
              (comment: {rate: number}) => comment.rate,
            );
            averageRating =
              ratings.reduce((a: number, b: number) => a + b, 0) /
              ratings.length;
          }
          if (item !== null) {
            return (
              <Card style={styles.cardBackground}>
                <View style={styles.base}>
                  <View>
                    <View style={styles.row}>
                      <View style={styles.rowList}>
                        <Icon name="rocket" size={20} color={'#2f4858'} />
                        <Text style={styles.rowText}>{item.name}</Text>
                        <Text style={styles.rowText}>${item.price}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <Rating
                        rating={averageRating}
                        size={15}
                        disabled={true}
                        variant={'stars-outline'}
                        fillColor={'#2f4858'}
                        baseColor={'#2f4858'}
                      />
                      <Text style={styles.rowText}>{averageRating}</Text>
                    </View>
                  </View>
                  <View style={styles.rowList}>
                    <IconButton
                      icon="comment-multiple"
                      iconColor="#2f4858"
                      onPress={() => {
                        showCommentDialog(item.comment);
                      }}
                    />
                    <IconButton
                      icon="pencil"
                      iconColor="#2f4858"
                      onPress={() => {
                        showRatingDialog();
                      }}
                    />
                  </View>
                </View>
              </Card>
            );
          }
          return null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  cardBackground: {
    backgroundColor: '#C9D5BD',
    marginVertical: 5,
  },
  rowText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 15,
  },
  base: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});
