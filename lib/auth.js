import React, {useState, useEffect, useContext, createContext} from 'react';

import firebase from './firebase';
import { createUser } from './db';


const authContext = createContext();

export function AuthProvider({children}){
    const auth = useProvideAuth();
    return <authContext.Provider value = {auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth(){
    const [user, setUser] = useState(null);


    const signInWithGoogle = ()=>{
        return firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((response) => {
            setUser(response.user);
            return response.user;
        });
    };

    // const signup = (email,password)=>{
    //     return firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(email,password)
    //     .then((response)=> {
    //         setUser(response.user);
    //         return response.user;
    //     });
    // };

    const signout = () => {
        return firebase
        .auth()
        .signOut()
        .then(()=> {
            setUser(false);
        });
    };

    // const sendPasswordResetEmail = (email) =>{
    //     return firebase
    //     .auth()
    //     .sendPasswordResetEmail(email)
    //     .then(()=>{
    //         return true;
    //     });
    // };

    // const confirmPasswordReset = (password,code) =>{
    //     const resetCode = code || getFromQueryString('oobCode');

    //     return firebase
    //         .auth()
    //         .confirmPasswordReset(resetCode,password)
    //         .then(() => {
    //             return true;
    //         });
    // };

    useEffect(() =>{
        const unsubscribe = firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                setUser(user);
            } else{
                setUser(false);
            }
        });
    
        return () => unsubscribe();
    }, []);

    return {
        user,
        signInWithGoogle,
        // signup,
        signout,
        // sendPasswordResetEmail,
        // confirmPasswordReset
    };
}

// const getFromQueryString = (key) => {
//     return queryString.parse(window.location.search)[key];
// };