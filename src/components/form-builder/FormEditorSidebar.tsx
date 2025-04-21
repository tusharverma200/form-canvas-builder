
import React from 'react';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import FormFieldOption from './FormFieldOption';
import FormFieldProperties from './FormFieldProperties';
import { Card, CardContent, CardHeader, CardTitle, Input, Textarea, Label } from '@/components/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FormEditorSidebar: React.FC = () => {
  const { form, updateFormSettings, selectedFieldId } = useFormBuilder();

  const formFields = [
    { type: 'text', label: 'Text' },
    { type: 'textarea', label: 'Textarea' },
    { type: 'number', label: 'Number' },
    { type: 'email', label: 'Email' },
    { type: 'password', label: 'Password' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'radio', label: 'Radio' },
    { type: 'select', label: 'Dropdown' },
    { type: 'date', label: 'Date' },
    { type: 'time', label: 'Time' },
    { type: 'file', label: 'File Upload' },
    { type: 'heading', label: 'Heading' },
    { type: 'paragraph', label: 'Paragraph' },
  ] as const;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormSettings({ title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormSettings({ description: e.target.value });
  };

  const handleSubmitTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormSettings({ submitText: e.target.value });
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <Tabs defaultValue={selectedFieldId ? 'properties' : 'form'} className="space-y-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="form">Fields</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Enter form title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="form-description">Form Description</Label>
                <Textarea
                  id="form-description"
                  value={form.description || ''}
                  onChange={handleDescriptionChange}
                  placeholder="Enter form description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="submit-text">Submit Button Text</Label>
                <Input
                  id="submit-text"
                  value={form.submitText || 'Submit'}
                  onChange={handleSubmitTextChange}
                  placeholder="Submit"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {formFields.map((field) => (
                <FormFieldOption
                  key={field.type}
                  type={field.type}
                  label={field.label}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties">
          <FormFieldProperties />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormEditorSidebar;
