// src/components/Step3.tsx
import { useFormStore } from "@/store/formStore";

const Step3 = () => {
  const { preferences, setPreferences } = useFormStore();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({ newsletter: e.target.checked });
  };

  return (
    <div>
      <h2>Step 3: Preferences</h2>
      <label>
        <input
          type="checkbox"
          checked={preferences.newsletter}
          onChange={handleCheckboxChange}
        />
        Subscribe to newsletter
      </label>
    </div>
  );
};

export default Step3;
