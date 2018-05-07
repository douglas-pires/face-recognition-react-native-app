import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

export default class User extends Component {
  render () {
    console.log(this.props.face)
    return (
      <Card title="Informações do Usuário">
        <ListItem
          title="Nome"
          subtitle={this.props.face.className}
          hideChevron={true}
        />
      </Card>
    )
  }
}