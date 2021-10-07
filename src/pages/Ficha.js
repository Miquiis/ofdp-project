import React, { useEffect } from 'react'
import Box from '../components/ficha/Box'
import styled from 'styled-components'
import DetalhesInput from '../components/input-boxes/detalhes-input.component'
import Avatar from '../components/Avatar'
import ProgressBar from '../components/ficha/ProgressBar'
import Checkbox from '../components/ficha/Checkbox'
import BoxTitle from '../components/ficha/BoxTitle'
import Atributo from '../components/ficha/Atributo'
import AtributoRolar from '../components/ficha/AtributoRolar'
import Dice from '../components/ficha/Dice'
import NavIcon from '../components/ficha/NavIcon'
import BoxNav from '../components/ficha/BoxNav'
import CombateTable from '../components/ficha/CombateTable'
import { useFicha } from '../contexts/FichaContext'
import Pericias from '../components/ficha/pericias/Pericias'
import addIcon from '../images/add.png'
import editIcon from '../images/edit.png'
import diceIcon from '../images/small-dice.png'
import diceSixIcon from '../images/dice-6.png'
import Inventory from '../components/ficha/inventory/Inventory'

const FichaContainer = styled.div`
    display: flex;
    justify-content: center;
    font-family: "OFDP";
`

const FichaContent = styled.div`
    min-width: 1025px;
    max-width: 1025px;
    min-height: 100vh;
`

const FichaRowMain = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 50px;
`

const FichaRow = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const FichaRow2 = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`

const FichaRow3 = styled.div`
    display: flex;
    width: 100%;
`

