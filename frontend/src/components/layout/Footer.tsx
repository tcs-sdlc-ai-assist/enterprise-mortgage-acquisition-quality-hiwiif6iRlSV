import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex items-center gap-4 py-4 mt-12">
      <p>© {new Date().getFullYear()} MakqCRP. All rights reserved.</p>
      <nav className="flex gap-4">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </footer>
  )
}