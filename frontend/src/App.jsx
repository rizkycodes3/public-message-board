import { useContext } from "react";
import { Routes, Route, NavLink } from "react-router";
import { Toaster } from "sonner";

import Message from "./components/Message";
import Topic from "./components/Topic";

import { dataContext } from "./contexts/DataContext.jsx";

const App = () => {
  const { isLoading } = useContext(dataContext);
  const getClassLink = ({ isActive }) => {
    return isActive ? "bg-blue-600 text-white p-2 rounded-2xl w-[50%] text-center" : "rounded-2xl w-[50%] text-center p-2";
  };

  return (
    <main className="max-w-xl mx-auto pt-10 px-6">
      <h1 className="text-4xl text-center font-bold mb-8">Public Message Board</h1>

      <nav className="flex justify-between border border-gray-300 rounded-3xl mb-10">
        <NavLink to="/" className={getClassLink}>
          Message
        </NavLink>
        <NavLink to="/topic" className={getClassLink}>
          Topic
        </NavLink>
      </nav>

      {isLoading ? (
        <p role="status" className="text-center">
          Loading...
        </p>
      ) : (
        <Routes>
          <Route path="/" element={<Message />} />
          <Route path="/topic" element={<Topic />} />
        </Routes>
      )}
      <Toaster position="bottom-center" />
    </main>
  );
};

export default App;
