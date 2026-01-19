import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './routes/Router'
import { ChatProvider } from './contextAPI/ChatContext'
import { ThemeProvider } from './contextAPI/ThemeContext'
import { ApolloProvider } from '@apollo/client/react'
import client from './graphql/client'

function App() {

  return (
    <ApolloProvider client={client}>
      <ChatProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </ChatProvider>
    </ApolloProvider>
  )
}

export default App
