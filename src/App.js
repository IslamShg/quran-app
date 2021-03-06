import { useEffect } from 'react'
import './App.css'

import { Router } from './router/Router'
import { CommonActionCreators } from './store/commonSlice'

const App = () => {
  const { setLang } = CommonActionCreators()

  useEffect(() => {
    const lang = localStorage.getItem('lang')
    if (lang) setLang(lang)
  }, [setLang])

  return <Router />
}

export default App
