import React from 'react'
import styled from 'styled-components'

const TableRowData = styled.tr`
    border-bottom: 1px solid white;
`

const TableData = styled.td`
    padding-right: 20px;
`

const TableInput = styled.input`
    :focus {outline:none;}

    font-family: 'OFDP';

    padding: 5px;
    margin-top: 5px;
    border: none;
    background-color: transparent;
    box-sizing: border-box;

    font-size: 17px;
    color: white;
`

const Select = styled.select`
    :focus {outline:none;}

    font-family: 'OFDP';

    padding: 5px;
    margin-top: 5px;
    border: none;
    border-bottom: 1px solid white;
    background-color: transparent;
    box-sizing: border-box;

    font-size: 17px;
    color:white;
`

const Option = styled.option`
    background: #111111;
    font-size: 17px;
    color: white;
`

const getValue = (input, values, value) => {
    const { name, id } = values;
    switch(input.type.toLowerCase()) {
        case "input": {
            return (
                <TableInput onChange={(e) => input.onchange(e, id, input.key)} value={value} {...input}/>
            )
        }
        case "input-component": {
            const { component: Component } = input;
            return (
                <div style={input.divstyle}>
                    <Component title={name} roll={value} />
                    <TableInput onChange={(e) => input.onchange(e, id, input.key)} value={value} {...input}/>
                </div>
            )
        }
        case "dropdown": {
            return (
                <Select onChange={(e) => input.onchange(e, id, input.key)} value={value}>
                    {
                        input.options.map(option => (
                            <Option key={option.toLowerCase()}>{option}</Option>
                        ))
                    }
                </Select>
            )
        }
        case "component": {
            const { component: Component } = input;
            return (
                <Component onClick={() => input.onClick(value)}/>
            )
        }
        default: {
            break;
        }
    }
}

export default function TableValue({ inputs, value }) {
    return (
        <TableRowData>
            {
                inputs.map(input => (
                        <TableData {...input} key={input.id}>{getValue(input, value, value[input.key])}</TableData>
                ))
            }
        </TableRowData>
    )
}
