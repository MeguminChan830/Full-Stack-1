import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import {Input, Button} from 'react-bootstrap'
import * as authActions from '../actions/authActions'
class SignUp extends Component{
    static propTypes={
        welcomePage:PropTypes.string.isRequired,
        userValidation: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    constructor(props, context){
        super(props, context)
        this.state={
            username: this.props.welcomePage||'',
            password:'',
            confirmPassword: ''
        }
    }
    componentWillMount(){
        const {dispatch, userValidation} =this.props
        if(userValidation.length===0){
            dispatch(actions.usernameValidationList())
        }
    }
    componentDidMount(){
    if (this.state.username.length) this.refs.passwordInput.getInputDOMNode().focus()
    else this.refs.usernameInput.getInputDOMNode.focus()
    }
    handleSubmit(event){
        event.preventDefault()
        const {dispatch} = this.props
        if(!this.state.username.length) this.refs.usernameInput.getInputDOMNode().focus()
        if (this.state.username.length&& !this.state.password.length) this.refs.passwordInput.getInputDOMNode().focus()
        if(this.state.username.length&& this.state.password.length&&!this.state.confirmPassword.length) this.refs.confirmPasswordInput.getInputDOMNode().focus()
        if(this.state.username.length&& this.state.password.length&& this.state.confirmPassword.length) {
            const userObj={
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            }
            dispatch(authActions.signUp(userObj))
        }
        const initLobby={
            name: 'Lobby',
            id: 0,
            private: false
        }
        dispatch(actions.createChannel(initLobby))
        this.setState({username: '', password: '', confirmPassword: ''})
    }
    handleChange(event){
        if(event.target.name==='username') this.setState({username: event.target.value})
        if(event.target.name==='password') this.setState({password: event.target.value})
        if(event.target.name==='confirm-password') this.setState({confirmPassword: event.target.value})
    }
    validateUsername(){
        const {userValidation}= this.props
        if(userValidation.filter(user=>user===this.state.username.trim()).length>0) return "error"
        return "success"
    }
    validateConfirmPassword(){
        if(this.state.confirmPassword.length>0&& this.state.password.length>0){
            if(this.state.password===this.state.confirmPassword) return "success"
            return "error"
        }
    }
    render(){
        return (
            <div>
                <header style={{display: 'flex', justifyContent: 'center', background: 'black', color: 'white', flexGrow: '0', order: '0'}}>
                    Sign Up
                </header>
                <main style={{display: 'flex', justifyContent: 'center'}}>
                    <form onSubmit={this.handleSubmit}>
                        <section style={{height: '6em'}}>
                            <Input 
                            label="Username"
                            ref="usernameInput"
                            type="text"
                            help={this.validateUsername()==='error'&&"A user with that name already exist"}
                            bsStyle={this.validateUsername()}
                            hasFeedback
                            name="username"
                            autoFocus="true"
                            placeholder="Enter Username"
                            value={this.state.username}
                            onChange={this.handleChange}/>
                        </section>
                        <section style={{height: '6em'}}>
                            <Input
                            label="Password"
                            ref="passwordInput"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={this.handleChange}
                            />
                        </section>
                        <section style={{height: '6em'}}>
                            <Input 
                            label="Confirm Password"
                            ref='confirmPasswordInput'
                            help={this.validateConfirmPassword()==='error'&& "Your password doesnt Match"}
                            type="password"
                            name="confirm-password"
                            placeholder="Enter password Again" value={this.state.confirmPassword}
                            onChange={this.handleChange}/>
                        </section>
                        <Button 
                        disabled={this.validateUsername()==='error'||this.validateConfirmPassword()==='error'&&true}
                        bsStyle="success"
                        style={{width: "100%", height: '4rem', marginTop: '2rem'}}
                        onClick={this.handleSubmit}
                        type="submit">
                            <p style={{color: 'white', margin: '0', padding: '0', fontSize:'1.5em'}}>Sign Up</p>
                        </Button>
                    </form>
                </main>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        welcomePage: state.welcomePage,
        userValidation: state.userValidation
    }
}
export default connect(mapStateToProps)(SignUp)