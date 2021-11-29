import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

const withRouter = (component) => () => (
  <BrowserRouter>
    <Suspense fallback='Loading...'>{component()}</Suspense>
  </BrowserRouter>
)

export default withRouter
