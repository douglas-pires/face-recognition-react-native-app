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
import { ListItem, Button, Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

class Video extends Component {
  
  async faceIsDetected () {
    if (this.props.batch.length <= 10) {

      let photo = await this.camera.takePictureAsync({ base64: true, quality: 0.5, width: 500 })
      this.props.saveBatchInMemory(photo)

      if (this.props.batch.length === 1) {
        this.props.sendingBatchToServer(true)
        let singlePhoto = [this.props.batch[0].base64]
        let recognizerResult = await postRecognizer(singlePhoto)
        this.props.sendRecognizerResult(recognizerResult.data)
        this.props.isFaceRecognized(true)
      }

      if (this.props.batch.length === 10) {
        for (let i = 0; i < this.props.batch.length; i++) {
          let actPhoto = []
          actPhoto.push(this.props.batch[i].base64)
          let postPhoto = this.props.batch[i + 1] === undefined ? [] : this.props.batch[i + 1].base64

          if (postPhoto.length !== 0) actPhoto.push(postPhoto)
          let recognizerResult = await postRecognizer(actPhoto)
          this.props.sendRecognizerResult(recognizerResult.data)
          i = i + 1
        }
      }
    }
    if (!this.props.isThereAnyFace) this.props.isFaceDetected(true)
  }

  renderCollectingSamplesView () {
    return (
      <View style={styles.regularViews}>
        <Text>Coletando amostras...</Text>
      </View>
    )
  }

  renderBatchWasSent () {
    return (
      <View style={styles.regularViews}>
        <Text style={{
          textAlign: 'center',
        }}>Reconhecendo o rosto</Text>
      </View>
    )
  }

  handlePress (face) {
    Actions.userinfo({face: face})
  }

  renderRecognizerResult () {
    return (
      <View styles={styles.groupContainerResult}>
          <ScrollView style={styles.scrollView}>
            { this.props.recognizerAverage.map(face => {
              return (
                <ListItem
                  key={Math.random()}
                  title={`Nome: ${face.className}`}
                  subtitle={`A distância de: ${face.distance}`}
                  onPress={ () => this.handlePress(face) }
                  chevron
                />
              )  
            }) }
          </ScrollView>
        <View style={styles.roundButtonContainer}>
          { this.props.isRecognized ? this.renderRegisterButton() : <View></View> } 
        </View>
      </View>
    )
  }

  renderRegisterButton () {
    return (
      <View style={styles.registerButton}>
         <TouchableOpacity
          style={{
              alignItems: 'center',
              backgroundColor: '#0097e6',
              justifyContent:'center',
              width: 60,
              height: 60,
              borderRadius: 100,
            }}
            onPress={ () => Actions.register() }
        >
          <Icon name={"add"}  size={30} color="#fff" />
        </TouchableOpacity>
      </View>
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
    flexGrow: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  regularViews: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    width: '80%',
    height: 100,
    bottom: '5%',
    left: '10%',
    backgroundColor: '#FFF'
  },
  groupContainerResult: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    width: '80%',
    left: '10%',
  },
  scrollView: {
    flexGrow: 1,
    position: 'absolute',
    bottom: '5%',
    marginLeft: '10%',
    marginRight: '10%',
    maxHeight: 100,
    marginBottom: '5%',
    width: '80%'
  },
  roundButtonContainer: {
    // width: '100%'
  },
  result: {
    display: 'flex',
    flexDirection: 'row'
  },
  registerButton: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 120,
    right: 30,
  },
  overlay: {
    position: 'absolute',
    bottom: 300,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = (state) => ({
  isThereAnyFace: state.recognizer.isFaceRecognized,
  isRecognized: state.recognizer.isFaceRecognized,
  isBatchSent: state.recognizer.isBatchSent,
  recognizerResult: state.recognizer.recognizerResult,
  recognizerAverage: state.recognizer.recognizerAverage,
  batch: state.recognizer.batch
})

const mapDispatchToProps = {
  isFaceDetected: recognizerOperations.isFaceDetected,
  isFaceRecognized: recognizerOperations.isFaceRecognized,
  sendingBatchToServer: recognizerOperations.sendingBatchToServer,
  sendRecognizerResult: recognizerOperations.sendRecognizerResult,
  saveBatchInMemory: recognizerOperations.saveBatchInMemory
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)