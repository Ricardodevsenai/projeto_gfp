import {useNavigate,Link} from "react-router-dom"


function Login (){
    const navigate = useNavigate()
    return(
     <div>
        <h1>tela de login</h1>
        <button onClick={()=> navigate("/principal")}>Entrar</button>
     </div>
    )
}

export default Login;