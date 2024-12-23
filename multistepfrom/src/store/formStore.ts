// src/store/formStore.ts
import {create} from "zustand";

interface FormState {
  personalInfo: {
    name: string;
    email: string;
  };
  addressDetails: {
    address: string;
    city: string;
  };
  preferences: {
    newsletter: boolean;
  };
  errors: {
    name: string | null;
    email: string | null;
    address: string | null;
    city: string | null;
  };
  setPersonalInfo: (data: { name: string; email: string }) => void;
  setAddressDetails: (data: { address: string; city: string }) => void;
  setPreferences: (data: { newsletter: boolean }) => void;
  setError: (field: string, message: string | null) => void;
}

export const useFormStore = create<FormState>((set) => ({
  personalInfo: { name: "", email: "" },
  addressDetails: { address: "", city: "" },
  preferences: { newsletter: false },
  errors: { name: null, email: null, address: null, city: null },
  
  setPersonalInfo: (data) => set((state) => ({ personalInfo: { ...state.personalInfo, ...data } })),
  setAddressDetails: (data) => set((state) => ({ addressDetails: { ...state.addressDetails, ...data } })),
  setPreferences: (data) => set((state) => ({ preferences: { ...state.preferences, ...data } })),
  setError: (field, message) => set((state) => ({ errors: { ...state.errors, [field]: message } })),
}));
