import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client'
import {Store} from './app/Store.jsx'
import { Provider } from 'react-redux'

const client =new ApolloClient({
  uri:"https://test.api.shop.strackit.com/graphql/",
  cache: new InMemoryCache()
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={Store}>
      <App />
      </Provider>
    
    </ApolloProvider>
   
  </React.StrictMode>,
)
