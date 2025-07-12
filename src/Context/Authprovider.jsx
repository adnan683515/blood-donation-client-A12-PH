import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { Email } from '@mui/icons-material';

const Authprovider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const handleSignup = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const handleLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleUpdate = (userinfo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,userinfo)
    }

    const handleLogout = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false)
            setUser(currentUser)
        })
        return (() => {
            unsuscribe()
        })
    }, [user])

    const Contextinformation = {
        handleSignup,
        loading,
        handleLogin,
        user,
        handleUpdate,
        handleLogout,
        setLoading

    }

    return <Authcontext.Provider value={Contextinformation}>
        {children}
    </Authcontext.Provider>
        ;
};

export default Authprovider;