import React from 'react'
import styled from 'styled-components'

const ProgressTitle = styled.div`
    font-size: 20px;
    margin-bottom: 5px;
`

const ProgressBarContent = styled.div`
    margin: 10px 0px;
`

const ProgressBarBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 40px;
    border: 2px solid #202020;
    border-radius: 5px;
`

const ProgressBarBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    border: 2px solid #202020;
    border-radius: 5px;
`

const ProgressBarCount = styled.div`
    display: flex;
    width: 100%;
    height: 40px;
    font-size: 25px;
    justify-content: center;
    align-items: center;
    position: absolute;
`

export default function ProgressBar({ name, color, bgColor, value, maxValue }) {


    const barSize = (style) => {
        const widthBar = (value / maxValue) * 100
        return {
            width: `${widthBar}%`,
            ...style
        }
    }

    const changeBorder = (style) => {
        if (value < maxValue) {
            console.log("Less");
            return {
                backgroundColor: color,
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                borderRight: "none",
                ...style
            }
        } else {
            console.log("Bigger");
            return {
                backgroundColor: color,
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                ...style
            }
        }
    }

    return (
        <div style={{ position: "relative"}}>
            <ProgressBarContent>
                <ProgressTitle>{name}</ProgressTitle>
                <ProgressBarBox style=
                {  
                    barSize(changeBorder())
                }>
                </ProgressBarBox>
                <ProgressBarCount>{value} / {maxValue}</ProgressBarCount>
                <ProgressBarBackground style={{ backgroundColor: bgColor }}></ProgressBarBackground>
            </ProgressBarContent>
        </div>
    )
}
