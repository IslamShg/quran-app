import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Main from '../pages/Main/Main'

export const Router = () => (
  <Routes>
    <Route exact path='/*' element={<Main />} />
    <Route
      path='/admin'
      element={<div> Admin Panel and Authorization to be implemented </div>}
    />
  </Routes>
)
