import React from 'react';

// 1. props 값 가져오기
function Hello({ color, name, isSpecial }){ 
    return (
        <div style={{color}}>
            {isSpecial && <b>*</b>}
            {0}
            안녕하세요 {name}
        </div>
    );
}

// 2. props를 빼먹었을 경우
Hello.defaultProps = {
    name:'이름없음'
};


export default Hello;