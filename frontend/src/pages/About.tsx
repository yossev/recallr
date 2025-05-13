import React from 'react';
import { BookOpenIcon, BrainIcon, FileTextIcon, ZapIcon, ShieldIcon, UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const About = () => {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              About Recallr
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Learn about our mission to revolutionize how students and
              professionals learn with AI-powered flashcards.
            </p>
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-600">
                At Recallr, we believe that learning should be efficient,
                effective, and accessible to everyone. Our mission is to
                leverage cutting-edge AI technology to transform traditional
                study materials into powerful learning tools.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-600">
                We're passionate about helping students, professionals, and
                lifelong learners optimize their study time and improve
                knowledge retention through the science of spaced repetition and
                active recall.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6 md:p-10">
                <blockquote>
                  <p className="text-xl font-medium text-gray-800 italic">
                    "Education is not the filling of a pail, but the lighting of
                    a fire."
                  </p>
                  <footer className="mt-4">
                    <p className="text-base font-medium text-gray-600">
                      W.B. Yeats
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Technology
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Powered by advanced AI and language models
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileTextIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Document Processing
              </h3>
              <p className="text-gray-600">
                Our system can process various document formats, extracting
                text, images, and structured data for analysis.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BrainIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                AI Content Analysis
              </h3>
              <p className="text-gray-600">
                Our language models identify key concepts, important facts, and
                relationships between ideas in your study materials.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpenIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Flashcard Generation
              </h3>
              <p className="text-gray-600">
                We automatically create optimized question-answer pairs designed
                for effective learning and long-term retention.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              What drives everything we do at Recallr
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ZapIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We constantly push the boundaries of what's possible with AI and
                learning technology.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Accessibility
              </h3>
              <p className="text-gray-600">
                We believe powerful learning tools should be available to
                everyone, regardless of background.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShieldIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Privacy
              </h3>
              <p className="text-gray-600">
                We respect your data and privacy, ensuring your documents and
                learning materials are secure.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to experience Recallr?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-100">
              Join thousands of students and professionals who are learning more
              effectively.
            </p>
            <div className="mt-8">
              <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg">
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default About;