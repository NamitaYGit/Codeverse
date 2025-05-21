//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { appStore } from './app/store.js';
import { Toaster } from '/components/ui/sonner';
import { useLoadUserQuery } from './features/api/authApi';
import LoadingSpinner from '../components/LoadingSpinner';
const CustomWrapper = () => {
  const { isLoading } = useLoadUserQuery();
  
  return isLoading ? <LoadingSpinner/> : (
    <>
      <App />
      <Toaster />
    </>
  );
};

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <Provider store={appStore}>
    <CustomWrapper />
     
    </Provider>
  //</StrictMode>,
);
