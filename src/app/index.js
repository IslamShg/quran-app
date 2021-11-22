import './index.scss'
import { Router } from '../router/Router'
import { withProviders } from './providers/index'

const App = () => <Router />

export default withProviders(App)
