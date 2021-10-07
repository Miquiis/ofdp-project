import React, { useContext, useState, useEffect } from 'react'
import { auth, firestore } from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [userProfile, setUserProfile] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetpassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updateProfile(user) {
        setUserProfile(prev => ({
            ...prev,
            ...user
        }))
    }

    async function fetchUser(user) {
        if (user == null) return;

        const userRef = firestore.doc(`users/${user.uid}`);
        const snapshot = await userRef.get();

        if (snapshot.exists) {
            return {
                username: snapshot.get("username"),
                email: snapshot.get("email"),
                characters: JSON.parse(snapshot.get("characters")),
                role: snapshot.get("role")
            }
        }

        return {characters: [], role: 0}
    }

    async function createUser(username) {
        if (currentUser == null) return;

        const userRef = firestore.doc(`users/${currentUser.uid}`);
        const snapshot = await userRef.get();

        if (!snapshot.exists) {
            const { email } = auth;
            const createdAt = new Date();

            try {
                await userRef.set({
                    username,
                    email,
                    role: 0,
                    createdAt,
                    characters: JSON.stringify([])
                })
            } catch (error) {
                console.log('Error creating user', error.message);
            }
        }

        return userRef;
    }

    async function checkUser(username) {
        var foundUser = false;
        await firestore.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (username.toLowerCase() === doc.get("username").toLowerCase()) {
                    foundUser = true;
                }
            })
        })
        return foundUser;
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            setCurrentUser(user)
            const o = await fetchUser(user);
            setUserProfile(o)
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        userProfile,
        login,
        signup,
        resetpassword,
        updateEmail,
        updatePassword,
        logout,
        fetchUser,
        createUser,
        checkUser,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
