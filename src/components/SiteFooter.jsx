// Shared footer used by every page; only the middle "tag" label changes per page.
export function SiteFooter({ tag }) {
  return (
    <footer className="site-footer">
      <span>LEARN BRIGITTE</span>
      <span>{tag}</span>
      <span>EST. 2026</span>
    </footer>
  )
}
