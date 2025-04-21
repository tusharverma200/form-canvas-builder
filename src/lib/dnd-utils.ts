
import { FieldType, FormField } from "@/types/form-builder";
import { v4 as uuidv4 } from "uuid";

// Field templates for each field type
export const getDefaultFieldByType = (type: FieldType): Omit<FormField, "id"> => {
  const baseField = {
    type,
    label: `${type.charAt(0).toUpperCase() + type.slice(1)} field`,
    required: false,
  };

  switch (type) {
    case "text":
      return {
        ...baseField,
        placeholder: "Enter text here",
        validation: [
          {
            type: "required",
            message: "This field is required",
          },
        ],
      };
    case "textarea":
      return {
        ...baseField,
        placeholder: "Enter long text here",
      };
    case "number":
      return {
        ...baseField,
        placeholder: "Enter a number",
        validation: [
          {
            type: "required",
            message: "This field is required",
          },
        ],
      };
    case "email":
      return {
        ...baseField,
        placeholder: "Enter your email",
        validation: [
          {
            type: "required",
            message: "Email is required",
          },
          {
            type: "email",
            message: "Please enter a valid email address",
          },
        ],
      };
    case "password":
      return {
        ...baseField,
        placeholder: "Enter password",
        validation: [
          {
            type: "required",
            message: "Password is required",
          },
          {
            type: "minLength",
            value: 8,
            message: "Password must be at least 8 characters",
          },
        ],
      };
    case "checkbox":
      return {
        ...baseField,
        options: [
          { id: uuidv4(), label: "Option 1", value: "option1" },
          { id: uuidv4(), label: "Option 2", value: "option2" },
          { id: uuidv4(), label: "Option 3", value: "option3" },
        ],
      };
    case "radio":
      return {
        ...baseField,
        options: [
          { id: uuidv4(), label: "Option 1", value: "option1" },
          { id: uuidv4(), label: "Option 2", value: "option2" },
          { id: uuidv4(), label: "Option 3", value: "option3" },
        ],
      };
    case "select":
      return {
        ...baseField,
        placeholder: "Select an option",
        options: [
          { id: uuidv4(), label: "Option 1", value: "option1" },
          { id: uuidv4(), label: "Option 2", value: "option2" },
          { id: uuidv4(), label: "Option 3", value: "option3" },
        ],
      };
    case "date":
      return {
        ...baseField,
        placeholder: "Select a date",
      };
    case "time":
      return {
        ...baseField,
        placeholder: "Select a time",
      };
    case "file":
      return {
        ...baseField,
        placeholder: "Upload a file",
      };
    case "heading":
      return {
        ...baseField,
        label: "Heading",
      };
    case "paragraph":
      return {
        ...baseField,
        label: "Paragraph",
        description:
          "This is a paragraph field. You can use it to add descriptive text to your form.",
      };
    default:
      return baseField;
  }
};

// Item types for drag and drop
export const ItemTypes = {
  FIELD: "field",
  FIELD_OPTION: "fieldOption",
};
