/**
 * @flow
 * eslint no-console: 0
 */

import Koa from 'koa'
import React from 'react'
import { AppRegistry } from 'react-native-web'
import { renderToString } from 'react-dom/server'
import { View, Text } from 'react-native-web'

// Start Koa server =)
const server = new Koa()

server.use(function* main() {
  try {
    // Create <App /> component
    const App = () => <Text>My app</Text>
    // Render markup
    AppRegistry.registerComponent('App', () => App)
    const { element } = AppRegistry.getApplication('App');
    const markup = renderToString(element)
    this.body = markup
  } catch (errors) {
    // Run 500 internal error =)
    this.throw(errors, 500)
  }
})

server.listen(3000, () => console.log(`👏  Server started on port ${3000}`))
