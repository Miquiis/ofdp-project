import React, { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, userProfile, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }   

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: '100%', minHeight: '100vh'}}>
            <Card className="text-white bg-dark" style={{ width: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <br/>
                    <strong>Role:</strong> {userProfile?.role}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                    <div className="w-100 text-center mt-4">
                        <Button className="btn btn-danger text-white" onClick={handleLogout} >Log Out</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
