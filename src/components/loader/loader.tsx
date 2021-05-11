import React from 'react'
import './loader.css'

type LoaderProps = {
    text?: string
}

export const Loader: React.FC<LoaderProps> = function (props) {
    return (
        <div className="loader-wrapper">
            <div className="loader"></div>
            <span className="loader-text">{props.text || 'Loading...'}</span>
        </div>
    )
}