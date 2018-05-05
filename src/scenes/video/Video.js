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

class Video extends Component {
  
  constructor () {
    super ()
    this.batch = []
  }

  async faceIsDetected () {
    if (this.batch.length < 10) {

      await this.camera.takePictureAsync({ base64: true, quality: 0.5, width: 500 }).then(result => {
        this.batch.push(result)
      })
    }
    console.log(this.batch)
    if (!this.props.isThereAnyFace) this.props.isFaceRecognized(true)
  }
  render () {
    return (
      <View style={!this.props.isThereAnyFace ? styles.container : styles.container_diminished }>
        {/* <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
          <TouchableOpacity
              // onPress={}
              style = {styles.capture}
          >
              <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View> */}
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
  container_diminished: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 200,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

const mapStateToProps = (state) => ({
  isThereAnyFace: state.recognizer.isFaceRecognized
})

const mapDispatchToProps = {
  isFaceRecognized: recognizerOperations.isFaceRecognized
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)