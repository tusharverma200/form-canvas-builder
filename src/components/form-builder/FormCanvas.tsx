
import React from 'react';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import FormFieldRenderer from './FormFieldRenderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Share } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const FormCanvas: React.FC = () => {
  const { form, mode } = useFormBuilder();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'preview') {
      const formData = new FormData(e.target as HTMLFormElement);
      const responses: Record<string, any> = {};
      
      form.fields.forEach(field => {
        responses[field.id] = formData.get(field.id);
      });

      try {
        const { error } = await supabase
          .from('form_responses')
          .insert([{
            formId: form.id,
            responses
          }]);

        if (error) throw error;
        toast.success('Form submitted successfully!');
      } catch (error) {
        toast.error('Error submitting form');
        console.error('Error:', error);
      }
    }
  };

  const handleShare = async () => {
    try {
      const { data, error } = await supabase
        .from('form_shares')
        .insert([{
          formId: form.id,
        }])
        .select()
        .single();

      if (error) throw error;

      const shareUrl = `${window.location.origin}/form/${data.id}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      toast.error('Error generating share link');
      console.error('Error:', error);
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
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
            {form.description && (
              <p className="text-muted-foreground">{form.description}</p>
            )}
          </div>
          {mode === 'edit' && (
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share className="h-4 w-4" />
              Share Form
            </Button>
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
