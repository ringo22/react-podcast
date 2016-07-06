import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router'
import AppHome from './components/app-home'
import RequestPodcast from './components/request-podcast'
import NoMatch from './components/no-match'

render((<Router history={browserHistory}>
    <Route path="/" component={AppHome}>
    	<IndexRedirect to="/#podcast" />
      <Route path="#podcast" component={RequestPodcast}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>), document.getElementById('content'))
