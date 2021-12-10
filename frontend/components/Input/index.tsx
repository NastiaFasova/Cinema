import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Theme,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SxProps } from '@mui/system';
import { ChangeEvent, FC } from 'react';

type FieldType = 'input' | 'date' | 'textArea' | 'checkbox';

export type InputProps = {
  formik: any;
  name: string;
  id?: string;
  label: string;
  autoFocus?: boolean;
  type?: 'text' | 'checkbox' | 'date' | 'file' | 'password';
  fieldType?: FieldType;
  maxRows?: number;
  rows?: number;
  fullWidth?: boolean;
  accept?: string;
  wrapperStyles?: SxProps<Theme>;
  inputStyles?: SxProps<Theme>;
  value?: string;
  customOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const checkForInputErrors = (formik: any, name: string) => {
  let errors = formik.errors[name];
  if (typeof errors === 'object') {
    errors = Object.values(errors).join(', ');
  }
  return formik.touched[name] && errors ? errors : null;
};

const Input: FC<InputProps> = ({
  formik,
  name,
  id,
  label,
  autoFocus = false,
  type = 'text',
  fieldType = 'input',
  rows = 5,
  fullWidth = false,
  accept,
  wrapperStyles,
  inputStyles,
  customOnChange,
  disabled,
  value = '',
}) => {
  const baseFields = {
    type,
    disabled,
    autoFocus,
    error: !!formik.errors[name] && !!formik.touched[name],
    id: id || name,
    label,
    name,
    onChange: customOnChange || formik.handleChange,
    onBlur: formik.handleBlur,
    value: type === 'file' ? undefined : formik.values[name] ?? value,
    helperText: checkForInputErrors(formik, name),
    fullWidth,
    accept,
    sx: inputStyles,
  };

  function fieldBaseOnType(fType: FieldType) {
    switch (fType) {
      case 'checkbox':
        return (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values[name]}
                  value={formik.values[name]}
                  id={id || name}
                  name={name}
                  onChange={customOnChange || formik.handleChange}
                  onBlur={formik.handleBlur}
                  color="primary"
                />
              }
              label={label}
            />
            <span style={{ color: 'red', fontSize: 13 }}>
              {checkForInputErrors(formik, name)}
            </span>
          </>
        );
      case 'date':
        return <TextField {...baseFields} />;
      case 'textArea':
        return <TextField {...baseFields} multiline rows={rows} />;
      default:
        return <TextField {...baseFields} />;
    }
  }
  return (
    <Box width="100%" sx={wrapperStyles}>
      {fieldBaseOnType(fieldType)}
    </Box>
  );
};

export default Input;
