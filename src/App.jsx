import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;