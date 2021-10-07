import React from 'react'
import styled from 'styled-components'
import BoxTable from './table/BoxTable'
import deleteIcon from '../../images/delete.png'
import Avatar from '../Avatar'
import Dice from './Dice'
import { useFicha } from '../../contexts/FichaContext'

const DeleteIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border: 1px solid white;
`

const DeleteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: none;
    padding: 0px;
`

function Dano({ ...props }) {
    return (
        <Dice {...props} size="25px"/>
    )
}

export default function CombateTable({ values, ...props }) {

    const { ficha, updateFicha, removeCombatById, getCombatById } = useFicha()

    function handleDelete(id) {
        removeCombatById(id)
    }

    function handleChange(e, id, key) {
        const _combat = getCombatById(id)[0];
        _combat[key] = e.target.value;
        updateFicha(ficha)
    }

    function DeleteIcon({ ...props }) {
        return (
            <DeleteIconContainer {...props}>
                <DeleteButton>
                    <Avatar size="18px" imageUrl={deleteIcon} rounded={false}/>
                </DeleteButton>
            </DeleteIconContainer>
        )
    }

    return (
        <BoxTable 
        headers={["", "Nome", "Tipo", "Dano", "Mun. Atual", "Mun. Maxima", "Ataques", "Alcance", "Defeito", "Area"]}
        inputs={[
            { id: 0, key: "id", type: "component", component: DeleteIcon, style: { paddingLeft: "10px" }, onClick: handleDelete },
            { id: 1, key: "name", type: "input", style: { width: "100%"}, onchange: handleChange, },
            { id: 2, key: "type", type: "dropdown", options: ["Fogo", "Arco", "Briga"], onchange: handleChange, },
            { id: 3, key: "damage", type: "input-component", component: Dano, style: { width: "90px"}, divstyle: { display: "flex" }, onchange: handleChange },
            { id: 4, key: "ammo", type: "input", style: { width: "90px"}, onchange: handleChange, },
            { id: 5, key: "maxAmmo", type: "input", style: { width: "90px"}, onchange: handleChange, },
            { id: 6, key: "attacks", type: "input", style: { width: "40px"}, onchange: handleChange, },
            { id: 7, key: "range", type: "input", style: { width: "40px"}, onchange: handleChange, },
            { id: 8, key: "defect", type: "input", style: { width: "40px"}, onchange: handleChange, },
            { id: 9, key: "area", type: "input", style: { width: "40px"}, onchange: handleChange, },
        ]}
        values={values}
        style={{ marginTop: "30px" }}
        {...props}>
        </BoxTable>
    )
}
