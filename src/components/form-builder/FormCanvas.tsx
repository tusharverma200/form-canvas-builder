
import React from 'react';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import FormFieldRenderer from './FormFieldRenderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const FormCanvas: React.FC = () => {
  const { form, mode } = useFormBuilder();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would validate and submit the form data
    if (mode === 'preview') {
      toast.success('Form submitted successfully!');
    }
  };

  const formStyle = form.theme ? {
    backgroundColor: form.theme.backgroundColor,
    color: form.theme.textColor,
    fontFamily: form.theme.fontFamily,
    fontSize: form.theme.fontSize,
    '--form-spacing': form.theme.spacing,
    '--form-border-radius': form.theme.borderRadius,
    '--form-primary-color': form.theme.primaryColor,
    '--form-secondary-color': form.theme.secondaryColor,
  } as React.CSSProperties : {};

  const buttonStyle = form.theme ? {
    backgroundColor: form.theme.primaryColor,
    color: '#fff',
    borderRadius: form.theme.borderRadius,
  } : {};

  return (
    <div className="form-builder-canvas" style={formStyle}>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
          {form.description && (
            <p className="text-muted-foreground">{form.description}</p>
          )}
        </div>

        {form.fields.length === 0 ? (
          <Card className="p-8 text-center border-dashed border-2">
            <p className="text-muted-foreground mb-4">Your form is empty! Add some fields from the left panel.</p>
          </Card>
        ) : (
          <div 
            className="space-y-4" 
            style={{ 
              gap: 'var(--form-spacing, 16px)',
            }}
          >
            {form.fields.map((field, index) => (
              <FormFieldRenderer 
                key={field.id} 
                field={field} 
                index={index} 
                isPreview={mode === 'preview'}
              />
            ))}
          </div>
        )}

        {mode === 'preview' && form.fields.length > 0 && (
          <div className="mt-6">
            <Button 
              type="submit" 
              className={cn(
                "w-full md:w-auto px-8",
              )}
              style={buttonStyle}
            >
              {form.submitText || 'Submit'}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormCanvas;
