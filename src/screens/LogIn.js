import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import { logIn } from '../actions';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
    }

    _logIn = async () => {
        this.props.logIn()
            .then(() => {
                this.props.navigation.navigate(this.props.token.isSignedIn ? 'Home' : '');
            });        
    }

    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.button} onPress={this._logIn} title="Log in"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 0,
    }
});

const mapStateToProps = (state) => {
    return { token: state.token}
}

export default connect(
    mapStateToProps,
    { logIn }
)(LogIn);

