import './NotFoundPage.css'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>Page not found</h1>
      <p>The archive entry you are looking for does not exist or has been relocated.</p>
      <Link to="/" className="return-home-link">Return to Archive Home</Link>
    </section>
  )
}
