
import React from 'react';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import FormEditorSidebar from './FormEditorSidebar';
import FormCanvas from './FormCanvas';
import FormThemeCustomizer from './FormThemeCustomizer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Edit, Eye, PaintBucket } from 'lucide-react';

const FormBuilder: React.FC = () => {
  const { mode, setMode, resetForm } = useFormBuilder();

  return (
    <div className="flex flex-col h-screen">
      <header className="py-4 px-6 border-b flex items-center justify-between bg-white">
        <h1 className="text-xl font-bold">Form Canvas Builder</h1>
        <div className="flex items-center gap-4">
          <Tabs value={mode} onValueChange={(value) => setMode(value as any)}>
            <TabsList>
              <TabsTrigger value="edit" className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="theme" className="flex items-center gap-1">
                <PaintBucket className="h-4 w-4" />
                Theme
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Separator orientation="vertical" className="h-6" />
          
          <Button variant="outline" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden grid" style={{ gridTemplateColumns: '350px 1fr' }}>
        {mode === 'theme' ? (
          <>
            <div className="border-r overflow-auto">
              <FormThemeCustomizer />
            </div>
            <div className="overflow-auto p-6 bg-muted/30">
              <FormCanvas />
            </div>
          </>
        ) : (
          <>
            {mode === 'edit' && (
              <div className="border-r overflow-auto">
                <FormEditorSidebar />
              </div>
            )}
            <div 
              className={`overflow-auto p-6 bg-muted/30 ${mode === 'preview' ? 'col-span-2' : ''}`}
            >
              <FormCanvas />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
