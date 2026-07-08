import Link from 'next/link'
import logo from '@/assets/logo.png'

export default function Header() {
  return (
    <header className="flex items-center">
      <div>
        <Link href="/">
          <img src={logo} alt="Logo" style={{ height: '32px' }} />
        </Link>
      </div>
      <div>
        <nav>
          <ul className="flex gap-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}