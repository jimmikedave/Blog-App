import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
    switch(action.type) {
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

const addBlogPost = dispatch => {
    // add callback as parameter for navigation with API
    return (title, content) => {
        dispatch({ type: 'add_blogpost', payload: {title, content}});
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
    return (id) => {
        dispatch({ type:'delete_blogpost', payload: id })
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost }, 
    [{title: 'Test Post', content: 'Test Content', id: 1}]
);