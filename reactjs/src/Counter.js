import React from "react";

const myStyle = {
    backgroundColor: 'grey'
}

const MyButton = ({title, style, callback}) => {
    return (
        <button
            className={style}
            onClick={callback}
        >{title}</button>
    )
}

const Counter = (props) => {

    const [getCounter, setCounter] = React.useState(props.init)
    const [isStarted, setStarted] = React.useState(false)

    const inc = () => {
        // setCounter(prev => prev + 1)
        // setCounter(prev => prev + 1)
        var newCounter = getCounter + 1
        setCounter(newCounter)
        console.log(newCounter)
    }

    const dec = () => {
        // setCounter(prev => prev + 1)
        // setCounter(prev => prev + 1)
        var newCounter = getCounter - 1
        setCounter(newCounter)
        console.log(newCounter)
    }

    // if (getCounter <= 0) {
    //     return <h3>Counter has not started!</h3>
    // }

    return (
        <>
            {!isStarted &&
                <button
                    className="btn btn-success"
                    onClick={() => setStarted(true)}
                >Start Counter</button>
            }

            {isStarted &&
            <>
                <h3
                    style={myStyle}
                >Counter: {getCounter}</h3>
                <button
                    className="btn btn-primary"
                    onClick={inc}
                >Increment</button>
                <MyButton
                    title="MyButton Text"
                    style="btn btn-danger"
                    callback={inc}
                />
                <button
                    className="btn btn-success"
                    onClick={dec}
                    disabled={getCounter <=0 ? true : false}
                    >Decrement</button>
            </>
            }
        </>
    )
}

function Counter2() {
    return (
        <>
            <h3>I am a Counter Component</h3>
            <h6>2nd line of JSX</h6>
        </>
    )
}
export default Counter;