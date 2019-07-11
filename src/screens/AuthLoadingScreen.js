import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import { AsyncStorage } from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import { getUserToken } from '../actions';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(this.props.token)
        this.props.getUserToken()
            .then(() => {
                console.log(this.props.token);
                this.props.navigation.navigate(this.props.token.isSignedIn ? 'Home' : 'LogIn');                
                console.log(this.props.token)
            });
    }


    render() {
        return(
            <View style={styles.container}>
                    <ActivityIndicator />
                    <StatusBar barStyle="default" />
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
});

const mapStateToProps = (state) => {
    return { token: state.token };
}

export default connect(
    mapStateToProps,
    { getUserToken }
)(AuthLoadingScreen);