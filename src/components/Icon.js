import React from 'react'

export default function Icon({ height, width, imageUrl, centered, ycentered, children, ref }) {
    return (
        <div className="avatar" ref={ref} style={{
            margin: `${centered ? '0px auto' : ''}`,
            margin: `${ycentered ? 'auto 0px' : ''}`,
            width: `${width}`,
            height: `${height}`,
            minWidth: `${width}`,
            minHeight: `${height}`,
            backgroundImage: `url("${!imageUrl ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' : imageUrl}")`,
            backgroundSize: 'cover',
        }}>
            {children}
        </div>
    )
}
