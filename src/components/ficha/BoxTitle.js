import React from 'react'
import styled from 'styled-components'

const BoxTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid white;

    align-items: center;
`

const BoxTitleText = styled.div`
    font-size: 30px;
`

const BoxTitleSubText = styled.div`
    font-size: 15px;
`

export default function BoxTitle({ title, subtitle }) {
    return (
        <BoxTitleContainer>
            <BoxTitleText>
                {title}
            </BoxTitleText>
            <BoxTitleSubText>
                {subtitle}
            </BoxTitleSubText>
        </BoxTitleContainer>
    )
}
