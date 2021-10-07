import React from 'react'
import styled from 'styled-components'

const ExtraContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
`

const ExtraTitle = styled.div`
    width: 100%;
    font-size: 20px;
    text-align: center;
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

const RolarButton = styled.button`
    color: inherit;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    padding: 0px;
`

export default function Pericia({ title, value, onChange, onClick, ...props }) {
    return (
        <ExtraContainer {...props}>
            <ExtraInput value={value} onChange={onChange} />
            <RolarButton onClick={() => onClick(title, value)}>
                <ExtraTitle>{title}</ExtraTitle>
            </RolarButton>
        </ExtraContainer>
    )
}
