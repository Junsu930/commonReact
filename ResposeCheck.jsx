import React, { Component } from 'react';

class ResponseCheck extends Component{
	state = {
			state : 'waiting',
			message : '클릭해서 시작하세요',
			result : [],
	};

	timeout;
	startTime;
	endTime;

	onClickScreen = () =>{
		const {state, message, result} = this.state;
		if(state=='waiting'){
			this.setState({
				state : 'ready',
				message: '초록색이 되면 클릭하세요',
			});
			this.timeout = setTimeout(()=>{
				this.setState({
					state: 'now',
					message: '지금 클릭하세요'
				});
				this.startTime = new Date();
			}, Math.floor(Math.random() * 1000) + 2000) // 2~3초 랜덤;
		}
		if(state == 'ready'){
			this.setState({
				state: 'waiting',
				message: '너무 성급하시네요 초록색일 때 클릭하세요',
			});
			clearTimeout(this.timeout);
		}

		if(state=='now'){
			this.endTime = new Date();
			this.setState((prevState)=>{
				return{
					state: 'waiting',
					message: '클릭해서 시작하세요',
					result: [...prevState.result, this.endTime - this.startTime],
				}
			});
			console.log(this.endTime - this.startTime);
		}
	}

	renderAverage = () =>{
		const {result} = this.state;
		return 	result.length === 0 
			? null 
			: <div>평균시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
	}

	render(){
		const {state, message} = this.state;
		return(
			<>
				<div id="screen" className={state} onClick={this.onClickScreen}>
					{message}
				</div>
				{this.renderAverage()}
			</>
		);
	}
}

export default ResponseCheck;