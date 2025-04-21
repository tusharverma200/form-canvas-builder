
import React, { createContext, useContext, useState, useCallback } from 'react';
import { FormData, FormField, FormBuilderMode, FormTheme } from '@/types/form-builder';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

const defaultTheme: FormTheme = {
  primaryColor: '#6750A4',
  secondaryColor: '#00A3A1',
  backgroundColor: '#F8FAFC',
  textColor: '#1E293B',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  borderRadius: '8px',
  spacing: '16px',
};

const defaultForm: FormData = {
  id: uuidv4(),
  title: 'Untitled Form',
  description: 'This is a sample form. Start adding fields!',
  fields: [],
  submitText: 'Submit',
  theme: defaultTheme,
};

type FormBuilderContextType = {
  form: FormData;
  mode: FormBuilderMode;
  setMode: (mode: FormBuilderMode) => void;
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
  addField: (field: Omit<FormField, 'id'>) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  updateFormSettings: (updates: Partial<Omit<FormData, 'id' | 'fields'>>) => void;
  updateTheme: (updates: Partial<FormTheme>) => void;
  resetForm: () => void;
};

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [mode, setMode] = useState<FormBuilderMode>('edit');
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const addField = useCallback((field: Omit<FormField, 'id'>) => {
    const newField = { ...field, id: uuidv4() };
    setForm((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
    setSelectedFieldId(newField.id);
    toast.success(`Added ${field.type} field`);
  }, []);

  const updateField = useCallback((id: string, updates: Partial<FormField>) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      ),
    }));
  }, []);

  const removeField = useCallback((id: string) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== id),
    }));
    setSelectedFieldId(null);
    toast.success('Field removed');
  }, []);

  const moveField = useCallback((fromIndex: number, toIndex: number) => {
    setForm((prev) => {
      const newFields = [...prev.fields];
      const [movedField] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, movedField);
      return { ...prev, fields: newFields };
    });
  }, []);

  const updateFormSettings = useCallback((updates: Partial<Omit<FormData, 'id' | 'fields'>>) => {
    setForm((prev) => ({
      ...prev,
      ...updates,
    }));
    toast.success('Form settings updated');
  }, []);

  const updateTheme = useCallback((updates: Partial<FormTheme>) => {
    setForm((prev) => ({
      ...prev,
      theme: { ...prev.theme!, ...updates },
    }));
    toast.success('Theme updated');
  }, []);

  const resetForm = useCallback(() => {
    setForm(defaultForm);
    setSelectedFieldId(null);
    toast.success('Form reset to default');
  }, []);

  return (
    <FormBuilderContext.Provider
      value={{
        form,
        mode,
        setMode,
        selectedFieldId,
        setSelectedFieldId,
        addField,
        updateField,
        removeField,
        moveField,
        updateFormSettings,
        updateTheme,
        resetForm,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (context === undefined) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};
