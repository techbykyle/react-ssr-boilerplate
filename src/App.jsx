import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import About from './About/About'

const App = () => {

    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
    </Routes>
}

export default App