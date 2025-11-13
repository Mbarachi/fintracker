import React from "react";
import Button from '@components/ui/Button'
import InputField from "@components/ui/InputField";
import Checkbox from "@components/ui/Checkbox";

const LoginForm: React.FC = () => {
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

      <div className="flex flex-col gap-6">
        <InputField label="Email Address" placeholder="Enter your email" />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between">
          <Checkbox label="Remember Me" />
          <a
            href="#"
            className="text-base font-medium text-primary/80 hover:text-primary"
          >
            Forgot Password?
          </a>
        </div>

        <Button fullWidth>Log In</Button>

        <p className="text-center text-base text-gray-600 dark:text-[#92c9a4]">
          Don’t have an account?{" "}
          <a
            href="#"
            className="font-medium text-primary/80 hover:text-primary"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;