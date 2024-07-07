import './App.css'
import MainPage from './pages/main/MainPage.tsx'
import ErrorBoundary from './components/errorBoundary/errorBoundary.tsx'

function App() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  )
}

export default App
