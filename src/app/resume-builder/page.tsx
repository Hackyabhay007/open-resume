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
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
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
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('form')}
              className={cx(
                "flex-1 py-2 px-4 text-sm font-medium",
                activeTab === 'form' 
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}  
              className={cx(
                "flex-1 py-2 px-4 text-sm font-medium",
                activeTab === 'preview'
                  ? "border-b-2 border-blue-500 text-blue-600"
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
