
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/components/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center mb-8">
              <Activity className="h-8 w-8 text-ufit-accent" />
              <span className="ml-2 text-2xl font-semibold text-ufit-primary">ufit</span>
            </Link>
            <h1 className="text-2xl font-medium text-ufit-primary">Welcome back</h1>
            <p className="mt-2 text-ufit-secondary">Sign in to your account</p>
          </div>

          <div className="ufit-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`ufit-input ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-ufit-accent hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`ufit-input ${errors.password ? "border-red-500" : ""}`}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                className="w-full ufit-button-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>

          <p className="text-center text-ufit-secondary text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-ufit-accent hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
