import React from 'react';
import { Kanban, Plus } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Kanban className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">TaskFlow</h1>
              <p className="text-sm text-gray-600">Organize your workflow</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;