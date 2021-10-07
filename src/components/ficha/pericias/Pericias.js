import React from 'react'
import styled from 'styled-components'
import { useFicha } from '../../../contexts/FichaContext'
import PericiaRolar from './PericiaRolar'

const PericiasContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    overflow: auto;
    justify-content: space-around;
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

export default function Pericias({ pericias }) {
    const { ficha, updateFicha, getSkillById } = useFicha()

    function handleChange(e, id) {
        const skill = getSkillById(id)[0];
        skill.value = e.target.value;
        updateFicha(ficha)
    }

    function handleChecked(e, id) {
        const skill = getSkillById(id)[0];
        skill.checked = e.target.checked;
        updateFicha(ficha)
    }

    return (
        <PericiasContainer>
        {
            pericias?.map(pericia => (
                <PericiaRolar key={"pericia_" + pericia.id} title={pericia.name} value={pericia.value} checked={pericia.checked} onCheckChange={(e) => handleChecked(e, pericia.id)} onInputChange={(e) => handleChange(e, pericia.id)} />
            ))
        }
        </PericiasContainer>
    )
}
