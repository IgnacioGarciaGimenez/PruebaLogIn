import React from 'react';
import { View, Text} from 'react-native';
import { connect } from 'react-redux';

const Home = (props) => {
    return <View><Text>Home</Text></View>
};

const mapStateToProps = (state) => {
    return { token: state.token };
};

export default connect(
    mapStateToProps
)(Home);