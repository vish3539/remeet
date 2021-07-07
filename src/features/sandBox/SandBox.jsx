import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';
import { openModal } from '../../app/common/modals/modalReducer';

function SandBox() {
    const dispatch = useDispatch();
    const [target, setTarget] = useState();
    const data = useSelector(state => state.test.data);
    const { loading } = useSelector(state => state.async) // async from root reducer
    console.log(data)
    return (
        <>
            <h1>Testing</h1>
            <h3> Data is :{data}</h3>
            <Button
                name='increment'
                loading={loading && target == 'increment'}
                onClick={(e) => {
                    dispatch(increment(20))
                    setTarget(e.target.name)
                }}
                content='Increment'
                color='green' />
            <Button
                name='decrement'
                loading={loading && target == 'decrement'}
                onClick={(e) => {
                    dispatch(decrement(10))
                    setTarget(e.target.name)
                }}
                content='Decrement' color='red' />
            <Button onClick={e => dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))} content='Open Modal' color='teal' />
        </>
    )
}


export default SandBox
