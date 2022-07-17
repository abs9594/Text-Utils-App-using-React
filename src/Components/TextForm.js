import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function TextForm(props) {
    const [text, setText] = useState("")
    const handleUpperClick = () => {
        let upperCaseText = text.toUpperCase()
        setText(upperCaseText)
    }

    const handleLowerClick = () => {
        let upperCaseText = text.toLowerCase()
        setText(upperCaseText)
    }

    const handleOnChangeText = (event) => {
        setText(event.target.value)
    }

    const handleTitleCaseClick = () => {
        const wordList = text.split(" ")
        const titleCase = wordList.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        console.log(titleCase.join(" "))
        setText(titleCase.join(" "))
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.modifyAlert("Copied to clipboard", "success");
    }

    const handlePaste = () => {
        navigator.clipboard.readText()
            .then((copiedText) => setText(copiedText))

    }

    const handleClearText = () => {
        setText("");
        props.modifyAlert("Text area cleared", "success");
    }

    return (
        <div className={`text-${props.mode === "dark" ? "light" : "dark"} container my-3`}>
            <h1>{props.heading}</h1>
            <form>
                <div className="form-group">
                    <textarea className={`form-control text-${props.mode === "dark" ? "light" : "dark"}`} value={text} style={{ backgroundColor: props.mode === "dark" ? "grey" : "white" }} placeholder="Enter text to analyze..." onChange={handleOnChangeText} id="box" rows="10"></textarea>
                </div>
            </form>
            <div className='container'>
                <div className='container'>
                    <button className='btn btn-primary mx-3 my-3' disabled={text.length === 0} onClick={handleUpperClick}>Upper Case</button>
                    <button className='btn btn-primary mx-3 my-3' disabled={text.length === 0} onClick={handleLowerClick}>Lower Case</button>
                    <button className='btn btn-primary mx-3 my-3' disabled={text.length === 0} onClick={handleTitleCaseClick}>Title Case</button>
                    <button className='btn btn-primary mx-3 my-3' disabled={text.length === 0} onClick={handleCopy}>Copy</button>
                    <button className='btn btn-primary mx-3 my-3' disabled={text.length === 0} onClick={handlePaste}>Paste</button>
                    <button className='btn btn-primary mx-3 my-3' disabled={text.length === 0} onClick={handleClearText}>Clear</button>
                </div>
                <h3><u>Text Summary:</u></h3>
                <p>Number of words=<b>{text ? text.trim().split(/\s+/).length : 0}</b>  and Number of characters=<b>{text.length}</b></p>
                <p>Average time to read complete text=<b>{text ? (text.trim().split(/\s+/).length/3).toFixed(2) : 0}</b> seconds</p>
            </div>

        </div>
    )
}

TextForm.prototype = { heading: PropTypes.string.isRequired }