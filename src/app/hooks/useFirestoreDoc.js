import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncActionStart, asyncActionError, asyncActionFinish } from '../async/asyncReducer';
import { dataFromSnapShot } from '../firestore/firestoreService';

export default function useFirestoreDoc({ query, data, deps, shouldExecute = true }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shouldExecute) return;
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                console.log(snapshot)
                if (!snapshot.exists) {
                    dispatch(asyncActionError({ code: 'not-found', message: 'Could not find document' }));
                    return;
                }
                data(dataFromSnapShot(snapshot));
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError())
        );
        return () => {
            unsubscribe()
        }
    }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}