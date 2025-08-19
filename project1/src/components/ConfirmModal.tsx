import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Xác nhận",
  message,
  confirmText = "Xóa",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
      <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[340px] max-w-[90vw] animate-fadeIn">
        <h4 className="text-xl font-bold mb-4 text-gray-800">{title}</h4>
        <p className="mb-6 text-base text-gray-600">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-base transition"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold text-base shadow-md transition"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
