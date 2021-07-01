import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';

function SandBox() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.test.data);
    console.log(data)
    return (
        <>
            <h1>Testing</h1>
            <h3> Data is :{data}</h3>
            <Button onClick={() => dispatch(increment(20))} content='Increment' color='green' />
            <Button onClick={() => dispatch(decrement(10))} content='Decrement' color='red' />
        </>
    )
}


export default SandBox
