import React from 'react'
import styled from 'styled-components'
import { useRolagem } from '../../contexts/RolagemContext'
import dice from '../../images/dice.png'
import Avatar from '../Avatar'

const RolarButton = styled.button`
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    padding: 0px;
`

export default function Dice({ title, value, roll = null, size }) {

    const { open } = useRolagem()

    return (
        <div style={{
            display: 'flex',
            maxWidth: {size},
            maxHeight: {size},
            height: {size},
            minHeight: {size}
        }}>
            <RolarButton onClick={() => open(title, value, roll)}>
                <Avatar size={size} imageUrl={dice}/>
            </RolarButton>
        </div>
    )
}
