import { IconButton, Stack, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useState } from "react";

const CssTextField = styled(TextField)(
    {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white', // Color por defecto
            },
            '&:hover fieldset': {
                borderColor: 'white', // Color al hacer hover
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
            // Cambiar el color del texto
            '&.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
                color: 'rgba( 255, 255, 255, 0.6 )'
            }
        },
    }
);

export const Searcher = ( { setInputUser } ) => {

    const [valueInput, setValueInput] = useState('');

    const handleSubmit = () => {
        setInputUser( valueInput );
    }

    const onSearchValue = ( event ) => {
        let valorIngresado = event.target.value;
        setValueInput( valorIngresado.toLowerCase() );
    }

    return (
        <Stack 
            direction="row"
            sx={{
                width: '80%',
                marginBottom: '4rem',
            }}
        >
            <CssTextField
                // focused
                size="small"
                placeholder="ditto"
                label="Buscar pokemon"
                id="custom-css-outlined-input"
                value={ valueInput }
                onChange={ onSearchValue }
                sx={{
                    size: 'small',
                    width: '100%',
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={ handleSubmit }>
                            <SearchIcon sx={{ color: 'white' }} />
                        </IconButton>
                    ),
                    style: { color: 'rgba( 255, 255, 255, 0.6 )' }
                }}
                InputLabelProps={{
                    style: { color: 'rgba( 255, 255, 255, 0.6 )' }
                }}
            />
        </Stack>
    )
}
