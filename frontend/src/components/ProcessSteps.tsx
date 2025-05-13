import React from 'react';
import { FileTextIcon, BrainIcon, LayersIcon } from 'lucide-react';
const ProcessSteps = () => {
  return <div className="py-12 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Transform your PDFs into Anki flashcards in three simple steps
          </p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gradient-to-b from-transparent via-indigo-300 to-transparent hidden md:block"></div>
              </div>
              <div className="relative flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <FileTextIcon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  1. Upload Your PDF
                </h3>
                <p className="mt-2 text-center text-gray-600">
                  Upload any PDF document containing the material you want to
                  learn.
                </p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gradient-to-b from-transparent via-indigo-300 to-transparent hidden md:block"></div>
              </div>
              <div className="relative flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <BrainIcon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  2. AI Processing
                </h3>
                <p className="mt-2 text-center text-gray-600">
                  Our AI analyzes your content and extracts key concepts for
                  effective learning.
                </p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative">
              <div className="relative flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <LayersIcon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  3. Get Your Anki Cards
                </h3>
                <p className="mt-2 text-center text-gray-600">
                  Download perfectly formatted Anki flashcards ready to import
                  into your Anki app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ProcessSteps;