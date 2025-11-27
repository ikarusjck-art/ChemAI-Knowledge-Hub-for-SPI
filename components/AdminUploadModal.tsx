import React, { useState } from 'react';
import { X, Upload, Check, FileText, Image as ImageIcon } from 'lucide-react';

interface AdminUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string; // e.g., "Research Case", "Trend Report", "Lab Material"
}

const AdminUploadModal: React.FC<AdminUploadModalProps> = ({ isOpen, onClose, title, category }) => {
  const [file, setFile] = useState<File | null>(null);
  const [docTitle, setDocTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !docTitle) return;

    setIsUploading(true);
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
        setDocTitle('');
        onClose();
        alert(`${category} 업로드가 완료되었습니다. (Simulation)`);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">관리자 권한으로 새로운 자료를 등록합니다.</p>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
              <Check size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">업로드 완료!</h4>
            <p className="text-gray-500 text-sm">자료가 성공적으로 등록되었습니다.</p>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">제목</label>
              <input 
                type="text" 
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-sm"
                placeholder={`${category} 제목 입력`}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">파일 선택</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors relative">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {file ? (
                  <div className="flex items-center gap-2 text-teal-600 font-medium">
                    <FileText size={20} />
                    <span className="truncate max-w-[200px]">{file.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500">클릭하거나 파일을 드래그하세요</p>
                    <p className="text-[10px] text-gray-400 mt-1">PDF, JPG, PNG (Max 10MB)</p>
                  </>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isUploading || !file || !docTitle}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isUploading ? '업로드 중...' : '등록하기'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminUploadModal;