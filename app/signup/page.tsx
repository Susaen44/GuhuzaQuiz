"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { playerContext } from "../context/playerContext";

function SignIn() {
  const router = useRouter();
  const { AssignPlayerData } = useContext(playerContext);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, Player_name: playerName }),
      });

      if (response.ok) {
        const data = await response.json();
        AssignPlayerData(data.player);
        router.push("/quiz");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err: any) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="px-8 my-32 rounded py-8 border-2 mx-auto w-fit bg-white">
        <form onSubmit={handleSignIn}>
          <h1 className="text-xl font-bold mb-5">Sign Up</h1>

          {error && <p className="text-red-600 mb-3">{error}</p>}

          <div>
            <label>Email</label>
            <input
              placeholder="you@example.com"
              type="email"
              className="border-2 rounded px-2 py-4 w-96"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-3">
            <label>Password</label>
            <div className="relative">
              <input
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                className="border-2 rounded px-2 py-4 w-96"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mt-3">
            <label>Player Name</label>
            <input
              placeholder="Enter Your Name"
              type="text"
              className="border-2 rounded px-2 py-4 w-96"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              required
            />
          </div>

          <button
            className="quizPbtn mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>Already have an account?</p>
          <Link href="/login" className="text-blue-600">
            login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
