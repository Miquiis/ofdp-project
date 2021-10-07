import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function RoleRoute({ component: Component, role, ...rest }) {
    const { currentUser, userProfile } = useAuth()

    return (
        <Route {...rest} render={props => {
            return currentUser && userProfile && userProfile.role >= role ? <Component {...props} /> : <Redirect to="/"/>
        }}>
        </Route>
    )
}
