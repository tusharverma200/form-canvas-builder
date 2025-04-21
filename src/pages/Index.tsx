
import React from 'react';
import { FormBuilderProvider } from '@/contexts/FormBuilderContext';
import FormBuilder from '@/components/form-builder/FormBuilder';

const Index: React.FC = () => {
  return (
    <FormBuilderProvider>
      <FormBuilder />
    </FormBuilderProvider>
  );
};

export default Index;
