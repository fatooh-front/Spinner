import React from 'react';

const TailwindTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          🎉 Tailwind CSS يعمل!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          تم تثبيت Tailwind CSS بنجاح في مشروع TypeScript الخاص بك
        </p>
        <div className="space-y-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <p className="text-blue-800 font-medium">✅ TypeScript</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <p className="text-green-800 font-medium">✅ React</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-purple-800 font-medium">✅ Tailwind CSS v4</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-lg">
            <p className="text-orange-800 font-medium">✅ Vite</p>
          </div>
        </div>
        <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
          ابدأ التطوير!
        </button>
      </div>
    </div>
  );
};

export default TailwindTest;
