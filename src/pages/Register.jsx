import { Form, Link } from "react-router-dom";
import { register } from "../config/firebase";
import { useState } from "react"; 
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../context/UserContext";

import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";

const Register = () => {
    const [email,setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const {user} = useUserContext()
    useRedirectActiveUser(user,'/dashboard');

    const onSubmit = async({email,password},{setSubmitting, setErrors, resetForm}) =>{        
        try {
           const credentialUser = await register({email,password});
           console.log(credentialUser);
            
        } catch (error) {
            console.log(error);
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
                Create user
            </Typography> 
            <Formik
                initialValues={{email:"", password:""}}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({values,
                         handleSubmit, 
                         handleChange, 
                         errors, 
                         touched, 
                         handleBlur,
                         isSubmitting,
                        })=>(
                    <Box onSubmit={handleSubmit} 
                    sx={{mt:1}}
                    component="form">
                        <TextField type="text" 
                        placeholder="Ingrese email" 
                        value={values.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        id="email"
                        label="Ingrese Email"
                        fullWidth
                        sx={{mb:3}}
                        error={errors.email && touched.email}
                        helperText={errors.email && touched.email && errors.email}/>
                        <TextField type="password" 
                        placeholder="Ingrese correo" 
                        value={values.password} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        id="password"
                        label="Ingrese la contraseña"
                        fullWidth
                        sx={{mb:3}}
                        error={errors.password && touched.password}
                        helperText={errors.password && touched.password && errors.password}/>
                        <LoadingButton
                                type="submit"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                variant="contained"
                                fullWidth
                                sx={{ mb: 3 }}
                                >
                                Register
                            </LoadingButton> 
                            <Button
                            component={Link}
                            to="/"
                            fullWidth
                            >
                             ¿Ya tienes cuenta? Ingresa
                            </Button>
                    </Box>
                )}
            </Formik> 
        </Box>
    );
};

export default Register;
