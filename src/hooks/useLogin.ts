import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import type {LoginCredentials } from "@/types/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => authService.login(credentials),
        onSuccess: () => {
            navigate("/dashboard");
        },
        onError: (error) => {
            let errorMessage = "An error occurred. Please try again.";
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const data = error.response.data as { message?: string };
                    errorMessage = data?.message ?? errorMessage;
                };
            }
            alert(errorMessage);
        }
    });
};