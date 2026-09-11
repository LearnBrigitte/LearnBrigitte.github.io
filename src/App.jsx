import { NavLink, Route, Routes } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <nav aria-label="Main navigation">
          <NavLink className="wordmark" to="/" aria-label="Learn Brigitte home">
            BRIGITTE <span>LINDHOLM</span>
          </NavLink>
          <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}