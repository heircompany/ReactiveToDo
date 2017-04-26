var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/';
import router from 'app/router/';

// redirect on login and logout
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    hashHistory.push('/todos');
  } else {
    hashHistory.push('/');
  }
});

store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);

/*LOCAL STORAGE
store.subscribe(() => {
  var state = store.getState();
  console.log('New state', state);
  TodoAPI.setTodos(state.todos);
});

// fetch data and display in app
var initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));
*/
