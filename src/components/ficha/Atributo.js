import React from 'react'
import styled from 'styled-components'
import DetalhesInput from '../input-boxes/detalhes-input.component'

const ExtraContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
`

const ExtraTitle = styled.div`
    font-size: 20px;
`

const ExtraInput = styled.input`
    :focus {outline:none;}

    font-family: 'OFDP';

    width: 100%;
    padding: 5px;
    margin-top: 5px;
    border: none;
    border-bottom: 1px solid white;
    background-color: transparent;
    box-sizing: border-box;

    text-align: center;

    font-size: 30px;
    color:white;
`

export default function Atributo({ title, value, onChange, ...props }) {
    return (
        <ExtraContainer {...props}>
            <ExtraTitle>{title}</ExtraTitle>
            <ExtraInput value={value} onChange={onChange} />
        </ExtraContainer>
    )
}
