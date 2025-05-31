"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";
import { useState } from "react";
import { cx } from "lib/cx";

export default function Create() {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-white">
        {/* Desktop view */}
        <div className="hidden md:grid md:grid-cols-6">
          <div className="col-span-3">
            <ResumeForm />
          </div>
          <div className="col-span-3">
            <Resume />
          </div>
        </div>

        {/* Mobile view with tabs */}
        <div className="flex flex-col md:hidden h-screen">
          <div className="flex border-b border-gray-200 bg-white shadow-sm">
            <button
              onClick={() => setActiveTab('form')}
              className={cx(
                "flex-1 py-3 px-4 text-center font-medium transition-colors",
                activeTab === 'form' 
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              CV Builder
            </button>
            <button
              onClick={() => setActiveTab('preview')}  
              className={cx(
                "flex-1 py-3 px-4 text-center font-medium transition-colors",
                activeTab === 'preview'
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              Preview
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {activeTab === 'form' ? (
              <ResumeForm />
            ) : (
              <Resume />
            )}
          </div>
        </div>
      </main>
    </Provider>
  );
}
