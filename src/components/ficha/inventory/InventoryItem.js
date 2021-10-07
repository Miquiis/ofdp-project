import React from 'react'
import styled from 'styled-components'
import Icon from '../../Icon'
import deleteItem from '../../../images/delete.png'

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 450px;
    height: 50px;
    margin-top: 20px;
`

const ItemDelete = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 40px;
    border: 1px solid white;
`

const Button = styled.button`
    color: inherit;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    padding: 0px;
`

const Input = styled.input`
    :focus {outline:none;}

    font-family: 'OFDP';

    height: 75%;
    padding: 5px;

    border: none;
    border-bottom: 1px solid white;
    background-color: transparent;
    box-sizing: border-box;

    font-size: 20px;
    color:white;
`

export default function InventoryItem({ id, title, weight, onClick, onChange }) {
    return (
        <ItemContainer>
            <Button onClick={() => onClick(id)} >
                <ItemDelete>   
                    <Icon imageUrl={deleteItem} width="22px" height="22px" />
                </ItemDelete>
            </Button>
            <Input onChange={(e) => onChange(e, id, "name")} value={title} style={{ width: "300px" }}/>
            <Input onChange={(e) => onChange(e, id, "weight")} weight={weight} style={{ width: "70px", textAlign: "center" }}/>
        </ItemContainer>
    )
}
