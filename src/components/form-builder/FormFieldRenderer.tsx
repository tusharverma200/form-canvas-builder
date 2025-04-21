
import React from 'react';
import { FormField } from '@/types/form-builder';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { 
  Input, 
  Textarea, 
  Checkbox, 
  RadioGroup, 
  RadioGroupItem, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldRendererProps {
  field: FormField;
  index: number;
  isPreview?: boolean;
}

const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({ 
  field, 
  index, 
  isPreview = false 
}) => {
  const { selectedFieldId, setSelectedFieldId, mode } = useFormBuilder();
  const isSelected = selectedFieldId === field.id && mode === 'edit';

  const handleFieldClick = () => {
    if (mode === 'edit' && !isPreview) {
      setSelectedFieldId(field.id);
    }
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <Input 
            type={field.type} 
            id={field.id} 
            placeholder={field.placeholder} 
            className={field.className}
            disabled={mode === 'edit' && !isPreview}
          />
        );
      case 'textarea':
        return (
          <Textarea 
            id={field.id} 
            placeholder={field.placeholder} 
            className={field.className}
            disabled={mode === 'edit' && !isPreview}
          />
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={option.id} 
                  disabled={mode === 'edit' && !isPreview}
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        );
      case 'radio':
        return (
          <RadioGroup disabled={mode === 'edit' && !isPreview}>
            {field.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'select':
        return (
          <Select disabled={mode === 'edit' && !isPreview}>
            <SelectTrigger className={field.className}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'date':
      case 'time':
        return (
          <Input 
            type={field.type} 
            id={field.id} 
            placeholder={field.placeholder} 
            className={field.className}
            disabled={mode === 'edit' && !isPreview}
          />
        );
      case 'file':
        return (
          <Input 
            type="file" 
            id={field.id} 
            className={field.className}
            disabled={mode === 'edit' && !isPreview}
          />
        );
      case 'heading':
        return <h2 className="text-xl font-bold">{field.label}</h2>;
      case 'paragraph':
        return <p className="text-muted-foreground">{field.description}</p>;
      default:
        return null;
    }
  };

  // Don't render label for heading and paragraph fields
  const showLabel = !['heading', 'paragraph'].includes(field.type);

  return (
    <div 
      className={cn(
        "form-field", 
        isSelected && "form-field-selected",
        mode === 'edit' && !isPreview && "form-field-draggable"
      )}
      onClick={handleFieldClick}
      data-field-id={field.id}
      data-field-index={index}
    >
      {showLabel && (
        <div className="mb-2">
          <Label htmlFor={field.id} className="flex items-center">
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {field.description && (
            <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
          )}
        </div>
      )}
      {renderField()}
    </div>
  );
};

export default FormFieldRenderer;
