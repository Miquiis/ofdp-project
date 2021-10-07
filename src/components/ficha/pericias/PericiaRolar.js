import React from 'react'
import styled from 'styled-components'
import Pericia from './Pericia'
import Checkbox from '../Checkbox'
import { useRolagem } from '../../../contexts/RolagemContext'

const PericiaContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 40px;
`

const PericiaHover = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 6px;

    :hover {
        input {
            border-color: #111111;
            color: #111111
        }

        background-color: white;
        color: #111111
    }
`

export default function PericiaRolar({ title, value, checked, onCheckChange, onInputChange, ...props }) {

    const { open } = useRolagem()

    return (
        <PericiaContainer {...props}>
            <PericiaHover>
                <Checkbox onChange={onCheckChange} margin/>
                <Pericia value={value} onChange={onInputChange} title={title} onClick={open} />
            </PericiaHover>
        </PericiaContainer>
    )
}
