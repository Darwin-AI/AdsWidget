import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import AdWidget from './AdWidget'

function App() {
  return (
    <Router>
      <Route exact path="/" component={() => <Redirect to="/ABC123" />} />
      <Route exact path="/:id" component={AdWidget} />
    </Router>
  )
}

export default App
