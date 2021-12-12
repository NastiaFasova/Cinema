import React from 'react';
import Select from '@mui/material/Select';
import {
  FormControl,
  InputLabel,
  Box,
  Chip,
  MenuItem,
  Theme,
  useTheme,
} from '@mui/material';
import { checkForInputErrors } from '../Input';
import { SelectType } from '../../types';

export type SelectProps = {
  formik: any;
  id?: string;
  label: string;
  name: string;
  autoFocus?: boolean;
  fullWidth?: boolean;
  keyValuePairArr: SelectType[];
  multiple?: boolean;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  searchData: readonly string[] | string,
  theme: Theme,
) {
  return {
    fontWeight:
      searchData.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CustomSelect: React.FC<SelectProps> = ({
  name,
  id,
  label,
  formik,
  autoFocus,
  fullWidth,
  multiple,
  keyValuePairArr,
}) => {
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          autoFocus={autoFocus}
          multiple={multiple}
          error={!!formik.errors[name] && !!formik.touched[name]}
          id={id || name}
          label={label}
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          fullWidth={fullWidth}
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {Array.isArray(selected)
                ? selected.map((value: string) => (
                  <Chip key={value} label={value} />
                ))
                : selected}
            </Box>
          )}
        >
          {keyValuePairArr.map((item) => (
            <MenuItem
              key={item.key as string}
              value={item.key as string}
              style={getStyles(String(item.value), formik.values[name], theme)}
            >
              {item.value}
            </MenuItem>
          ))}
        </Select>
        <span style={{ color: 'red', fontSize: 13 }}>
          {checkForInputErrors(formik, name)}
        </span>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;