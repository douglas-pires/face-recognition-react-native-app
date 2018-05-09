import React, { Component } from 'react'
import { View, StyleSheet, Alert, Text, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button, Card, Avatar } from 'react-native-elements'
import { connect } from 'react-redux'
import { postTrain } from '@/services/train.routes'
import { recognizerOperations } from '@/state/ducks/recognizer'

class Register extends Component {
  constructor () {
    super ()
    this.state = {
      username: '',
      disableRegisterButton: false
    }
  }

  register () {
    this.setState({disableRegisterButton: true})
    const data = {
      batch: this.props.batch.map(arr => arr.base64),
      metadata: { name: this.state.username }
    }
    this.props.setTraining(true)
    postTrain(data).then(result => {
      this.props.isTrained(true)
    })
  }

  renderAvatars (avatar, index) {
    return (
      <Avatar
        key={index}
        size='large'
        source={{uri: avatar.uri}}
      />
    )
  }

  renderWasTrained () {
    return (
      Alert.alert(
        'Sucesso!',
        'O modelo foi treinado!',
        [
          {text: 'OK', onPress: () => {
            Actions.pop()
            this.props.defaultState()
          } },
        ],
        { cancelable: false }
      )
    )
  }

  renderIsTraining () {
    return (
      <View>
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color="#0000ff"/>
        </View>
        <Card>
          <Text style={{marginBottom: 10}}>
            Treinando modelo, aguarde...
          </Text>
        </Card>

      </View>
    )
  }

  render () {
    return (
      <View>
        <Card
          title='REGISTRAR USUÁRIO'>
          <Input
            placeholder='Nome do Usuário'
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
            ref={(el) => { this.username = el }}
            onChangeText={(username) => this.setState({username})}
          />
          <Button
            title="Registrar"
            onPress={ () => this.register() }
            disabled={this.state.disableRegisterButton}
          />
        </Card>
        
        { this.props.isTraining && !this.props.wasTrained ? this.renderIsTraining() : <View></View>}
        { this.props.wasTrained ? this.renderWasTrained() : <View></View> }

        <View style={styles.overlay}>
          { !this.props.isTraining && !this.props.wasTrained ? this.props.batch.map((avatar, index) => this.renderAvatars(avatar, index)) : <View></View> }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    alignItems: 'center',
    flex: 3
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15
  }
})

const mapStateToProps = (state) => ({
  batch: state.recognizer.batch,
  isTraining: state.recognizer.isTraining,
  wasTrained: state.recognizer.wasTrained
})

const mapDispatchToProps = {
  setTraining: recognizerOperations.setTraining,
  isTrained: recognizerOperations.isTrained,
  defaultState: recognizerOperations.defaultState
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)