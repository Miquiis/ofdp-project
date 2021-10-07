import React, { useContext, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import { Modal } from 'react-bootstrap';
import Avatar from '../components/Avatar';
import closeIcon from '../images/close.png'
import dice from '../images/dice.png'

const RolagemContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 250px;
    border: 1px solid white;
    background: #111111;
`

const RolagemTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 50px;
    color: white;
    font-size: 18px;
    font-family: "OFDP";
    padding: 10px 20px;
    border-bottom: 1px solid white;
    justify-content: space-between;
`

const RolagemContents = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const RolarButton = styled.button`
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    padding: 0px;
`

const RolarResult = styled.div`
    font-size: 40px;
    font-family: "OFDP";
    color: white;
`

const rolarAnimation = keyframes`
    20% { transform: scale(1.2) rotate(-40deg); opacity: 1;}
    80% { transform: scale(0.5) rotate(720deg); }
    100% { transform: scale(0.5) rotate(720deg); opacity: 0; }
`

const Rolar = styled.div`
    animation-name: ${rolarAnimation};
    animation-duration: 2s;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
`

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getExtensive(roll) {
    let result = "";
    let count = 0;
    roll.forEach(v => {
        count++;
        result += v;
        if (count !== roll.length) {
            result += " + "
        }
    })
    return result;
}

function getSum(roll) {
    let sum = 0;
    roll = roll.trim();
    roll.split("+").forEach(num => (
        sum += parseInt(num)
    ));
    return sum;
}

function getDices(dices) {
    const Dices = []
    const dicesAmount = (dices.match(/d/g)||[]).length;
    for (let i = 0; i < dicesAmount; i++) {
        const indexD = dices.indexOf("d");
        const indexPlus = dices.indexOf("+");
        const indexEnd = indexPlus !== -1 ? indexPlus : dices.length;
        const quantity = dices.slice(0, indexD);
        for (let ii = 0; ii < quantity; ii++) {
            Dices.push(dices.slice(indexD + 1, indexEnd))
        }
        dices = dices.slice(indexEnd + 1, dices.length);
    }
    return {dices: Dices, extra: dices};
}

function isSuccess(min, roll, value) {
    if (value < min) return false;
    value -= min;
    return roll >= 20 - (value/min);
}

function getSuccess(roll, value) {
    if (isSuccess(5, roll, value)) {
        return "Sucesso Extremo"
    } else if (isSuccess(2, roll, value)) {
        return "Sucesso Bom"
    } else if (isSuccess(1, roll, value)) {
        return "Sucesso Normal"
    } else if (roll > 1) {
        return "Fracasso"
    } else return "Desastre"
}

const RolagemContext = React.createContext()

export function useRolagem() {
    return useContext(RolagemContext)
}

function MyVerticallyCenteredModal({ rolagem, onRolar, onClick, diceRef, ...props}) {
    return (
      <Modal {...props} centered>
        <RolagemContainer>
            <RolagemTitle> Rolagem de dado para {rolagem?.title} 
                <RolarButton onClick={onClick}><Avatar size="30px" imageUrl={closeIcon}/></RolarButton> 
            </RolagemTitle>
            <RolagemContents>
                {
                    rolagem && rolagem.result !== null ? 
                    <>
                        <RolarResult>
                            {rolagem.result}
                        </RolarResult> 
                        <RolarResult style={{ fontSize: "30px"}}>
                            {rolagem.resultText}
                        </RolarResult> 
                    </>
                    :
                    <Rolar onAnimationEnd={onRolar}>
                        <Avatar ref={diceRef} size="100px" imageUrl={dice}/>
                    </Rolar>
                }
            </RolagemContents>
        </RolagemContainer>
      </Modal>
    );
}

export default function RolagemProvider({ children }) {
    const [rolagem, setRolagem] = useState()
    const [show, setShow] = useState(false)
    const diceRef = React.createRef();

    function close() {
        setShow(false)
    }

    function open(title, value, roll=null) {
        setRolagem({title, value, roll, result: null})
        setShow(true)
    }

    function rolar() {
        const dices = rolagem.roll ? getDices(rolagem.roll) : null;
        const roll = !rolagem.roll ? getRandomInt(1, 20) : (dices.dices.length > 0 ?
        (getExtensive(dices.dices.map(dice => getRandomInt(1, dice))) + (dices.extra ? " + " + dices.extra : "")) : dices.extra);
        setRolagem({
            ...rolagem,
            result: roll,
            resultText: !rolagem.roll ? getSuccess(roll, rolagem.value) : !rolagem.value ? getSum(roll) : (parseInt(roll) <= parseInt(rolagem.value) ? "Sucesso" : "Fracasso")
        })
    }

    useEffect(() => {
    }, [])

    const value = {
        close,
        open
    }

    return (
        <RolagemContext.Provider value={value}>
            <MyVerticallyCenteredModal diceRef={diceRef} rolagem={rolagem} onRolar={rolar} onClick={close} show={show} onHide={() => close()} />
            {children}
        </RolagemContext.Provider>
    )
}
