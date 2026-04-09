import React from 'react';
import { AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RemoveFavoriteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const RemoveFavoriteDialog: React.FC<RemoveFavoriteDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName 
}) => {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <AlertDialogContent className="bg-slate-900/95 border-slate-800 text-white backdrop-blur-md rounded-3xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 text-rose-500 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10">
              <AlertCircle size={24} />
            </div>
            <AlertDialogTitle className="text-xl font-bold">
              Remove from Favorites?
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-slate-400 text-base">
            Are you sure you want to remove{" "}
            <strong className="text-white font-semibold">{itemName}</strong> from your favorites list? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 gap-3">
          <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl py-6">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-rose-600 hover:bg-rose-700 text-white border-none rounded-xl py-6 px-8 shadow-lg shadow-rose-600/20 transition-all active:scale-95"
          >
            Yes, Remove Team
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFavoriteDialog;
