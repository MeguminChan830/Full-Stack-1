import {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {initEnviroment} from '../actions/actions'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'

class App extends Component{
    componentDidMount(){
        const {dispatch} = this.props
        dispatch(initEnviroment())
    }
    render(){
        const {screenHeight, isMobile, screenWidth}= this.props.enviroment
        if(isMobile){
            return (
                <div style={{height: `${screenHeight}px`, width: `${screenWidth}px`}}>
                    {this.props.children}
                </div>
            )
        }
        return (
            <div style={{height: '100%'}}>
                {this.props.chidren}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        enviroment: state.enviroment
    }
}
export default connect(mapStateToProps)(App)