const FichaRow4 = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: auto;
`

export default function Ficha() {
    const { ficha, saveFicha, updateFicha, addBlankCombat, getInventoryWeight, addBlankItem } = useFicha();
    const { basicInfo, stats, attributes, combat, skills, inventory } = ficha;
    
    function handleChange(key, value, e) {
        console.log(e.target.checked)
        key[value] = e.target.value;
        updateFicha(ficha)
    }

    function handleCheck(key, value, e) {
        key[value] = e.target.checked;
        updateFicha(ficha)
    }

    useEffect(() => {
        const save = setInterval(() => {
            saveFicha()
        }, 5000)

        return function cleanUp() {
            clearInterval(save)
        }
    }, [saveFicha])

    return (
        <FichaContainer>
            <FichaContent>
                <div style={{ height: '200px'}}/>
                <FichaRowMain>
                    <Box width="500px" height="auto" border margin>
                        <h3 className="text-center">DETALHES PESSOAIS</h3>
                        <DetalhesInput onChange={(e) => handleChange(basicInfo, "name", e)} value={basicInfo.name} label="Nome" type="text"/>
                        <DetalhesInput onChange={(e) => handleChange(basicInfo, "player", e)} value={basicInfo.player} label="Jogador" type="text"/>
                        <DetalhesInput onChange={(e) => handleChange(basicInfo, "occupancy", e)} value={basicInfo.occupancy} label="Ocupacao" type="text"/>
                        <DetalhesInput onChange={(e) => handleChange(basicInfo, "age", e)} value={basicInfo.age} label="Idade" type="number"/>
                        <DetalhesInput onChange={(e) => handleChange(basicInfo, "gender", e)} value={basicInfo.gender} label="Sexo" type="dropdown" dropdown={["", "Masculino", "Feminino"]}/>
                        <DetalhesInput onChange={(e) => handleChange(basicInfo, "birth", e)} value={basicInfo.birth} label="Local de Nascimento" type="text"/>
                        <DetalhesInput onChange={(e) => handleChange(basicInfo, "residence", e)} value={basicInfo.residence} label="Local de Residencia" type="text"/>
                    </Box>
                    <Box width="500px" height="auto">
                        <FichaRow>
                            <div className="d-flex justify-content-around align-items-center w-100">
                                <Avatar size="150px" imageUrl={stats.avatarUrl}/>
                                <Dice size="100px" title="D20" roll="1d20" />
                            </div>
                        </FichaRow>
                        <ProgressBar name="Vida" color="#881414" bgColor="#AA2929" value={stats.health} maxValue={stats.maxHealth}/>
                        <FichaRow2>
                            <Checkbox onChange={(e) => handleCheck(stats, "majorWound", e)} checked={stats.majorWound} title="Lesao Grave"/>
                            <Checkbox onChange={(e) => handleCheck(stats, "unconscious", e)} checked={stats.unconscious} title="Inconsciente"/>
                            <Checkbox onChange={(e) => handleCheck(stats, "dying", e)} checked={stats.dying} title="Morrendo"/>
                        </FichaRow2>
                        <FichaRow3>
                            <div style={{width: "100%"}}>
                                <ProgressBar name="Sanidade" color="#143088" bgColor="#233B88" value={stats.sanity} maxValue={stats.maxSanity}/>
                                <FichaRow2>
                                    <Checkbox onChange={(e) => handleCheck(stats, "tempInsane", e)} checked={stats.tempInsane} title="Traumatizado"/>
                                    <Checkbox onChange={(e) => handleCheck(stats, "insane", e)} checked={stats.insane} title="Enlouquecido"/>
                                </FichaRow2>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginLeft: "20px", padding: "10px"}}>
                                <Dice title="Sanidade" value={stats.sanity} roll="1d100" size="40px"/>
                            </div>
                        </FichaRow3>
                        <FichaRow4>
                            <Atributo onChange={(e) => handleChange(stats, "extraDamage", e)} value={stats.extraDamage} title="Dano Extra"/>
                            <Atributo onChange={(e) => handleChange(stats, "build", e)} value={stats.build} title="Corpo"/>
                        </FichaRow4>
                    </Box>
                </FichaRowMain>
                <FichaRowMain>
                    <Box width="500px" height="auto" border margin>
                        <BoxTitle title="ATRIBUTOS" />
                        <div style={{display: 'flex', height: "100%", flexWrap: "wrap", justifyContent: 'space-around', marginTop: "20px"}}>
                            <div style = {{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                                <AtributoRolar onChange={(e) => handleChange(attributes, "str", e)} value={attributes.str} style={{ marginBottom: "50px"}} title="Forca"/>
                                <AtributoRolar onChange={(e) => handleChange(attributes, "dex", e)} value={attributes.dex} style={{ marginBottom: "50px"}} title="Destreza"/>
                                <AtributoRolar onChange={(e) => handleChange(attributes, "con", e)} value={attributes.con} style={{ marginBottom: "50px"}} title="Constituicao"/>
                                <AtributoRolar onChange={(e) => handleChange(attributes, "app", e)} value={attributes.app} style={{ marginBottom: "50px"}} title="Aparencia"/>
                                <AtributoRolar onChange={(e) => handleChange(attributes, "edu", e)} value={attributes.edu} style={{ marginBottom: "50px"}} title="Educacao"/>
                                <AtributoRolar onChange={(e) => handleChange(attributes, "int", e)} value={attributes.int} style={{ marginBottom: "50px"}} title="Inteligencia"/>
                                <AtributoRolar onChange={(e) => handleChange(attributes, "pow", e)} value={attributes.pow} style={{ marginBottom: "50px"}} title="Poder"/>
                                <AtributoRolar onChange={(e) => handleChange(attributes, "luk", e)} value={attributes.luk} style={{ marginBottom: "50px"}} title="Sorte"/>
                            </div>
                            <Atributo onChange={(e) => handleChange(attributes, "siz", e)} value={attributes.siz} style={{ marginBottom: "50px"}} title="Tamanho"/>
                            <Atributo onChange={(e) => handleChange(attributes, "mov", e)} value={attributes.mov} style={{ marginBottom: "50px"}} title="Movimento"/>
                        </div>
                    </Box>
                    <Box width="500px" height="180px" border margin>
                        <BoxTitle title="PERICIAS" subtitle="(acesso rapido)" />
                    </Box>
                </FichaRowMain>
                <FichaRowMain>
                    <Box width="100%" height="auto" border>
                        <BoxNav>
                            <NavIcon imageUrl={addIcon} onClick={addBlankCombat} style={{ marginRight: "10px"}}/>
                        </BoxNav>
                        <BoxTitle title="COMBATE" />
                        <CombateTable values={combat}/>
                    </Box>
                </FichaRowMain>
                <FichaRowMain>
                    <Box width="100%" height="820px" border>
                        <BoxTitle title="PERICIAS" />
                        <Pericias pericias={skills} />
                    </Box>
                </FichaRowMain>
                <FichaRowMain>
                    <Box width="100%" height="820px" border>
                        <BoxNav>
                            <NavIcon imageUrl={addIcon} onClick={addBlankItem} style={{ marginRight: "10px"}}/>
                        </BoxNav>
                        <BoxTitle title="INVENTARIO" subtitle={`Peso Total: ${getInventoryWeight()}`} />
                        <Inventory inventory={inventory} />
                    </Box>
                </FichaRowMain>
            </FichaContent>
        </FichaContainer>
    )
}
