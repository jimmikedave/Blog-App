import React, { useContext, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Context } from '../context/BlogContext';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const {state, deleteBlogPost, getBlogPosts} = useContext(Context);
    
    //empty array at the end of the function means that it will only be ran one time
    useEffect(() => {
        getBlogPosts();

        //didFocus tells react that anytime this component gains focus this action becomes invoked
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        })

        //prevents memory leaks if this screen is removed
        //once its off our device clean up
        return () => {
            listener.remove();
        };
    }, [])

    return (
        <View>
            <FlatList 
            data={state} 
            keyExtractor={(blogPost) => blogPost.title}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Show', { id: item.id })}
                    >
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title} - {item.id}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Entypo style={styles.icon} name="trash" />
                            </TouchableOpacity>                        
                        </View>
                    </TouchableOpacity>
                )
            }}
            />
        </View>
    )
}

//when index screen is about to be displayed. navigation will automatically 
//call "navigationOptions". then inspect the object returned
IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create') }>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        )        
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
})

export default IndexScreen;