import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Signup() {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, createUser, checkUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }
        
        if (await checkUser(usernameRef.current.value)) {
            return setError('Username is already taken')
        }

        try {
            setError('')
            setLoading(true)
            const user = await signup(emailRef.current.value, passwordRef.current.value)
            await createUser(user.user, usernameRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: '100%', minHeight: '100vh'}}>
            <Card className="text-white bg-dark" style={{ width: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2" id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" ref={usernameRef} required />
                        </Form.Group>
                        <Form.Group className="mb-2" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group className="mb-2" id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group className="mb-2" id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 text-white">
                Already have an account? <Link to="login">Log In</Link>
            </div>
        </div>
    )
}
