import React, { useContext, useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components';
import Modal from '../utils/Modal';
import userLogo from '../images/user.png'
import closeLogo from '../images/close.png'
import Avatar from '../components/Avatar';
import { useDatabase } from './DatabaseContext';

const ChangeUserContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 750px;
    height: 350px;
    background: #1C1C1C;
    border-radius: 10px;
    padding: 20px;
`

const ChangeUserTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    color: white;
    font-size: 25px;
`

const ChangeUserUsers = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    margin-top: 20px;

    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`

const Input = styled.input`
    :focus {outline:none;}
    ::placeholder {
    }

    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-bottom: 1px solid white;
    background-color: transparent;
    box-sizing: border-box;

    text-align: left;

    font-size: 20px;
    color:white;
`

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 10px;
    border-radius: 40px;

    :hover {
        background-color: #1b1b1b;
    }
`

const UserContents = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`

const UserInfo = styled.div`
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`

const UserUsername = styled.div`
    font-weight: bold;
    color: white;
    font-size: 20px;
`

const UserEmail = styled.div`
    color: #8e8e8e;
    font-size: 15px;
`

const UserDelete = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;

    cursor: pointer;

    :hover {
        background-color: #FF4D4D;
    }
`

const ChangeUserContext = React.createContext()

export function useChangeUser() {
    return useContext(ChangeUserContext)
}

function User({ user, onDelete }) {
    return (
        <UserContainer>
            <UserContents>
            <Avatar size="40px"/>
            <UserInfo>
                <UserUsername>{user?.username}</UserUsername>
                <UserEmail>{user?.email}</UserEmail>
            </UserInfo>
            </UserContents>
            <UserDelete onClick={() => onDelete(user)}>
                <Avatar size="30px" imageUrl={closeLogo}/>
            </UserDelete>
        </UserContainer>
    );
}

function MyVerticallyCenteredModal({ users, onAdd, onDelete, ...props }) {

    const usernameRef = useRef()

    return (
      <Modal {...props}>
        <ChangeUserContainer>
            <ChangeUserTitle>
                <Avatar style={{ backgroundColor: "#4285f4", marginRight: "15px" }} size="40px" imageUrl={userLogo} centered/>
                Compartilhe essa ficha com pessoas:
            </ChangeUserTitle>

            <Input ref={usernameRef} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onAdd(e.target.value)
                    e.target.value = ""
                }
            }} placeholder="Adicione pessoas aqui" />

            <ChangeUserUsers>
            {
                users?.map(user => (
                    <User key={user.username} user={user} onDelete={onDelete} />
                ))
            }
            </ChangeUserUsers>
        </ChangeUserContainer>
      </Modal>
    );
}

export default function ChangeUserProvider({ children }) {
    const [show, setShow] = useState(false)
    const [character, setCharacter] = useState()
    const [users, setUsers] = useState()

    const { fetchUsersByCharacter, fetchUserByName, addCharacterToUser, removeCharacterFromUser } = useDatabase()

    function close() {
        setShow(false)
    }

    function open(character) {
        setCharacter(character)
        setShow(true)
    }

    function deleteUser(user) {
        async function deleteUser() {
            await removeCharacterFromUser(user.id, character.id)
            setCharacter({...character})
        }
        deleteUser()
    }

    function addUser(username) {
        async function addUser() {
            const user = await fetchUserByName(username)
            await addCharacterToUser(user.id, character.id)
            setCharacter({...character})
        }
        addUser()
    }

    useEffect(() => {

        async function fetchCharacters() {
            if (character) {
                setUsers(await fetchUsersByCharacter(character.id))
            }
        }

        fetchCharacters()
    }, [character, fetchUsersByCharacter, removeCharacterFromUser, addCharacterToUser])

    const value = {
        close,
        open
    }

    return (
        <ChangeUserContext.Provider value={value}>
            <MyVerticallyCenteredModal onAdd={addUser} onDelete={deleteUser} users={users} onClick={close} show={show} onClose={() => close()} />
            {children}
        </ChangeUserContext.Provider>
    )
}
