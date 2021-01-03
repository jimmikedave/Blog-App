import React from 'react';

const BlogContext = React.createContext();

// component that accepts another component
export const BlogProvider = ({ children }) => {
    return <BlogContext.Provider>
        {children}
    </BlogContext.Provider>
};

