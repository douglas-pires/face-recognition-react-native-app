import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

export default class User extends Component {

  render () {
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