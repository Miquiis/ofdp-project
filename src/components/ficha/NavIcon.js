import React from 'react'
import styled from 'styled-components'
import Avatar from '../Avatar'

const NavIconContainer = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid white;
`

const NavIconButton = styled.button`
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    padding: 0px;
`


export default function NavIcon({ imageUrl, ...props }) {
    return (
        <NavIconContainer {...props}>
            <NavIconButton>
                <Avatar imageUrl={imageUrl} size="28px" rounded={false}/>
            </NavIconButton>
        </NavIconContainer>
    )
}
