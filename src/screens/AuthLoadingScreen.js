import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import { AsyncStorage } from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import { getUserToken } from '../actions';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isSignedIn: null}
    }

    componentDidMount() {
        console.log("token: " + this.props.token.token);
        this.props.getUserToken()
            .then(() => {
                if (this.props.token.isSignedIn === false) {
                    this.setState({isSignedIn: false});
                }
                this.setState({isSignedIn: true});
            });

    }

    renderAuth() {        
        console.log(this.state.isSignedIn);
        if (this.state.isSignedIn === null) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                    <StatusBar barStyle="default" />
                </View>
            );
        } else if (this.state.isSignedIn) {
            return <Redirect to="/home" />;
        }
        return <Redirect to="/logIn" />;
    }

    render() {
        return this.renderAuth();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state) => {
    console.log(state);
    return { token: state.token };
}

export default connect(
    mapStateToProps,
    { getUserToken }
)(AuthLoadingScreen);