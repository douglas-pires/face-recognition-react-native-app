import React, { Component } from 'react'
import { View, StyleSheet, Alert, Text, Animated, Image, Easing, ActivityIndicator } from 'react-native'
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
      username: ''
    }
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount () {
    this.spin()
  }

  register () {
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

  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  renderIsTraining () {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View>
        <View style={styles.container}>
          {/* <Animated.Image
            style={{
              width: 227,
              height: 200,
              transform: [{rotate: spin}] }}
              source={{uri: 'https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-090_loader_loading-512.png'}}
          /> */}
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