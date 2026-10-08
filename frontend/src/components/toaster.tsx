import { Toaster as Sonner } from "sonner";
import "./toaster.css";

const Toaster = () => {
  return (
    <Sonner
      position="top-right"
      expand={false}
      richColors={false}
      closeButton
      duration={4000}
      toastOptions={{
        className: "app-toast",
      }}
    />
  );
};

export default Toaster;