
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FieldType } from '@/types/form-builder';
import { getDefaultFieldByType } from '@/lib/dnd-utils';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { 
  TextIcon, 
  AlignJustify, 
  Hash, 
  Mail, 
  KeyRound, 
  CheckSquare,
  CircleDot,
  ListFilter,
  Calendar,
  Clock,
  Upload,
  Heading,
  AlignLeft
} from 'lucide-react';

type FormFieldOptionProps = {
  type: FieldType;
  label: string;
};

const getIconByType = (type: FieldType) => {
  switch (type) {
    case 'text':
      return <TextIcon className="h-5 w-5" />;
    case 'textarea':
      return <AlignJustify className="h-5 w-5" />;
    case 'number':
      return <Hash className="h-5 w-5" />;
    case 'email':
      return <Mail className="h-5 w-5" />;
    case 'password':
      return <KeyRound className="h-5 w-5" />;
    case 'checkbox':
      return <CheckSquare className="h-5 w-5" />;
    case 'radio':
      return <CircleDot className="h-5 w-5" />;
    case 'select':
      return <ListFilter className="h-5 w-5" />;
    case 'date':
      return <Calendar className="h-5 w-5" />;
    case 'time':
      return <Clock className="h-5 w-5" />;
    case 'file':
      return <Upload className="h-5 w-5" />;
    case 'heading':
      return <Heading className="h-5 w-5" />;
    case 'paragraph':
      return <AlignLeft className="h-5 w-5" />;
    default:
      return <TextIcon className="h-5 w-5" />;
  }
};

const FormFieldOption: React.FC<FormFieldOptionProps> = ({ type, label }) => {
  const { addField } = useFormBuilder();

  const handleAddField = () => {
    const newField = getDefaultFieldByType(type);
    addField(newField);
  };

  return (
    <Card 
      className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted transition-colors"
      onClick={handleAddField}
    >
      <div className="flex items-center gap-2">
        {getIconByType(type)}
        <span>{label}</span>
      </div>
      <Button size="sm" variant="ghost">
        Add
      </Button>
    </Card>
  );
};

export default FormFieldOption;
