import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Video from '@/components/video/Video'

export default class Main extends Component {

  render () {
    return (
      <View style={ styles.container }>
        <Video />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});