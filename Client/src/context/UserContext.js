import React, { createContext, useState } from 'react'
export const UserContext = createContext();
export const UserProvider = (props) => {
    const [userData, setUserData] = useState({
        user: undefined,
        token: undefined
    });
    return (
        <UserContext.Provider value={[userData,setUserData]}>
            {props.children}
        </UserContext.Provider>
    )
}
//Here's a breakdown of the code:
// The UserContext is created using createContext() from React.
// This context will be used to share the user data across components.
// The UserProvider component is defined as a functional component that takes in props as its argument.
// Inside the UserProvider component, the userData state is initialized using the useState hook.
// It contains user and token properties, both initially set to undefined.
// The UserProvider component renders the UserContext.Provider component, which wraps the props.children.
// This allows the children components to access the userData and setUserData values provided by the context.
// The value prop of the UserContext.Provider is set to an array [userData, setUserData], which represents 
//the current state value and the function to update it.