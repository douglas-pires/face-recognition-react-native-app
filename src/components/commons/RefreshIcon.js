import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { recognizerOperations } from '@/state/ducks/recognizer'
import { connect } from 'react-redux'

class RefreshIcon extends Component {

  render () {
    return (
      <Icon
        name='refresh'
        size={24}
        color='black'
        onPress={() => this.props.defaultState()}
      />
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  defaultState: recognizerOperations.defaultState
}


export default connect(mapStateToProps, mapDispatchToProps)(RefreshIcon)