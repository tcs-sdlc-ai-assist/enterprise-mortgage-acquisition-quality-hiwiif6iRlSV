import Link from 'next/link'
import logo from '@/assets/logo.png'

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-full p-4 bg-white border-r">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/">
          <img src={logo} alt="Logo" style={{ height: '32px' }} />
        </Link>
        <span className="font-semibold text-lg">MakqCRP</span>
      </div>
      <nav className="flex flex-col gap-2">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
          Home
        </Link>
        <Link href="/about" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
          About
        </Link>
        <Link href="/contact" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
          Contact
        </Link>
      </nav>
    </aside>
  )
}