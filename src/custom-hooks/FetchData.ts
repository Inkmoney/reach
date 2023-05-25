import { useState, useEffect } from 'react';
import { serverCalls } from '../api'


export const useGetData = () => {
    const [charactersData, setData] = useState<[]>([]);

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }

    //useEffect hook to add our data to our react state
    useEffect( ()=> {
        handleDataFetch();
    }, [])

    return { charactersData, getData: handleDataFetch };
}