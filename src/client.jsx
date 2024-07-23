import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import process from 'process'

const rootElement = document.getElementById('root')

if (process.env.ENABLE_SSR) {
    // For SSR, hydrate the root element
    hydrateRoot(rootElement,
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )
} 

if(!process.env.ENABLE_SSR) {
    // For CSR, render the root element
    createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )
}