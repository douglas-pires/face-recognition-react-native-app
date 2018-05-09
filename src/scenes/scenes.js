import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'

import Routes from '@/routes/index'
import logo from '@/assets/gv2c-logo.png'
import RefreshIcon from '@/components/commons/RefreshIcon'

const createScenes = () => {
  return Routes.childRoutes.map((route) => {
    return <Scene
      key={route.path}
      component={route.component}
      title={route.title}
    />
  })
}

const navigationBarStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: 'white',
  paddingRight: 15,
  paddingLeft: 15,
}

const navigationBarTitleImageStyle = {
  height: 51,
  width: 153.25,
}

const scenes = Actions.create(
  <Scene key="app"
    navigationBarStyle={navigationBarStyle}>
    <Scene
      key={Routes.indexRoute.path}
      component={Routes.indexRoute.component}
      navigationBarTitleImage={logo}
      navigationBarTitleImageStyle={navigationBarTitleImageStyle}
      renderTitle={Routes.indexRoute.title}
      renderRightButton={<RefreshIcon />}/>
      {createScenes()}
  </Scene>
)



export default scenes
