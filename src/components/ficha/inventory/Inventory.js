import React from 'react'
import styled from 'styled-components'
import { useFicha } from '../../../contexts/FichaContext'
import InventoryItem from './InventoryItem'

const InventoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px 0px;
    overflow: auto;
    padding-right: 20px;
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
        margin-top: 20px;
    }
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`

const InventoryMoney = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
`

const InventoryItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`

const Input = styled.input`
    :focus {outline:none;}

    font-family: 'OFDP';

    width: 150px;
    height: 25px;
    padding: 5px;

    margin-left: 10px;

    border: none;
    border-bottom: 1px solid white;
    background-color: transparent;
    box-sizing: border-box;

    font-size: 20px;
    color:white;
`

export default function Inventory({ inventory: { money, items} }) {

    const { ficha, updateFicha, getItemById, removeItemById } = useFicha()

    function handleDelete(id) {
        removeItemById(id)
    }

    function handleChange(e, id, key) {
        const _item = getItemById(id)[0];
        _item[key] = e.target.value;
        updateFicha(ficha)
    }

    function handleMoneyChange(e) {
        let _money = e.target.value.replace(" ", "").replace("R$", "");
        ficha.inventory.money = _money;
        updateFicha(ficha);
    }

    return (
        <InventoryContainer>
            <InventoryMoney>
                Dinheiro: <Input onChange={handleMoneyChange} value={`R$ ` + money}/>
            </InventoryMoney>
            <InventoryItems>
            {
                items.map(item => (
                    <InventoryItem id={item.id} title={item.name} weight={item.weight} onClick={handleDelete} onChange={handleChange} onMoneyChange={handleMoneyChange} />
                ))
            }
            </InventoryItems>
        </InventoryContainer>
    )
}
