import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const showToast = ({ title, message, type = "success" }) => {
    setToast({
      open: true,
      title,
      message,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        open: false,
      }));
    }, 3000);
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}
