import React from 'react';
import {View, Button, Text} from 'react-native';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import { logIn } from '../actions';

class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isSignedIn: null}
    }

    _logIn = async () => {
        this.props.logIn()
            .then(() => {
                if (this.props.token.isSignedIn) {
                    console.log(this.props.token.isSignedIn);
                    this.setState({isSignedIn: true});
                }
                this.setState({isSignedIn: false});
            });
        
    }

    renderLogIn() {
        if (this.state.isSignedIn === null) {
            return (
                <View>
                    <Button onPress={this._logIn} title="Log in"/>
                </View>
            );
        } else if (this.state.isSignedIn) {
            return <Redirect to="/home" />;
        }
        return <View><Text>{this.props.token.error}</Text></View>
    }

    render() {
        return this.renderLogIn();
    }
}

const mapStateToProps = (state) => {
    return { token: state.token}
}

export default connect(
    mapStateToProps,
    { logIn }
)(LogIn);

