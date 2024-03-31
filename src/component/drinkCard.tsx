import {Rating} from '@kolking/react-native-rating';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import RatingDialog from './ratingDialog';
import CommentDialog from './commentDialog';

export default function DrinkCard() {
  const [ratingDialogVisible, setRatingDialogVisible] = React.useState(false);
  const showRatingDialog = () => setRatingDialogVisible(true);
  const hideRatingDialog = () => setRatingDialogVisible(false);

  const [commentDialogVisible, setCommentDialogVisible] = React.useState(false);
  const showCommentDialog = () => setCommentDialogVisible(true);
  const hideCommentDialog = () => setCommentDialogVisible(false);

  return (
    <Card style={styles.cardBackground}>
      <RatingDialog
        visible={ratingDialogVisible}
        hideDialog={hideRatingDialog}
      />
      <CommentDialog
        visible={commentDialogVisible}
        hideDialog={hideCommentDialog}
      />
      <View style={styles.base}>
        <View>
          <View style={styles.row}>
            <View style={styles.rowList}>
              <Icon name="rocket" size={20} color={'#2f4858'} />
              <Text style={styles.rowText}>極品賞紅茶</Text>
              <Text style={styles.rowText}>$17</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Rating
              rating={4.8}
              size={15}
              disabled={true}
              variant={'stars-outline'}
              fillColor={'#2f4858'}
              baseColor={'#2f4858'}
            />
            <Text style={styles.rowText}>4.8</Text>
          </View>
        </View>
        <View style={styles.rowList}>
          <IconButton
            icon="comment-multiple"
            iconColor="#2f4858"
            onPress={() => {
              showCommentDialog();
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

const styles = StyleSheet.create({
  rowList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  cardBackground: {
    backgroundColor: '#C9D5BD',
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
});
