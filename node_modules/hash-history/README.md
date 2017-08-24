history
=======

Use the query string in the url to store application state.

For single page web applications, it can be useful to store the state of the
UI in the url. This allows people to send links to specific states of the UI,
and also to use the browser back and forward buttons to navigate through
state history.

```
import History from 'history'

// track which smart list is selected

smartListHistory = new History('smartlist')
smartListHistory.set('list1')

// url will now be mypage.html?smartlist=list1

// set up a handler to listen for changes when the user navigates, either
// by pasting in a url, or by using the browser back or forward buttons

smartListHistory.on('change', (smartList) => {
  console.log('you navigated to the list', smartList)
})

// get the current smart list specified in the url
var smartList = smartListHistory.get()
```