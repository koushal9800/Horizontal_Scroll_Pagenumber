import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, ActivityIndicator, StyleSheet, AppRegistry, Platform } from 'react-native';

var device_width = Dimensions.get('window').width;

export default class MyScrollView extends Component
{
  constructor()
  {
    super();

    this.state = { currentHorizontalPage: 1 }
  }
  
  handleScroll = ( event ) =>
  {
    this.scrollX = event.nativeEvent.contentOffset.x;
    this.setState({ currentHorizontalPage: Math.min(Math.max(Math.floor(this.scrollX / device_width + 0.5) + 1, 0), React.Children.count(this.props.children))});
  }
  
  render()
  {
    return(
      <View style = { {
        flex: 1,
        backgroundColor: '#03A9F4',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        position: 'relative'
      }}>
        <ScrollView onScroll = { this.handleScroll } showsHorizontalScrollIndicator = { false } horizontal = { true } pagingEnabled = { true } scrollEventThrottle = { 64 }>
          { this.props.children }
        </ScrollView>

        <View style = { {
            backgroundColor: 'black',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'center'
        } }>
          <Text style = { {
              color: 'white',
              fontSize: 25,
              textAlign:'center'
          } }>{ this.state.currentHorizontalPage } / { React.Children.count(this.props.children) }</Text>  
        </View>
      </View>
    );
  }
}