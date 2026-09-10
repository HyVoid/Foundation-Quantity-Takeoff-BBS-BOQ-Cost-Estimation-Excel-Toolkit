import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-[#E8E8E6] animate-fade-up">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#D32F2F] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading">
                Reset Project to Defaults?
              </h3>
              <p className="text-[12px] text-[#888888] mt-0.5">
                This will overwrite current inputs with the baseline benchmark dataset.
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-[12px] text-amber-900 leading-relaxed">
            All custom measurements, Planswift tags, and modified unit rates in your browser localStorage will be restored to original benchmark values.
            You can export a JSON backup beforehand if you wish to retain your edits.
          </div>

          <div className="mt-6 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-1.5 text-[12px] font-semibold text-white bg-[#D32F2F] hover:bg-red-700 rounded-md transition-colors shadow-xs"
            >
              Reset Takeoff Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
