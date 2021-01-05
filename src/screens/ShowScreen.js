import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Context } from '../context/BlogContext';

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    //first rendered true it gets assigned to blogPost
    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));

    const id = navigation.getParam('id')
    
    return (
        <View>
            <Text>{blogPost.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({

});

export default ShowScreen;