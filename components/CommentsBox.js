import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Text,
    Button,
    TextInput,
    Modal,
} from 'react-native';
import styles from '../constants/MainStyles';
import CommentBox from './CommentBox';

export default function CommentsBox(props) {

    // retrieve data for individual comment
    const commentGET = async (comment) => {
        const response = await fetch(`https://stump-around.herokuapp.com/comment/${comment._id}`, {
            method: 'GET',
          })
        return response.json();
    }

    return (
        <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>
                Comments
            </Text>
            <Button
                color='#24d36fff'
                title="New Comment"
                onPress={props.hike.comments === 'denied' ? () => alert('Only friends can add comments.') : () => props.setModalVisibleState(true)}
                style={styles.commentButton}
            ></Button>
            {props.hike.comments !== 'denied' ?
            props.isPastInitialRender.current ? props.hike.comments.slice().reverse().map((element, i) => {
                return (
                    <CommentBox isPastInitialRender={props.isPastInitialRender} parent={element._id} item={element} key={element._id} commentGET={commentGET} navigation={props.navigation} screen={props.screen} replyData={props.replyData} setReplyData={props.setReplyData} setReplyModalVisibleState={props.setReplyModalVisibleState} replyModalVisibleState={props.replyModalVisibleState} />
                )
            }) : <View />
        :
        <View style={styles.commentContainer}>
            <Text style={{ textAlign: 'center' }}>
                Only friends can view profile comments.
            </Text>
        </View>
        }
        </View>
    )
}