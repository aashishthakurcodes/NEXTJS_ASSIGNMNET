// src/components/Step1.tsx
import { useFormStore } from "@/store/formStore";
import { useState } from "react";

const Step1 = () => {
  const { personalInfo, setPersonalInfo, setError, errors } = useFormStore();
  const [localData, setLocalData] = useState(personalInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const validateForm = () => {
    const { name, email } = localData;
    let valid = true;

    if (!name) {
      setError("name", "Name is required");
      valid = false;
    } else {
      setError("name", null);
    }

    if (!email) {
      setError("email", "Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("email", "Invalid email address");
      valid = false;
    } else {
      setError("email", null);
    }

    return valid;
  };

  const handleNext = () => {
    if (validateForm()) {
      setPersonalInfo(localData);
    }
  };

  return (
    <div>
      <h2>Step 1: Personal Info</h2>
      <input
        type="text"
        name="name"
        value={localData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="p-2 border"
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}
      <input
        type="email"
        name="email"
        value={localData.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="p-2 border"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <button onClick={handleNext} className="mt-4 p-2 bg-blue-500 text-white">
        Next
      </button>
    </div>
  );
};

export default Step1;
