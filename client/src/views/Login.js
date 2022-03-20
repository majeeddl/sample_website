import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/actions/auth.action";
import { authSelector } from "../store/selectors/auth.selector";

import { Button, Alert } from "antd";

const Login = () => {
  const _authSelector = useSelector(authSelector);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (_authSelector.loggedIn) {
      navigate("/");
    }

    if (_authSelector.error) {
      // setLoading(false);
      setError(_authSelector.error);
      setLoading(false);
    } else {
    }
  }, [_authSelector, navigate]);

  const login = async () => {
    setLoading(true);
    dispatch(
      loginUser({
        username,
        password,
      })
    );
  };

  return (
    <div>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="px-3 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 class="text-2xl font-bold text-center" style={{ minWidth: 400 }}>
            Login to your account
          </h3>
          {error && <Alert message={error} type="error" className="mt-10" />}

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
                <Button
                  type="primary"
                  block
                  size="large"
                  className="mt-4"
                  loading={loading}
                  onClick={() => login()}
                >
                  Login
                </Button>

                {/* <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  onClick={() => login()}
                >
                  Login
                </button> */}
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
