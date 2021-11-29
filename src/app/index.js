import { Router } from '../router/Router'
import { withProviders } from './providers/index'
import './index.scss'


const App = () => <Router />

export default withProviders(App)
