import compose from 'compose-function'

import WithClientQuery from './with-client-query'
import withRouter from './with-router'
import withStore from './with-store'

export const withProviders = compose(withRouter, withStore, WithClientQuery)
