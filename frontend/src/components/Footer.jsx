// Footer.jsx
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white">SkillLearn</h2>
            <p className="mt-2 text-sm">
              Learn smarter, learn faster. Empowering skills for the future.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/courses" className="hover:text-white">Courses</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex mt-4 space-x-4">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub className="h-6 w-6 hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter className="h-6 w-6 hover:text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin className="h-6 w-6 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SkillLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
