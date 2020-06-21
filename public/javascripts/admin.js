class List extends React.Component {
	constructor() {
		super();
		this.state = {verified:false,list:[{}],filter:'all'};
		this.enter = this.enter.bind(this);
		this.getPeople = this.getPeople.bind(this);
		this.good = this.good.bind(this);
		this.bad = this.bad.bind(this);
		this.getStyle = this.getStyle.bind(this);
		this.changeFilter = this.changeFilter.bind(this);
		this.filter = this.filter.bind(this);
	}
	enter(e) {
		let password = document.getElementById('password').value
		let that = this;
		//Verify
		$.post("/admin/verify",
		  {
		    secret: password,
		  },
		  function(data, status){
		    if (data) {
		    	that.getPeople();
		    	that.setState({verified:true})
		    	document.getElementById('all').checked = true;
		    } else {
		    	console.log('oops - email me if you see this')
		    }
		  });
	}
	getPeople() {
		let that = this;
		$.get( "/admin/getpeople", function( data ) {
			that.setState({list:data})
		});
	}
	good(e) {
		let id = e.target.id;
		let i;
		let that = this;

		$.post("/admin/good",
		  {
		    id: id,
		  },
		  function(data, status){
		    if (data) {
		    	that.getPeople();
		    } else {
		    	console.log('oops - email me if you see this')
		    }
		  });
	}
	bad(e) {
		let id = e.target.id;
		let i;
		let that = this;

		$.post("/admin/bad",
		  {
		    id: id,
		  },
		  function(data, status){
		    if (data) {
		    	that.getPeople();
		    } else {
		    	console.log('oops - email me if you see this')
		    }
		  });
	}
	getStyle(state) {
		let style = {};
		if (state === 'good') {
			return {backgroundColor:'lightgreen'}
		} else if (state === 'bad') {
			return {backgroundColor:'tomato'}
		} else {
			return {};
		}
	}
	changeFilter(e) {
		this.setState({filter:e.target.value})
	}
	filter(list) {

		if (this.state.filter === 'good') {
			for (let i = 0; i < list.length; i++){
				
				if (list[i].state !== 'good') {
					list.splice(i,1);
					
					i = i - 1;
				}
			}
		} else if (this.state.filter === 'new') {
			for (let i = 0; i < list.length; i++){
				
				if (list[i].state !== 'new') {
					list.splice(i,1);
					
					i = i - 1;
				}
			}
		} else if (this.state.filter === 'bad') {
			for (let i = 0; i < list.length; i++){
			
				if (list[i].state !== 'bad') {
					list.splice(i,1);
					
					i = i - 1;
				}
			}
		}
		return list;
	}
	render() {	
		let that = this;
		if (this.state.verified) {
			let list = this.state.list.slice();
			this.filter(list);
			let listOfPeople = list.map(function(person, i) {
				let style = that.getStyle(person.state);
	      		return (<div key={i} style={style}>
	      					<h1>{person.name}</h1>
	      					<h3>{person.email}</h3>
	      					<h5>{person.pitch}</h5>
	      					<input id={person._id} className='stateButton' type='button' value='✅' onClick={that.good}></input>
	      					<input id={person._id} className='stateButton' type='button' value='❌' onClick={that.bad}></input>
	      					<br />
	      				</div>)
			})
			//Render each item in state.list
			return (<div>
						<div className='controls' onChange={this.changeFilter}>
							<label className='radio' htmlFor="all"><input type="radio" id="all" name="display" value="all"></input>All</label><br />
							<label className='radio' htmlFor="good"><input type="radio" id="good" name="display" value="good"></input>Good</label><br />
							<label className='radio' htmlFor="new"><input type="radio" id="new" name="display" value="new"></input>New</label><br />
							<label className='radio' htmlFor="bad"><input type="radio" id="bad" name="display" value="bad"></input>Bad</label><br />
						</div>
						<div id='listofpeople'>{ listOfPeople }</div>
					</div>)

		} else {
			return <div><input type='text' id='password'></input><input type='button' value='Enter' onClick={this.enter}></input></div>
		}
	}
}

ReactDOM.render(<List />, document.getElementById('list'))
