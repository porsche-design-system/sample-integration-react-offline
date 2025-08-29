import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PButton, PFlag, PWordmark, PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PorscheDesignSystemProvider>
      <PWordmark />
      <PButton icon="add">Some label</PButton>
      <PFlag />
      <App />
    </PorscheDesignSystemProvider>
  </StrictMode>,
)
