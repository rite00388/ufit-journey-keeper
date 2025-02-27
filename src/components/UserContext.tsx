
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user data on initial load
    const storedUser = localStorage.getItem('ufitUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      if (email && password) {
        // Mock user data
        const userData = {
          id: '1',
          name: email.split('@')[0],
          email,
        };
        
        // Store in localStorage for persistence
        localStorage.setItem('ufitUser', JSON.stringify(userData));
        setUser(userData);
        
        toast({
          title: "Login successful",
          description: "Welcome back to ufit!",
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      if (name && email && password) {
        // Mock user data
        const userData = {
          id: '1',
          name,
          email,
        };
        
        // Store in localStorage for persistence
        localStorage.setItem('ufitUser', JSON.stringify(userData));
        setUser(userData);
        
        toast({
          title: "Registration successful",
          description: "Welcome to ufit!",
        });
      } else {
        throw new Error("Please fill all required fields");
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please check your information",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ufitUser');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
