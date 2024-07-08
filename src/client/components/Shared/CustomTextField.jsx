import { useState, useEffect, useMemo, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function CustomTextField(props) {
    const [customState, setCustomState] = useState(props.defaultState);
    const [isError, setIsError] = useState(false);

    const optionalProps = useMemo(() => ({
        ...(props.fieldType != undefined && { type: props.fieldType }),
        ...(props.inputProps != undefined && { inputProps: props.inputProps }),
        ...(props.selectContent != undefined && { select: true, 'data-transaction-name': `${props.fieldLabel}` }),
    }), [props.fieldType, props.inputProps, props.selectContent, props.fieldLabel]);

    const isCustomStateEmpty = useCallback(() => {
        return customState == null || customState === '';
    }, [customState]);

    const updateCustomState = useCallback((event) => {
        let value = event.target.value;
        if (props.required) {
            setIsError(isCustomStateEmpty());
        }
        if (props.fieldType === "number" && value < 1) {
            value = 1;
        }
        setCustomState(value);
    }, [props.required, isCustomStateEmpty, props.fieldType]);

    useEffect(() => {
        if (props.required) {
            setIsError(isCustomStateEmpty());
        }
        props.updateState(customState);
    }, [customState, props, isCustomStateEmpty]);

    return (
        <Stack spacing={0.5} className='custom-form' style={{ display: props.hideField ? 'none' : 'flex' }}>
            <TextField
                id={props.name}
                name={props.name}
                required={props.required}
                multiline={props.multiline}
                rows={props.multiline ? 3 : 1}
                fullWidth
                size="small"
                variant="outlined"
                label={props.fieldLabel}
                value={customState}
                onChange={updateCustomState}
                {...optionalProps}
                error={isError}
                helperText={isError ? `${props.fieldLabel} is required` : ""}
                disabled={props.disabled}
            >
                {props.selectContent ?
                    props.selectContent.map((item) => (
                        <MenuItem key={'select-' + item.value} sx={{ whiteSpace: 'normal' }} data-transaction-name={`${props.fieldLabel}: ${item.text}`} value={item.value}>{item.text}</MenuItem>
                    )) : null
                }
            </TextField>
        </Stack>
    );
}