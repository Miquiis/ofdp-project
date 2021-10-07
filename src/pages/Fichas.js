import React, { useRef } from 'react'
import styled from 'styled-components'
import DisplayFicha from '../components/DisplayFicha'
import { useAuth } from '../contexts/AuthContext'
import { useCharacters } from '../contexts/CharactersContext'

const FichasContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    padding: 50px 50px;
`

const FichasContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 1400px;
`

export default function Fichas() {

    const { userProfile } = useAuth()
    const { characters } = useCharacters()
    const parentRef = useRef()

    return (
        <FichasContainer>
            <FichasContent ref={parentRef}>
            {
                userProfile.role === 9 ?
                <DisplayFicha/> : null
            }
            {
                characters.length > 0 ?
                characters.map(character => {
                    return <DisplayFicha key={character.id} character={character}/>
                }) : userProfile.role !== 9 ? <DisplayFicha empty /> : null
            }
            </FichasContent>
        </FichasContainer>
    )
}
