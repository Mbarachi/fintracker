import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import type { LoginCredentials, User } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            // ⏳ Simulate network delay (1.5s)
            await new Promise((resolve) => setTimeout(resolve, 1500));
            // fake "backend" validation
            if (credentials.email !== "user@test.com" || credentials.password !== "password") {
                return Promise.reject(new Error("Invalid credentials"));
            }

            return authService.login(credentials);
        },
        onSuccess: (user: User) => {
            // Cache the logged-in user data
            queryClient.setQueryData(["currentUser"], user);

            // Redirect to dashboard
            navigate("/dashboard");
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "An error occurred. Please try again.");
        }
    });
};