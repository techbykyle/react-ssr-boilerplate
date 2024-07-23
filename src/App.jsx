import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home.jsx'
import About from './About/About.jsx'
import NavBar from './Nav/NavBar.jsx'

const App = () => {

    return <main>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </main>
}

export default App