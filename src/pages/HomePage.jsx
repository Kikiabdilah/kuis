
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, clearUser } from "../utils/storage";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate("/home"); 
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearUser();
    navigate("/"); 
  };

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  if (!user) return null; 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center w-80">
        <h1 className="text-2xl font-semibold mb-2">
          Selamat datang, {user.name} 
        </h1>
        <p className="text-gray-600 mb-6">Siap untuk mulai kuis hari ini?</p>

        <div className="space-y-3">
          <button
            onClick={handleStartQuiz}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Mulai Kuis
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
