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
        <div className="hidden md:flex md:h-[calc(100vh-var(--top-nav-bar-height))]">
          <div className="flex-1">
            <ResumeForm />
          </div>
          <div className="flex-1">
            <Resume />
          </div>
        </div>

        {/* Mobile view with tabs */}
        <div className="flex h-screen flex-col md:hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('form')}
                className={cx(
                  "flex-1 py-3 px-4 text-sm font-medium",
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
                  "flex-1 py-3 px-4 text-sm font-medium",
                  activeTab === 'preview'
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Preview
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
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
