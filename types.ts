import React from 'react';

export interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  brand: TVBrand;
  issue: string;
}

export enum TVBrand {
  SONY = 'Sony',
  LG = 'LG',
  SAMSUNG = 'Samsung',
  OTHER = 'Other'
}

export interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';