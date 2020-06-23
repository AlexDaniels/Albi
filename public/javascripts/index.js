class Signup extends React.Component {
	constructor() {
		super()
		this.state = {mode:'start'};
		this.state.nameStyle = {borderColor:'black'};
		this.state.emailStyle = {borderColor:'black'};
		this.state.pitchStyle = {borderColor:'black'};
		this.validateEmail = this.validateEmail.bind(this);
		this.onButton = this.onButton.bind(this);
	}
	validateEmail(email) {
  	 	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(email).toLowerCase());
	}
	onFocus() {
	
	}
	onButton() {
		let name = document.getElementById('name').value
		let email = document.getElementById('email').value
		let pitch = document.getElementById('textarea').value

		//let valid = //Name is not empty and not more than 50 characters && //Email is valid && //Pitch is not empty
		let isNameEmpty = document.getElementById('name').value == '';
		let isEmailValid = ValidateEmail(document.getElementById('email').value);
		let isPitchEmpty = document.getElementById('textarea').value == ''; 

		//If name is empty
		if (isNameEmpty) {
			
			this.setState(function(props, setState) {
				return {nameStyle:{borderColor:'red'}}
			})
		} else {
			this.setState(function(props, setState) {
				return {nameStyle:{borderColor:'black'}}
			})
		}
		//else if email is invalid
		if (!isEmailValid) {
			
			this.setState(function(props, setState) {
				return {emailStyle:{borderColor:'red'}}
			})
		}
		else {
			this.setState(function(props, setState) {
				return {emailStyle:{borderColor:'black'}}
			})
		}
		//else if pitch is empty or too short
		if (isPitchEmpty) {
			
			this.setState(function(props, setState) {
				return {pitchStyle:{borderColor:'red'}}
			})
		}
		else {
			this.setState(function(props, setState) {
				return {pitchStyle:{borderColor:'black'}}
			})
		}
		//else 
		if (!isNameEmpty && isEmailValid && !isPitchEmpty) {
			this.setState({mode:'done'});
			let newPerson = {name:name,email:email,pitch:pitch}
			let URL = '/users'
			let data = newPerson;
			let callback = function() {
				console.log("don't tell anyone you were here")
			}
			$.post(URL,data,callback);
		}
	}
	render() {
		if (this.state.mode === 'start') {
			return (
					<div id='emailshell' className="col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1">
						<h1 id='paid'>GET PAID TO WRITE</h1>
						<input onFocus={this.onFocus} id='name' type="text" className="form-control" style={this.state.nameStyle} placeholder='name'></input>
						<input onFocus={this.onFocus} id='email' type="text" className="form-control" style={this.state.emailStyle} placeholder='email'></input>
						<h5 id='pitchtitle'>Your Pitch</h5>
						<textarea className="form-control" id="textarea" style={this.state.pitchStyle} rows="4"></textarea>
						<div className='row'>
							<button id='button' className="btn btn-default justify-content-center col-xl-4" type="button" onClick={this.onButton}>send</button>
						</div>
					</div>
			) 
		}
		else if (this.state.mode === 'done') {
			return	(
					<h4  id='thanks' className="col-xl-8 offset-xl-2">We'll be in touch</h4>
			)
		}
	}	
}

ReactDOM.render(<Signup />, document.getElementById('emailroot'))

function ValidateEmail(mail) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

