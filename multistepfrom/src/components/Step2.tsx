// src/components/Step2.tsx
import { useFormStore } from "@/store/formStore";
import { useState } from "react";

const Step2 = () => {
  const { addressDetails, setAddressDetails, setError, errors } = useFormStore();
  const [localData, setLocalData] = useState(addressDetails);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const validateForm = () => {
    const { address, city } = localData;
    let valid = true;

    if (!address) {
      setError("address", "Address is required");
      valid = false;
    } else {
      setError("address", null);
    }

    if (!city) {
      setError("city", "City is required");
      valid = false;
    } else {
      setError("city", null);
    }

    return valid;
  };

  const handleNext = () => {
    if (validateForm()) {
      setAddressDetails(localData);
    }
  };

  return (
    <div>
      <h2>Step 2: Address Details</h2>
      <input
        type="text"
        name="address"
        value={localData.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="p-2 border"
      />
      {errors.address && <p className="text-red-500">{errors.address}</p>}
      <input
        type="text"
        name="city"
        value={localData.city}
        onChange={handleInputChange}
        placeholder="City"
        className="p-2 border"
      />
      {errors.city && <p className="text-red-500">{errors.city}</p>}
      <button onClick={handleNext} className="mt-4 p-2 bg-blue-500 text-white">
        Next
      </button>
    </div>
  );
};

export default Step2;
