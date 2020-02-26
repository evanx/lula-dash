import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
const { Suspense, Fragment, useState } = React
import { ApolloProvider } from 'react-apollo'
import {
  useQuery,
  useSubscription,
  ApolloProvider as ApolloHooksProvider,
} from 'react-apollo-hooks'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import StreamFilterForm from './components/StreamFilterForm'
import StreamTable from './components/StreamTable'
import StreamItem from './components/StreamItem'
import './index.css'
// import { schema } from './schema'

const client = new ApolloClient({
  uri: '/graphql',
  clientState: {
    defaults: {
      uiColorPalette: 'light',
      networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: false,
      },
    },
    typeDefs: `
      type NetworkStatus {
        isConnected: Boolean!
      },
      type Query {
        uiColorPalette: String
        networkStatus: NetworkStatus
        getNetworkStatus() {
          networkStatus @client
        }
      },
      type Mutation {
        updateNetworkStatus(isConnected: Boolean!)
      } 
    `,
    resolvers: {
      Query: {
        getNetworkStatus: (_, {}, { cache }) => {
          console.log('getNetworkStatus')
          return { isConnected: true }
        },
      },
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } })
          return null
        },
      },
    },
  },
})

//cache.writeData({ data: { uiColorPalette: 'dark' } })

const query1 = gql`
  {
    networkStatus @client {
      isConnected
    }
    uiColorPalette @client
  }
`

const query = gql`
  query {
    networkStatus @client {
      isConnected
    }
  }
`

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <div id="App">
          <ApolloApp />
        </div>
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

const sampleRows = [...Array(3).keys()].map(index => ({
  id: Math.ceil(Date.now() + index * 12345) + '-0',
  type: `type-${Math.floor(1 + Math.random() * (index % 4))}`,
  client: `client-${Math.floor(1 + Math.random() * (index % 4))}`,
  payload: {
    index,
  },
}))

function ApolloApp() {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <StreamFilterForm
          type={'in-1'}
          client={'client-1'}
          from={sampleRows[0].id}
          to={sampleRows[sampleRows.length - 1].id}
        />
      </Grid>
      <Grid item sm={12}>
        <StreamTable rows={sampleRows} />
      </Grid>
      <Grid item sm={12}>
        <StreamItem item={sampleRows[0]} />
      </Grid>
    </Grid>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
