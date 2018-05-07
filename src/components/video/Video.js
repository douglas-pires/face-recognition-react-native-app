import React, { Component } from 'react'
import { AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { recognizerOperations } from '@/state/ducks/recognizer'
import { connect } from 'react-redux'
import { postRecognizer } from '@/services/recoginzer.routes'
import { ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

class Video extends Component {
  
  constructor () {
    super ()
    this.batch = []
  }

  async faceIsDetected () {
    if (this.batch.length <= 10) {

      await this.camera.takePictureAsync({ base64: true, quality: 0.5, width: 500 }).then(result => {
        this.batch.push(result.base64)
        if (this.batch.length === 1) {
          this.props.sendingBatchToServer(true)
          postRecognizer(this.batch).then(result => {
            this.props.sendRecognizerResult(result.data)
            this.props.isFaceRecognized(true)
          })
        }

        if (this.batch.length === 10) {
          postRecognizer(this.batch).then((result) => {
            this.props.sendRecognizerResult(result.data)
          })
        }
      })
    }
    if (!this.props.isThereAnyFace) this.props.isFaceDetected(true)
  }

  renderCollectingSamplesView () {
    return (
      <View style={styles.auxiliaryViews}>
        <Text>Coletando amostras...</Text>
      </View>
    )
  }

  renderBatchWasSent () {
    return (
      <View style={styles.auxiliaryViews}>
        <Text>Reconhecendo o rosto</Text>
      </View>
    )
  }

  handlePress (face) {
    Actions.userinfo({face: face})
  }

  renderRecognizerResult () {

    return (
      <ScrollView>
        {this.props.recognizerResult.map(face => {
          return (
            <ListItem
              key={Math.random()}
              title={`Nome: ${face.className}`}
              subtitle={`A distância de: ${face.distance}`}
              onPress={ () => this.handlePress(face) }
            />
          )  
        })}
      </ScrollView>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}

            style = {styles.preview}
            type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
            onFacesDetected={ () => this.faceIsDetected() }
        />
        { this.props.isThereAnyFace && !this.props.isBatchSent ? this.renderCollectingSamplesView() : <View></View> }
        { this.props.isBatchSent && !this.props.isRecognized ? this.renderBatchWasSent() : <View></View> }
        { this.props.isRecognized ? this.renderRecognizerResult() : <View></View> }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  auxiliaryViews: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  result: {
    display: 'flex',
    flexDirection: 'row'
  }

});

const mapStateToProps = (state) => ({
  isThereAnyFace: state.recognizer.isFaceRecognized,
  isRecognized: state.recognizer.isFaceRecognized,
  isBatchSent: state.recognizer.isBatchSent,
  recognizerResult: state.recognizer.recognizerResult
})

const mapDispatchToProps = {
  isFaceDetected: recognizerOperations.isFaceDetected,
  isFaceRecognized: recognizerOperations.isFaceRecognized,
  sendingBatchToServer: recognizerOperations.sendingBatchToServer,
  sendRecognizerResult: recognizerOperations.sendRecognizerResult
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)