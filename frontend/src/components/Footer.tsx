import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, TwitterIcon, MailIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Recallr
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 max-w-md">
              Transform your PDFs into effective Anki flashcards using AI. Learn
              smarter, not harder.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-indigo-600 text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-600 hover:text-indigo-600 text-sm">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Connect
              </h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <GithubIcon size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <TwitterIcon size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <MailIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Recallr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;