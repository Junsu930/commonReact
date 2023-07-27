import React, {useState} from 'react';

let timeout;
let startTime;
let endTime;

const ResponseCheck = ()=>{
	const [state, setState] = useState('waiting');
	const [message, setMessage] = useState('클릭해서 시작하세요');
	const [result, setResult] = useState([]);


	const onClickScreen = () =>{
		if(state=='waiting'){

			setState('ready');
			setMessage('초록색이 되면 클릭하세요');

			timeout = setTimeout(()=>{
				setState('now');
				setMessage('지금 클릭하세요')
				startTime = new Date();
			}, Math.floor(Math.random() * 1000) + 2000) // 2~3초 랜덤;
		}else if(state == 'ready'){
			setState('waiting');
			setMessage('너무 성급하시네요. 초록색일 때 클릭하세요');
			clearTimeout(timeout);
		}else if(state=='now'){
			
			endTime = new Date();
			
			setState('waiting');
			setMessage('클릭해서 시작하세요');
			setResult((prevState)=>{
				return [...prevState, endTime - startTime];
			})
			console.log(endTime - startTime);
		}
	}

	const renderAverage = () =>{
		return 	result.length === 0 
			? null 
			: <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
	}


	return(
		<>
			<div id="screen" className={state} onClick={onClickScreen}>
				{message}
			</div>
			{renderAverage()}
		</>
	);
}

export default ResponseCheck;