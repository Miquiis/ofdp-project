import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Status from './Status'
import styled from 'styled-components'

import addLogo from '../images/add-icon-png-2486.png'
import editLogo from '../images/edit.png';
import deleteLogo from '../images/delete-small.png'
import userLogo from '../images/user.png'
import { useCharacters } from '../contexts/CharactersContext'
import { useDatabase } from '../contexts/DatabaseContext'
import { useFicha } from '../contexts/FichaContext'
import { useHistory } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import BoxNav from './ficha/BoxNav'
import NavIcon from './ficha/NavIcon'
import Icon from './Icon'
import { useChangeUser } from '../contexts/ChangeUserContext'

const FichaContainer = styled.div`
    display: flex;
    width: 320px;
    height: 600px;
    background-color: #1C1C1C;
    color: white;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    border-radius: 5px;
    margin-bottom: 30px;
`

const FichaCharacter = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    border-radius: inherit;
`

const CharacterContents = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
`

const CharacterOptions = styled.div`
    display: flex;
    flex-direction: column;
    width: 50px;
    height: 100%;
    background-color: #171717;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
`

const FichaTitle = styled.div`
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    padding: 15px;
`

const CriarFichaContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

const IconHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid white;
    border-radius: 50px;
    background-color: #1C1C1C;
    cursor: pointer;

    :hover {
        background-color: #161616;
        cursor: pointer;
    }
`

const Button = styled.button`
    color: inherit;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    padding: 0px;
`

function getAvatarUrl(character) {
    return character.basicInfo.avatarUrl;
}

function getName(character) {
    return character.basicInfo.name;
}

function getHealth(character) {
    return character.stats.health;
}

function getMaxHealth(character) {
    return character.stats.maxHealth;
}

function getSanity(character) {
    return character.stats.sanity;
}

function getMaxSanity(character) {
    return character.stats.maxSanity;
}

function getMoviment(character) {
    return character.attributes.mov;
}

function getMaxInventory(character) {
    return (character.attributes.str / 2) * (character.attributes.siz / 2)
}

export default function DisplayFicha({ character, empty }) {
    const { userProfile } = useAuth()
    const { createCharacter, deleteCharacter } = useDatabase()
    const { getInventoryWeight } = useCharacters()
    const { openFicha, deleteFicha } = useFicha()
    const { open } = useChangeUser()
    const history = useHistory()

    function handleOpenFicha() {
        openFicha(character)
        history.push("/ficha")
    }

    function handleChangeUser() {
        open(character)
    }

    function handleDeleteFicha() {
        deleteCharacter(character)
        deleteFicha(character)
    }

    return (
        <FichaContainer>
        {
            !empty ? 
            character ?
            <CharacterContents>
                <FichaCharacter> 
                    <Avatar size='120px' imageUrl={getAvatarUrl(character)} centered/>
                    <FichaTitle>
                        {getName(character)}
                    </FichaTitle>
                    <div className="d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                        <Status  name='Vida' color='#ff5252' value={getHealth(character)} maxValue={getMaxHealth(character)} />
                        <Status name='Sanidade' color='#189ad3' value={getSanity(character)} maxValue={getMaxSanity(character)} />
                        <Status name='Peso do Inventário' color='#329932' value={getInventoryWeight(character.id)} maxValue={getMaxInventory(character)} />
                        <Status name='Movimento' color='#107dac' value={getMoviment(character)}/>
                    </div> 
                </FichaCharacter> 
                <CharacterOptions>
                    <IconHolder onClick={handleOpenFicha}>
                        <Icon width="30px" height="30px" imageUrl={editLogo}/>
                    </IconHolder>
                    {
                        userProfile.role === 9 ? 
                        <>
                            <IconHolder onClick={handleChangeUser}>
                            <Icon width="30px" height="30px" imageUrl={userLogo}/>
                            </IconHolder>
                            <IconHolder onClick={handleDeleteFicha}>
                                <Icon width="30px" height="30px" imageUrl={deleteLogo}/>
                            </IconHolder>
                        </> : null
                    }
                </CharacterOptions>
            </CharacterContents>
            : 
            <> 
            <CriarFichaContainer>
                <h4 className="text-center" style= {{
                    marginBottom: '20px'
                }}>Criar Personagem</h4>   
                <Button onClick={createCharacter} ><Avatar size='120px' imageUrl={addLogo} centered/></Button>    
            </CriarFichaContainer>
            </>
            :
            <CriarFichaContainer>
                <h4 className="text-center" style= {{
                    marginBottom: '20px',
                    padding: "20px"
                }}>Você não possui nenhuma ficha no momento...</h4>   
            </CriarFichaContainer>
        }
        </FichaContainer>
        )
    }
    