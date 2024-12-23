"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFormStore } from "@/store/formStore"; // Assuming you use Zustand

const MultiStepForm = () => {
  const { setPersonalInfo, setAddressDetails, setPreferences } = useFormStore();
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Personal Info", content: <PersonalInfo /> },
    { title: "Address Details", content: <AddressDetails /> },
    { title: "Preferences", content: <Preferences /> },
    { title: "Review & Submit", content: <ReviewSubmit /> },
  ];

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/formState");
        const data = await res.json();
        
        // Update the form state with the fetched data
        setPersonalInfo(data.personalInfo);
        setAddressDetails(data.addressDetails);
        setPreferences(data.preferences);
      } catch (error) {
        console.error("Error fetching mock API data", error);
      }
    }, 5000); // Fetch every 5 seconds
    
    return () => clearInterval(interval); // Cleanup on unmount
  }, [setPersonalInfo, setAddressDetails, setPreferences]);

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs value={`step${step + 1}`} defaultValue="step1">
        <TabsList>
          {steps.map((_, index) => (
            <TabsTrigger key={index} value={`step${index + 1}`}>
              Step {index + 1}: {steps[index].title}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="py-4">
          {/* Form Step Content */}
          <motion.div
            key={step} // Trigger animation on step change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {steps[step].content}
          </motion.div>
        </div>

        {/* Step navigation buttons */}
        <div className="flex justify-between py-4">
          {step > 0 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Prev
            </motion.button>
          )}

          {step < steps.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Next
            </motion.button>
          ) : (
            <button
              className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
              // Add form submission logic here
            >
              Submit
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </Tabs>
    </div>
  );
};

// Sample Step Components (Personal Info, Address, Preferences, etc.)
const PersonalInfo = () => (
  <div>
    <h2>Personal Information</h2>
    <form>
      <label>
        Name:
        <input type="text" name="name" className="input" />
      </label>
      <label>
        Email:
        <input type="email" name="email" className="input" />
      </label>
    </form>
  </div>
);

const AddressDetails = () => (
  <div>
    <h2>Address Details</h2>
    <form>
      <label>
        Address:
        <input type="text" name="address" className="input" />
      </label>
      <label>
        City:
        <input type="text" name="city" className="input" />
      </label>
    </form>
  </div>
);

const Preferences = () => (
  <div>
    <h2>Preferences</h2>
    <form>
      <label>
        Subscribe to newsletter:
        <input type="checkbox" name="newsletter" className="input" />
      </label>
    </form>
  </div>
);

const ReviewSubmit = () => (
  <div>
    <h2>Review & Submit</h2>
    <button className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
  </div>
);

export default MultiStepForm;
