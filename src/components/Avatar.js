import React from 'react'

export default function Avatar({ size, imageUrl, centered, ycentered, children, ref, rounded=true, style, ...props }) {
    return (
        <div {...props} className="avatar" ref={ref} style={{
            margin: `${centered ? '0px auto' : ''}`,
            margin: `${ycentered ? 'auto 0px' : ''}`,
            borderRadius: `${rounded ? '50%' : '0%' }`,
            width: `${size}`,
            height: `${size}`,
            minWidth: `${size}`,
            minHeight: `${size}`,
            backgroundImage: `url("${!imageUrl ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' : imageUrl}")`,
            backgroundSize: 'cover',
            ...style
        }}>
            {children}
        </div>
    )
}
