
import Navbar from "@/components/Navbar";
import BMIForm from "@/components/BMIForm";
import { useUser } from "@/components/UserContext";
import { Navigate } from "react-router-dom";

const BMICalculator = () => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-ufit-light/50">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="page-title">BMI Calculator</h1>
          
          <div className="mb-8">
            <p className="text-ufit-secondary mb-4">
              Body Mass Index (BMI) is a measurement of body fat based on height and weight that applies to adult men and women.
            </p>
          </div>
          
          <BMIForm />
        </div>
      </main>
    </div>
  );
};

export default BMICalculator;
