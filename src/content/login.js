import react, { useState, useEffect } from "react"
import { useOutletContext, useNavigate , Link} from "react-router-dom";
 const Password = () => {
    const [username,setUsername] = useState();
    const [password, setPassword] = useState();
    const outletdata = useOutletContext()
    const navigate = useNavigate()
     async function loginHandlerOne(event){
        event.preventDefault()
        try{
            const response = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                }, body : JSON.stringify({
                    user: {
                        username : username,
                        password : password
                    }   
                })
            })
            const translated = await response.json()
            console.log(translated)
            if(translated.success == true){
                outletdata[2]()
                localStorage.setItem("token", translated.data.token)
            } else {
                alert("try again")
            }
        } catch (error){
            console.log(error)
        }
        navigate("../")

    }
    const setUsernameType = (event) => {
        setUsername(event.target.value)
    }
    const setPasswordType = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div class = "Inputcontainer">
            <form  class = "Inputcontainer2" onSubmit={loginHandlerOne}>
            <div className = "InputOut">Log in</div>
            <div className = "InputOut"><div className = "InputIn"> Use your username</div>
                <input className = "InputIn" type = "text" value={username} onChange = {setUsernameType}></input></div>
                <div className = "InputOut"><div className = "InputIn"> Use your username</div>
                <input className = "InputIn" type = "text" value= {password} onChange = {setPasswordType}></input></div>
                <button className = "navBartxt lessPadding"  type = "submit">Submit</button>
            </form>
            <Link className = "InputOut noBorder"to = "../AllForSale">Click here to go to All posts</Link>
        </div>
    )
 }

 export default Password