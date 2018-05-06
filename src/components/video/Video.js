import React, { Component } from 'react'
import { AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { recognizerOperations } from '../../state/ducks/recognizer';
import { connect } from 'react-redux'
import { postRecognizer } from '../../services/recoginzer.routes';

class Video extends Component {
  
  constructor () {
    super ()
    this.batch = []
  }

  async faceIsDetected () {
    if (this.batch.length <= 10) {

      await this.camera.takePictureAsync({ base64: true, quality: 0.5, width: 500 }).then(result => {
        this.batch.push(result)
        if (this.batch.length === 1) {
          postRecognizer(this.batch[0])
          //this.props.sendingBatchToServer()
        }

        if (this.batch.length === 10) {
          postRecognizer(this.batch).then((result) => {
            console.log(result)
          })
        }
      })
    }
    if (!this.props.isThereAnyFace) this.props.isFaceRecognized(true)
  }

  renderCollectingSamplesView () {
    return (
      <View style={styles.auxiliaryViews}>
        <Text>Coletando amostras...</Text>
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
            faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
            onFacesDetected={ () => this.faceIsDetected() }
        />
        { this.props.isThereAnyFace ? this.renderCollectingSamplesView() : <View></View> }
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
  }

});

const mapStateToProps = (state) => ({
  isThereAnyFace: state.recognizer.isFaceRecognized
})

const mapDispatchToProps = {
  isFaceRecognized: recognizerOperations.isFaceRecognized
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)