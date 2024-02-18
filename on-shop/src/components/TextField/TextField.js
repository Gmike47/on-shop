import React from 'react';
import { useField } from 'formik';
import MUITextField from '@material-ui/core/TextField';

const TextField = (props) => {
    const { name, ...rest } = props;
    const [ field, { error } ] = useField({ name, type: name });

    return (
        <MUITextField
        {...field}
        {...rest}
        error={!!error}
        helpertext={error}
        variant='outlined'
        />
    );
}

export default TextField;