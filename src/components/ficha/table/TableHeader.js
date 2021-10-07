import React from 'react'
import styled from 'styled-components'

const Header = styled.th`
    font-weight: normal;
    border-bottom: 2px solid white;
    padding-right: 20px;
`

export default function TableHeader({ headers }) {
    return (
        <tr>
            {
                headers.map(header => (
                    <Header key={header}>{header}</Header>
                ))
            }
        </tr>
    )
}
