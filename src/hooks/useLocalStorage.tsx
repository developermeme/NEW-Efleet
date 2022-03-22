import { useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

export const useStorageValues = () => {
  const [loginEmail, setLoginEmail] = useLocalStorage("login-email", null);
  const [LoginHubid, setLoginHubid] = useLocalStorage("hubid", null);
  const [loginRole, setLoginRole] = useLocalStorage("role", null);
  const [adminUserId, setAdminUserId] = useLocalStorage("adminId", null);
  const [hubLocation, setHubLocation] = useLocalStorage("hubLocation", null);
  return {
    loginEmail,
    LoginHubid,
    loginRole,
    adminUserId,
    hubLocation,
    setLoginEmail,
    setLoginHubid,
    setLoginRole,
    setAdminUserId,
    setHubLocation,
  };
};
