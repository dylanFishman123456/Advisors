'use client';

import { useState } from 'react';

type Advisor = {
  id: number;
  name: string;
  specialty: string;
  rate: string;
};

const mockAdvisors: Record<string, Advisor[]> = {
  lawyers: [
    { id: 1, name: 'John Doe', specialty: 'Corporate Law', rate: '$10/chat' },
    { id: 2, name: 'Jane Smith', specialty: 'Family Law', rate: '$15/chat' },
  ],
  consultants: [
    { id: 3, name: 'Bob Johnson', specialty: 'Business Strategy', rate: '$20/chat' },
  ],
  teachers: [
    { id: 4, name: 'Alice Brown', specialty: 'Math Tutoring', rate: '$5/chat' },
  ],
  ai: [
    { id: 5, name: 'AI Assistant', specialty: 'General Advice', rate: 'Free' },
  ],
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('lawyers');
  const [chatAdvisor, setChatAdvisor] = useState<Advisor | null>(null);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'advisor' }[]>([]);
  const [input, setInput] = useState('');

  const tabs = [
    { key: 'lawyers', label: 'Lawyers' },
    { key: 'consultants', label: 'Consultants' },
    { key: 'teachers', label: 'Teachers' },
    { key: 'ai', label: 'AI' },
  ];

  const handleChat = (advisor: Advisor) => {
    setChatAdvisor(advisor);
    setMessages([]);
  };

  const sendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      // Mock advisor response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `Hello, I'm ${chatAdvisor?.name}. How can I help?`, sender: 'advisor' }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Advisors</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockAdvisors[activeTab].map(advisor => (
                <div key={advisor.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          {advisor.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">{advisor.name}</h3>
                        <p className="text-sm text-gray-500">{advisor.specialty}</p>
                        <p className="text-sm text-gray-500">{advisor.rate}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => handleChat(advisor)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {chatAdvisor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setChatAdvisor(null)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Chat with {chatAdvisor.name}</h3>
              <div className="h-64 overflow-y-auto border rounded p-2 mb-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block px-2 py-1 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your message..."
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
