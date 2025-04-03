import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isChekingAuthenticating = useMemo(() => status === 'checking', [status]);  

  const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
  }

 const { displayName , email, password, onInputChange, displayNameValid, emailValid, passwordValid,isFormValid,formState } = useForm({
    email:'',
    password:'',
    displayName:''
  }, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if ( !isFormValid ) return; 
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form
        className = 'animate__animated animate__fadeIn animate__faster'
      >
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name='displayName'
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name = 'email'
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}  
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid 
                item 
                xs={ 12 }
                display = { !!errorMessage ? '' : 'none' }
              >
                <Alert severity='error'>
                  {errorMessage}
                </Alert>
              </Grid>

              <Grid item xs={ 12 }>
                <Button 
                  disabled={ isChekingAuthenticating }
                  variant='contained' 
                  fullWidth type='submit' 
                  onClick={onSubmit}
                >
                  Crear cuenta
                </Button>
              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}
