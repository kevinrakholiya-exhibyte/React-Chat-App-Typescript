import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './routes/Router'
import { ChatProvider } from './contextAPI/ChatContext'
import { ThemeProvider } from './contextAPI/ThemeContext'

function App() {

  return (
    <ChatProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </ChatProvider>
  )
}

export default App
