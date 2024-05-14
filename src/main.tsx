import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Page404 from './pages/404/404.tsx'
import { Toaster } from './components/ui/toaster.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename="/">
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={Page404}>
            <App />
            <Toaster />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>,
)
