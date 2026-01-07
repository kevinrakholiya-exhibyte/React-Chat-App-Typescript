import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './routes/Router'
import { ChatProvider } from './contextAPI/ChatContext'

function App() {

  return (
    <ChatProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChatProvider>
  )
}

export default App
