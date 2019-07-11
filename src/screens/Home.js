import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { logOut } from '../actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    _logOut = () => {
        this.props.logOut()
            .then(() => {
                this.props.navigation.navigate('LogIn');
            })
    }

    render() {
        console.log(this.props.token);
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <Button title="Log out" onPress={this._logOut} style={styles.button}/>
            </View>
        );
    }
    
};

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
    return { token: state.token };
};

export default connect(
    mapStateToProps,
    { logOut }
)(Home);