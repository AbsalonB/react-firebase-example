import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const Login = () => {
    // const [email,setEmail] = useState("");
    // const [password, setPassowrd] = useState("");
    const navigate = useNavigate();
    const {user} = useUserContext();
    useEffect(()=>{
        if(user){
            navigate('/dashboard');
        }
    },[user]); 

    const onSubmit = async ({email,password},{setSubmitting, setErrors, resetForm}) =>{
        //e.preventDefault();
        try {
           const credentialUser = await login({email,password});
           console.log(credentialUser);
            
        } catch (error) { 
            console.log(error);
            if(error.code ==="auth/user-not-found"){
                return setErrors({email:"Usuario no registrado"});
            }
            if(error.code =="auth/wrong-password"){
                return setErrors({password:"Contrasena incorrecta"});
            }
        } finally{
            setSubmitting(false); 
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email no válido").required("Email requerido"),
        password : Yup.string().min(6, "Mínimo 6 carácteres").required("Password requerido")
    })

    return (
        <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", textAlign: "center" }}>
            <Avatar sx={{ mx: "auto", bgcolor: "#444" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography
                component="h1"
                variant="h5"
            >
                Login
            </Typography> 
            <Formik
                initialValues={{email:"", password:""}}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({values,
                         handleSubmit, 
                         handleChange, 
                         errors, 
                         touched, 
                         handleBlur,
                         isSubmitting,
                        })=>(
                        <Box onSubmit={handleSubmit} 
                        sx={{mt:1}}
                        component="form"
                        >
                            <TextField
                            type="text" 
                            placeholder="Ingrese email" 
                            value={values.email} 
                            onChange={handleChange} 
                            name="email"
                            onBlur={handleBlur}
                            id="email"
                            label="Ingrese Email"
                            fullWidth
                            sx={{mb:3}}
                            error={errors.email && touched.email}
                            helperText={errors.email && touched.email && errors.email}
                            />
                            {/* <input type="text" 
                            placeholder="Ingrese email" 
                            value={values.email} 
                            onChange={handleChange} 
                            name="email"
                            onBlur={handleBlur}
                            />
                            {
                                errors.email && touched.email && errors.email
                            } */}
                            <TextField
                                type="password" 
                                placeholder="Ingrese la contraseña" 
                                value={values.password} 
                                onChange={handleChange} 
                                name="password"
                                onBlur={handleBlur}
                                id="password"
                                label="Ingrese la contraseña"
                                fullWidth
                                sx={{mb:3}}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password && errors.password}
                            />
                            {/* <input type="password" 
                            placeholder="Ingrese correo" 
                            value={values.password} 
                            onChange={handleChange} 
                            name="password"
                            onBlur={handleBlur}
                            />
                            {
                                errors.password && touched.password && errors.password
                            } */}
                             <LoadingButton
                                type="submit"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                variant="contained"
                                fullWidth
                                sx={{ mb: 3 }}
                                >
                                Login
                            </LoadingButton>

                            <Button
                            component={Link}
                            to="/register"
                            fullWidth
                            >
                             ¿No tienes cuenta? Regístrate
                            </Button>
                        </Box>
                    )
                }
            </Formik>
           
            <Link to="register">Create user</Link>
        </Box>
    )
};

export default Login;
