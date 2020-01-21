import React from 'react'
import ReactDOM from 'react-dom'

// Main Bootstrap styles (Could also be linked from Bootstrap CDN in a <link> tag in public/index.html)
import 'bootstrap/dist/css/bootstrap.min.css'

// Custom styles
import './index.css'

import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
