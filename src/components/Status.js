import React from 'react'

export default function Status({ name, color, value, maxValue }) {
    return (
        <div className="status text-center" style={{
            fontSize: '18px'
        }}>
            <div className="status-bar" style={{
                color: `${color}`,
                fontWeight: 'bold'
            }}>
                {maxValue ? `${value} / ${maxValue}` : value}
            </div>
            <div className="status-name" style={{
                color: 'white'
            }}>
                {name}
            </div>
        </div>
    )
}
