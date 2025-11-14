import React, { useState } from "react";
import Button from '@components/ui/Button'
import Input from "@components/ui/Input";
import Checkbox from "@components/ui/Checkbox";
import { useLogin } from "@/hooks/useLogin";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password }
    );
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-4xl font-black text-gray-900 dark:text-white">
          Log in to your Account
        </p>
        <p className="text-base text-gray-600 dark:text-[#92c9a4]">
          Welcome back! Please enter your details.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            showPasswordToggle
            onChange={(e) => setPassword(e.target.value)}
            error={
              password.length > 0 && password.length < 8
                ? "Password must be at least 8 characters"
                : ""
            }
          />
          {/* <p
            className=
            {
              `text-sm text-red-500
                transition-all duration-300 ease-in-out
                ${password.length > 0 && password.length < 8
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none"
              }`
            }
          >
            Password must be at least 8 characters
          </p> */}

          <div className="flex items-center justify-between">
            <Checkbox label="Remember Me" />
            <a
              href="#"
              className="text-base font-medium text-primary/80 hover:text-primary"
            >
              Forgot Password?
            </a>
          </div>

          <Button fullWidth type="submit">
            {loginMutation?.isPending ? "Logging in..." : "Log In"}
          </Button>
          <p className="text-center text-base text-gray-600 dark:text-[#92c9a4]">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-primary/80 hover:text-primary"
            >
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;