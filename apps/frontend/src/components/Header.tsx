import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <nav className="container-responsive flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-primary-600">
          Enterprise
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
            Home
          </Link>
          <a href="#about" className="text-gray-600 hover:text-primary-600 transition-colors">
            About
          </a>
          <a href="#services" className="text-gray-600 hover:text-primary-600 transition-colors">
            Services
          </a>
          <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">
            Contact
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="btn-secondary">Login</button>
          <button className="btn-primary">Get Started</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container-responsive py-4 space-y-4">
            <Link to="/" className="block text-gray-600 hover:text-primary-600">
              Home
            </Link>
            <a href="#about" className="block text-gray-600 hover:text-primary-600">
              About
            </a>
            <a href="#services" className="block text-gray-600 hover:text-primary-600">
              Services
            </a>
            <a href="#contact" className="block text-gray-600 hover:text-primary-600">
              Contact
            </a>
            <div className="flex gap-4">
              <button className="btn-secondary flex-1">Login</button>
              <button className="btn-primary flex-1">Get Started</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
