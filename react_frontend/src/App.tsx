import React, { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        {/* Sidebar - hidden on mobile by default */}
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 md:relative md:translate-x-0`}
        >
          <Sidebar />
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main content area */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;

/*

WHAT TO IMPLEMENT NEXT :
-> modify battle mode -> we have to be able to choose among different flashcards deck 
when hovered above they get bigger and show a preview of the content DONE
-> add multiple decks in the study materials section 
-> add the possibility to create graph for the other note object and rename it to textbook 
-> edit the solo mode to finish and show the updated memory notification 
-> integrate pietro work 
-> change all the avatar and progress bar  
-> edit the solo mode so that it can generate AI powered questions, marked with AI spark , and the possibility to add it to the deck 
-> AGENT AI : feedback storing and preferences  
-> AGENT AI : profiling and tune settings 

*/
