
import React from 'react';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Label,
  Slider,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';

const FormThemeCustomizer: React.FC = () => {
  const { form, updateTheme } = useFormBuilder();
  const theme = form.theme!;

  const fontFamilies = [
    { value: 'Inter, sans-serif', label: 'Inter' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: '"Times New Roman", serif', label: 'Times New Roman' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'monospace', label: 'Monospace' },
  ];

  const fontSizes = [
    { value: '12px', label: 'Small (12px)' },
    { value: '14px', label: 'Medium (14px)' },
    { value: '16px', label: 'Default (16px)' },
    { value: '18px', label: 'Large (18px)' },
    { value: '20px', label: 'Extra Large (20px)' },
  ];

  const borderRadiusOptions = [
    { value: '0', label: 'None' },
    { value: '4px', label: 'Small' },
    { value: '8px', label: 'Medium' },
    { value: '12px', label: 'Large' },
    { value: '16px', label: 'Extra Large' },
    { value: '24px', label: 'Rounded' },
  ];

  const spacingOptions = [
    { value: '8px', label: 'Tight' },
    { value: '12px', label: 'Compact' },
    { value: '16px', label: 'Default' },
    { value: '20px', label: 'Comfortable' },
    { value: '24px', label: 'Spacious' },
    { value: '32px', label: 'Very Spacious' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="colors">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography & Spacing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <div 
                  className="w-10 h-10 rounded border"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <Input
                  id="primary-color"
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <div 
                  className="w-10 h-10 rounded border"
                  style={{ backgroundColor: theme.secondaryColor }}
                />
                <Input
                  id="secondary-color"
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background-color">Background Color</Label>
              <div className="flex gap-2">
                <div 
                  className="w-10 h-10 rounded border"
                  style={{ backgroundColor: theme.backgroundColor }}
                />
                <Input
                  id="background-color"
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex gap-2">
                <div 
                  className="w-10 h-10 rounded border"
                  style={{ backgroundColor: theme.textColor }}
                />
                <Input
                  id="text-color"
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => updateTheme({ textColor: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select 
                value={theme.fontFamily} 
                onValueChange={(value) => updateTheme({ fontFamily: value })}
              >
                <SelectTrigger id="font-family">
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem 
                      key={font.value} 
                      value={font.value}
                      style={{ fontFamily: font.value }}
                    >
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Select 
                value={theme.fontSize} 
                onValueChange={(value) => updateTheme({ fontSize: value })}
              >
                <SelectTrigger id="font-size">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="border-radius">Border Radius</Label>
              <Select 
                value={theme.borderRadius} 
                onValueChange={(value) => updateTheme({ borderRadius: value })}
              >
                <SelectTrigger id="border-radius">
                  <SelectValue placeholder="Select border radius" />
                </SelectTrigger>
                <SelectContent>
                  {borderRadiusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="spacing">Field Spacing</Label>
              <Select 
                value={theme.spacing} 
                onValueChange={(value) => updateTheme({ spacing: value })}
              >
                <SelectTrigger id="spacing">
                  <SelectValue placeholder="Select spacing" />
                </SelectTrigger>
                <SelectContent>
                  {spacingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FormThemeCustomizer;
