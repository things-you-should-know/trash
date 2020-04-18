import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

/* Custom Components */
import App from './App';
/* Custom Components */

/*Bootstrap*/
import "./bootstrap.min.css";

/*End Bootstrap*/

import './App.css';

function Welcome(props) {
  return <h2>Hello, {props.name}</h2>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
