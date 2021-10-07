import React from 'react'
import styled from 'styled-components'

const BoxNavContainer = styled.div`
    position: absolute;
    padding: inherit;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
`

const BoxNavContents = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: end;
`

export default function BoxNav({ children }) {
    return (
        <BoxNavContainer>
            <BoxNavContents>
                {children}
            </BoxNavContents>
        </BoxNavContainer>
    )
}
