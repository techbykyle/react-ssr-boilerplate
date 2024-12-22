import express from 'express'
import {StaticRouter} from 'react-router-dom/server'
import ReactDomServer from 'react-dom/server'
import fs from 'fs'

import App from './App.jsx'
import NavBar from './Nav/NavBar.jsx'

const PORT = process.env.PORT || 3000

const app = express()

const createReactApp = async (location) => {

    const reactApp = ReactDomServer.renderToString(
        <StaticRouter location={location}>
            <NavBar />
            <App />
        </StaticRouter>
    )

    const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf-8')
    const reactHtlm = html.replace('<div id=\'root\'></div>', `<div id=\'root\'>${reactApp}</div>`)
    
    return reactHtlm
}


app.use('/static', express.static(__dirname))

app.get('*', async (req, res) => {
    const reactApp = await createReactApp(req.url)
    res.status(200).send(reactApp)
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

