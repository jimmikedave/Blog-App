import createDataContext from './createDataContext';
import jsonServer from '../api/jsonserver';

const blogReducer = (state, action) => {
    switch(action.type) {
        case 'get_blogposts':
            return action.payload;
        case 'edit_blogpost':
            return state.map((blogPost) => {
                //if the blogPost matches the edited(payload) return the edited version
                // if (blogPost.id === action.payload.id) {
                //     return action.payload;
                // } else {
                //     return blogPost;
                // }
                return blogPost.id === action.payload.id
                ? action.payload
                : blogPost;
            });
        case 'delete_blogpost':
            //if true it gets added to the array if false it gets removed
            //filters out the blogPost.id that matches the payload
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'add_blogpost':
            return [...state, 
                { 
                id: Math.floor(Math.random() * 99999), 
                title: action.payload.title,
                content: action.payload.content
                }
            ];
        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        //response.data = [{},{},{}]

        dispatch({  type: 'get_blogposts', payload: response.data})
    }
}

const addBlogPost = dispatch => {
    // add callback as parameter for navigation with API
    return async (title, content) => {
        await jsonServer.post('/blogposts', {title, content});
        // if (callback) {
        //     callback();
        // }
        // dispatch({ type: 'add_blogpost', payload: {title, content}});
        // callback();
    };
};

//IF WE WERE TO SAVE TO API
// const addBlogPost = dispatch => {
//     return async (title, content, callback) => {
//         try {
//             dispatch({ type: 'add_blogpost', payload: {title, content}});
//             callback();
//         } catch (e) {
//             console.log(e)
//         }
        
//     };
// };

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);

        dispatch({ type:'delete_blogpost', payload: id })
    };
};

const editBlogPost = (dispatch) => {
    return async (title, content, id, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content})
        
        dispatch({ type: 'edit_blogpost', payload: {title, content, id} });
        callback();
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts }, 
    []
);