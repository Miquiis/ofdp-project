import React from 'react'
import { Card } from 'react-bootstrap';

export default function Box({ width, height, border, margin, children }) {
    return (
        <Card className="text-white bg-transparent" style={{
            width,
            height,
            minWidth: width,
            minHeight: height,
            padding: '25px 20px',
            marginRight: margin ? '25px' : '',
            borderRadius: border ? '6px' : '',
            border: border ? '1px solid white' : 'none',
            position: "relative"
        }}>
            {children}
        </Card>
    )
}
