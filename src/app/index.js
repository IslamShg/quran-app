import { useEffect } from 'react'
import { CommonActionCreators } from '../store/commonSlice'
import './index.scss'
import { Router } from '../router/Router'
import { withProviders } from './providers/index'

const App = () => {
  const { setLang } = CommonActionCreators()

  useEffect(() => {
    const lang = localStorage.getItem('lang')
    if (lang) setLang(lang)
  }, [setLang])

  return <Router />
}

export default withProviders(App)
