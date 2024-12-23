// src/components/Step4.tsx
import { useFormStore } from "@/store/formStore";

const Step4 = () => {
  const { personalInfo, addressDetails, preferences } = useFormStore();

  return (
    <div>
      <h2>Step 4: Review & Submit</h2>
      <p>Name: {personalInfo.name}</p>
      <p>Email: {personalInfo.email}</p>
      <p>Address: {addressDetails.address}</p>
      <p>City: {addressDetails.city}</p>
      <p>Newsletter: {preferences.newsletter ? "Yes" : "No"}</p>
      <button className="mt-4 p-2 bg-green-500 text-white">
        Submit
      </button>
    </div>
  );
};

export default Step4;
