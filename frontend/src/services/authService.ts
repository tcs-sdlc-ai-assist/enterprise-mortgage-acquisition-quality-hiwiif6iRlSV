interface User {
  id: string;
  username: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const TOKEN_KEY = "makqcrp_token";

const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

const fetchAuth = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch data");
  }

  return response.json();
};

export const authService = {
  login: async (username: string, password: string): Promise<User> => {
    const response = await fetchAuth<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setToken(response.token);
    return response.user;
  },

  logout: async (): Promise<void> => {
    await fetchAuth<void>("/api/auth/logout", {
      method: "POST",
    });
    removeToken();
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const user = await fetchAuth<User>("/api/auth/me");
      return user;
    } catch (error) {
      removeToken();
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!getToken();
  },
};
</file_to_generate>