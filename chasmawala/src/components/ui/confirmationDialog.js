import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
         <div className="flex items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                </div>
            </div>
         </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <Button onClick={onConfirm} variant="destructive" className="sm:ml-3">
            Confirm
          </Button>
          <Button onClick={onClose} variant="secondary" className="mt-3 sm:mt-0">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

// NOTE: You'd need to add `variant` support to your Button component
// to handle different colors like 'danger' (red) and 'secondary' (gray).