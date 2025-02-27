
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/components/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useUser();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: "",
    };
    let isValid = true;

    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

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
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
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
      await register(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
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
            <h1 className="text-2xl font-medium text-ufit-primary">Create an account</h1>
            <p className="mt-2 text-ufit-secondary">Start your fitness journey today</p>
          </div>

          <div className="ufit-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`ufit-input ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

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
                <Label htmlFor="password">Password</Label>
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`ufit-input ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="acceptTerms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <label 
                    htmlFor="acceptTerms" 
                    className="text-sm text-ufit-secondary cursor-pointer"
                  >
                    I accept the{" "}
                    <a href="#" className="text-ufit-accent hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-ufit-accent hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-red-500 text-xs">{errors.acceptTerms}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full ufit-button-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </div>

          <p className="text-center text-ufit-secondary text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-ufit-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
