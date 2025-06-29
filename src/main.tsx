import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Toaster from './components/ui/toaster.tsx';
import './index.css';
import Page404 from './pages/404/404.tsx';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={Page404}>
        <App />
        <Toaster />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);
