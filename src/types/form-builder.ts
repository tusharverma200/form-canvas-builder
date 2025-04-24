export type FieldType = 
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'date'
  | 'time'
  | 'file'
  | 'heading'
  | 'paragraph';

export type ValidationRule = {
  type: 'required' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'email';
  value?: string | number | boolean;
  message: string;
};

export type OptionType = {
  id: string;
  label: string;
  value: string;
};

export type FormField = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: OptionType[];
  defaultValue?: string | string[] | boolean | number;
  validation?: ValidationRule[];
  className?: string;
  style?: React.CSSProperties;
};

export type FormResponse = {
  id: string;
  formId: string;
  responses: Record<string, any>;
  createdAt: string;
};

export type FormShare = {
  id: string;
  formId: string;
  createdAt: string;
  expiresAt?: string;
};

export type FormData = {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitText?: string;
  theme?: FormTheme;
};

export type FormTheme = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: string;
  borderRadius: string;
  spacing: string;
};

export type FormBuilderMode = 'edit' | 'preview' | 'theme';

export type DragItem = {
  type: string;
  id: string;
  index: number;
  field: FormField;
};
