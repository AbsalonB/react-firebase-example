import { Link } from "react-router-dom";
import { register } from "../config/firebase";
import { useState } from "react"; 
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../context/UserContext";

const Register = () => {
    const [email,setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const {user} = useUserContext()
    useRedirectActiveUser(user,'/dashboard');

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
           const credentialUser = await register({email,password});
           console.log(credentialUser);
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1>Create user</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="Ingrese email" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" 
                placeholder="Ingrese correo" 
                value={password} 
                onChange={(e)=>setPassowrd(e.target.value)} />
                <button type="submit">Registrar</button>
            </form>
            <Link to="/">Return home</Link>
        </>
    );
};

export default Register;
