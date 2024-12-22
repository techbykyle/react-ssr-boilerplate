import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import process from 'process'

import App from './App.jsx'
import NavBar from './Nav/NavBar.jsx'

const rootElement = document.getElementById('root')

const AppWrapper = () => (
    <React.StrictMode>
        <BrowserRouter>
            <NavBar />
            <App />
        </BrowserRouter>
    </React.StrictMode>
)

if(process.env.ENABLE_SSR) {
    hydrateRoot(rootElement, <AppWrapper />)
}

if(!process.env.ENABLE_SSR) {
    createRoot(rootElement).render(<AppWrapper />)
}