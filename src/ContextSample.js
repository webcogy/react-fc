import React, { createContext, useContext, useState } from 'react';

// createContext로 context 생성
const Mycontext = createContext('deafultValue');

function Child(){
    const text = useContext(Mycontext);
    return <div>안녕하세요 ? {text} </div>
}

function Parent(){
    return <Child />
}

function GrandParent(){ 
    return <Parent />
}

function ContextSample(){
    const [value, setValue] = useState(true);
    return (
        <Mycontext.Provider value={value ? 'GOOD' : 'BAD'}>
            <GrandParent />
            <button onClick={() => setValue(!value)}>CLICK ME</button>
        </Mycontext.Provider>
    )
}
export default ContextSample;