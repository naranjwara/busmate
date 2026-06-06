// components/AppToast.jsx

export default function AppToast({
  isOpen,
  message,
  type = "success",
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className={`app-toast ${type}`}>
      <span>{message}</span>

      <button onClick={onClose}>✕</button>
    </div>
  );
}
