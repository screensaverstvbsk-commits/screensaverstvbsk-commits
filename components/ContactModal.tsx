'use client';

import React from 'react';
import { Phone, FileText, X } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToForm: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onScrollToForm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">Contact Screen Savers</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Option 1: Call */}
            <a 
              href={`tel:${CONTACT_INFO.PHONE}`}
              className="flex items-center justify-center w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-blue-200 group"
            >
              <Phone className="mr-3 h-6 w-6 animate-pulse" />
              Call Now
            </a>
            
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">OR</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Option 2: Form */}
            <button 
              onClick={() => {
                onClose();
                onScrollToForm();
              }}
              className="flex items-center justify-center w-full p-4 bg-slate-50 border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl font-semibold text-lg transition-all"
            >
              <FileText className="mr-3 h-6 w-6" />
              Fill Enquiry Form
            </button>
          </div>
          
          <div className="mt-6 bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-sm text-blue-800 font-medium">
               Bangalore Only • Doorstep Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};