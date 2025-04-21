
import React from 'react';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Input,
  Textarea,
  Switch,
  Button,
  Label,
  Separator
} from '@/components/ui';
import { Trash } from 'lucide-react';

const FormFieldProperties: React.FC = () => {
  const { form, selectedFieldId, updateField, removeField } = useFormBuilder();
  
  const selectedField = form.fields.find(field => field.id === selectedFieldId);
  
  if (!selectedField) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Field Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">Select a field to edit its properties</p>
        </CardContent>
      </Card>
    );
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(selectedField.id, { label: e.target.value });
  };

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(selectedField.id, { placeholder: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateField(selectedField.id, { description: e.target.value });
  };

  const handleRequiredChange = (checked: boolean) => {
    updateField(selectedField.id, { required: checked });
  };

  const handleOptionLabelChange = (optionId: string, value: string) => {
    if (!selectedField.options) return;
    
    const updatedOptions = selectedField.options.map(option => 
      option.id === optionId ? { ...option, label: value } : option
    );
    
    updateField(selectedField.id, { options: updatedOptions });
  };

  const handleOptionValueChange = (optionId: string, value: string) => {
    if (!selectedField.options) return;
    
    const updatedOptions = selectedField.options.map(option => 
      option.id === optionId ? { ...option, value } : option
    );
    
    updateField(selectedField.id, { options: updatedOptions });
  };

  const addOption = () => {
    if (!selectedField.options) return;
    
    const newOption = {
      id: `option-${Date.now()}`,
      label: `Option ${selectedField.options.length + 1}`,
      value: `option${selectedField.options.length + 1}`
    };
    
    updateField(selectedField.id, { 
      options: [...selectedField.options, newOption] 
    });
  };

  const removeOption = (optionId: string) => {
    if (!selectedField.options) return;
    
    const updatedOptions = selectedField.options.filter(option => option.id !== optionId);
    
    updateField(selectedField.id, { options: updatedOptions });
  };

  const handleDeleteField = () => {
    removeField(selectedField.id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Field Properties</span>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleDeleteField}
          >
            <Trash className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic field properties */}
        <div className="space-y-2">
          <Label htmlFor="field-label">Label</Label>
          <Input
            id="field-label"
            value={selectedField.label}
            onChange={handleLabelChange}
          />
        </div>

        {/* Field type specific properties */}
        {['text', 'textarea', 'email', 'password', 'number', 'date', 'time', 'select'].includes(selectedField.type) && (
          <div className="space-y-2">
            <Label htmlFor="field-placeholder">Placeholder</Label>
            <Input
              id="field-placeholder"
              value={selectedField.placeholder || ''}
              onChange={handlePlaceholderChange}
            />
          </div>
        )}

        {/* Description field */}
        <div className="space-y-2">
          <Label htmlFor="field-description">Description</Label>
          <Textarea
            id="field-description"
            value={selectedField.description || ''}
            onChange={handleDescriptionChange}
            placeholder="Add a description for this field"
          />
        </div>

        {/* Required toggle */}
        {!['heading', 'paragraph'].includes(selectedField.type) && (
          <div className="flex items-center justify-between">
            <Label htmlFor="field-required">Required</Label>
            <Switch
              id="field-required"
              checked={selectedField.required || false}
              onCheckedChange={handleRequiredChange}
            />
          </div>
        )}

        {/* Options for checkbox, radio, and select fields */}
        {['checkbox', 'radio', 'select'].includes(selectedField.type) && selectedField.options && (
          <div className="space-y-3">
            <Separator />
            <div className="flex items-center justify-between">
              <Label>Options</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addOption}
              >
                Add Option
              </Button>
            </div>
            
            <div className="space-y-2">
              {selectedField.options.map(option => (
                <div key={option.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <Input
                    value={option.label}
                    onChange={(e) => handleOptionLabelChange(option.id, e.target.value)}
                    placeholder="Label"
                  />
                  <Input
                    value={option.value}
                    onChange={(e) => handleOptionValueChange(option.id, e.target.value)}
                    placeholder="Value"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeOption(option.id)}
                    disabled={selectedField.options!.length <= 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormFieldProperties;
