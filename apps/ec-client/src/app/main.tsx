import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryProvider, RouterProvider } from './providers';
import './styles/global.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  </StrictMode>
);
