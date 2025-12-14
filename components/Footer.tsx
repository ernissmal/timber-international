import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-moooi-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Timber International</h3>
            <p className="text-gray-400">
              Premium wood products for industry partners
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-moooi-gold transition-colors">About</Link></li>
              <li><Link href="/manufacturing" className="text-gray-400 hover:text-moooi-gold transition-colors">Manufacturing</Link></li>
              <li><Link href="/sustainability" className="text-gray-400 hover:text-moooi-gold transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-moooi-gold transition-colors">View All</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-moooi-gold transition-colors">Contact</Link></li>
              <li><a href="mailto:sales@timber-international.com" className="text-gray-400 hover:text-moooi-gold transition-colors">sales@timber-international.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Timber International. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
