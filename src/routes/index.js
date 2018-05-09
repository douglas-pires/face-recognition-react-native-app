import Home from './Home'
import User from './User'
import Register from './Register'

export default {
  indexRoute: Home,
  childRoutes: [
    User,
    Register
  ]
}