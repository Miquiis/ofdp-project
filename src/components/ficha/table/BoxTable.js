import React from 'react'
import styled from 'styled-components'
import NavIcon from '../NavIcon'
import TableHeader from './TableHeader'
import TableValue from './TableValue'

const Table = styled.table`

`

const TableRow = styled.tr`

`

const TableRowData = styled.tr`
    border-bottom: 1px solid white;
`

const TableData = styled.td`
    padding-bottom: 10px;
`

const DetalhesFormInput = styled.input`
    :focus {outline:none;}

    font-family: 'OFDP';

    width: 100%;
    padding: 5px;
    margin-top: 5px;
    border: none;
    background-color: transparent;
    box-sizing: border-box;

    font-size: 17px;
    color: white;
`

export default function BoxTable({ headers=[], inputs=[], values=[], ...props }) {
    return (
        <Table {...props}>
            <TableHeader headers={headers}/>
            {
                values.map(value => {
                    return <TableValue key={"combat_" + value.id} inputs={inputs} value={value}/>
                })
            }
        </Table>
    )
}
