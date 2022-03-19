import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(password);
  };

  return (
    <div>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="px-3 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 class="text-2xl font-bold text-center" style={{ minWidth: 400 }}>
            Login to your account
          </h3>
          <div>
            <div className="mt-4">
              <div>
                <label className="block" for="username">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  onClick={() => login()}
                >
                  Login
                </button>
                {/* <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
