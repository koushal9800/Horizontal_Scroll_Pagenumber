import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, ActivityIndicator, StyleSheet, AppRegistry, Platform } from 'react-native';

import MyScrollView from './components/myScrollView';

var device_width = Dimensions.get('window').width;



export default class App extends Component
{
  constructor()
  {
    super();
    this.state = { dataLoaded: false, viewsHolder: [] }
  }

  componentDidMount()
  {
    fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => response.json()).then(
      (responseData) =>
      {
        responseData.map(( item, key ) =>
        {
          this.state.viewsHolder.push
          (
            <View key = { key } style = {[ styles.childViews, { width: device_width }]}>
              <Text style = { styles.textInsideChildViews }>{ item.username }</Text>
            </View> 
          );
        })
        this.setState({ dataLoaded: true, viewsHolder: this.state.viewsHolder }); 
      }); 
  }
  
  render()
  {
    if( this.state.dataLoaded )
      return(
        <MyScrollView>
        {
          this.state.viewsHolder
        }
        </MyScrollView>
      );
    else
    {
      return(
        <View style = { styles.activityIndicatorHolder }>
          <ActivityIndicator size = "large"/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
    backgroundColor: '#03A9F4',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    position: 'relative'
  },

  pagingContainer:
  {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20,
    left: 30,
    width: '100%',
    flexDirection: 'row'
  },

  text:
  {
    color: 'white',
    fontSize: 25
  },

  childViews:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textInsideChildViews:
  {
    fontSize: 35,
    color: 'white'
  },

  activityIndicatorHolder:
  {
    backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('App', () => App);