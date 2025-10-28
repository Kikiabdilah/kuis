import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser, getUser } from "../utils/storage";

export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = getUser();
    if (existingUser) {
      navigate("/quiz");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Nama tidak boleh kosong!");

    saveUser({ name });
    navigate("/home");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80 text-center"
      >
        <h1 className="text-2xl font-semibold mb-4">Masuk ke QuizApp</h1>
        <input
          type="text"
          placeholder="Masukkan nama kamu..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 text-center"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
        >
          Mulai Kuis
        </button>
      </form>
    </div>
  );
}
