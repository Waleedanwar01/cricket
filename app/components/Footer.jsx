import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-white mt-12 bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div className="pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-gray-700 pr-4">
          <h2 className="text-xl font-bold mb-4">CricketCourt</h2>
          <p className="text-gray-300">
            Book your cricket courts easily and enjoy your game with friends!
          </p>
        </div>

        {/* Quick Links */}
        <div className="pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-gray-700 px-4">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:border-b-4 hover:border-green-900 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/booking" className="hover:border-b-4 hover:border-green-900  transition">
                Book Court
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:border-b-4 hover:border-green-900  transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:border-b-4 hover:border-green-900  transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="px-4">
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <p className="text-gray-300">Email: info@cricketcourt.com</p>
          <p className="text-gray-300">Phone: +92 300 1234567</p>
          <div className="flex space-x-4 mt-4">
            <Link
              href="#"
              className="hover:text-green-400 transition border border-gray-600 px-3 py-1 rounded-lg"
            >
              Facebook
            </Link>
            <Link
              href="#"
              className="hover:text-green-400 transition border border-gray-600 px-3 py-1 rounded-lg"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="hover:text-green-400 transition border border-gray-600 px-3 py-1 rounded-lg"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 bg-gray-800 text-center py-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} CricketCourt. All rights reserved.
      </div>
    </footer>
  );
}
