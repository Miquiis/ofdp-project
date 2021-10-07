import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetpassword } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setSuccess('')
            setLoading(true)
            await resetpassword(emailRef.current.value)
            setSuccess('A password reset link was sent to your email.')
        } catch {
            setError('Failed to create reset password')
        }

        setLoading(false)
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: '100%', minHeight: '100vh'}}>
            <Card className="text-white bg-dark" style={{ width: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Button variant="link" onClick={history.goBack} to="/">Go Back</Button>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 text-white">
                Need an account? <Link to="signup">Sign Up</Link>
            </div>
        </div>
    )
}
