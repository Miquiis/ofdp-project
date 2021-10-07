import React from 'react'
import styled from 'styled-components'

const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
`

const CheckBoxTitle = styled.div`
    margin-left: 10px;
`

export default function Checkbox({ title, checked, margin, onChange }) {
    return (
        <CheckBoxContainer style={ !margin ? {margin: "5px 0px"} : {} }>
            <input type="checkbox" onChange={onChange} checked={checked} style={{marginBottom: "1px"}}></input>
            {
                title ? <CheckBoxTitle>{title}</CheckBoxTitle> : null
            }
        </CheckBoxContainer>
    )
}
