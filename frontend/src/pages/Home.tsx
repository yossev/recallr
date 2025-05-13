import React from 'react';
import FileUpload from '../components/FileUpload';
import ProcessSteps from '../components/ProcessSteps';
import FeatureCard from '../components/FeatureCard';
import { BookOpenIcon, BrainIcon, ClockIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const Home = () => {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Transform Your PDFs into</span>
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Anki Flashcards
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Recallr uses AI to convert your study materials into effective
              flashcards. Upload a PDF and get ready-to-use Anki cards in
              seconds.
            </p>
            <div className="mt-10">
              <Link to="/#upload" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:text-lg">
                Get Started
              </Link>
              <Link to="/about" className="ml-4 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Upload Section */}
      <section id="upload" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Upload Your PDF
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Get started by uploading your study material
            </p>
          </div>
          <FileUpload />
        </div>
      </section>
      {/* Process Steps Section */}
      <ProcessSteps />
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Recallr
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our AI-powered platform makes learning efficient and effective
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard title="Smart Extraction" description="Our AI identifies key concepts and extracts essential information from your documents." icon={BrainIcon} />
            <FeatureCard title="Time Saving" description="Create hundreds of flashcards in seconds instead of hours of manual work." icon={ClockIcon} />
            <FeatureCard title="Enhanced Learning" description="Optimized flashcards based on proven learning science principles." icon={BookOpenIcon} />
            <FeatureCard title="AI-Powered" description="Advanced language models ensure high-quality, relevant flashcards." icon={SparklesIcon} />
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to transform your learning?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-100">
              Start creating effective Anki flashcards today.
            </p>
            <div className="mt-8">
              <a href="#upload" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg">
                Get Started for Free
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;