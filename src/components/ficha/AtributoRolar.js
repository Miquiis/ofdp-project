import React from 'react'
import styled from 'styled-components'
import Atributo from './Atributo'
import Dice from './Dice'

const AtributoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function AtributoRolar({ title, value, onChange, ...props }) {
    return (
        <AtributoContainer {...props}>
            <div style={{ marginBottom: "5px" }}>
                <Dice title={title} value={value} size="50px"/>
            </div>
            <Atributo value={value} onChange={onChange} title={title}/>
        </AtributoContainer>
    )
}
