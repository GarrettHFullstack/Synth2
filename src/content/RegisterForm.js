import React, {useState} from "react"
import {Link, useNavigate, useOutletContext} from "react-router-dom"

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const info = useOutletContext()
    const navigate = useNavigate()
    const [isTrue, setIsTrue] = useState(false)
    async function formSubmitHandler(event){
        event.preventDefault()
        try{
            const response = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
            }, 
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                    }
                })
            })
            const data = await response.json()
            localStorage.setItem("token", data.data.token )

            console.log(data.data.token)
        }catch (error){
            console.log(error)
        }
        info[2](!info[1])
        navigate("../")
    }
    function updateUsernameState(event){
        setUsername(event.target.value)
    }
    function updatePasswordState(event){
        setPassword(event.target.value)
    }
    return (
        <div class = "Inputcontainer">
        {isTrue == false ? <form class = "Inputcontainer2" onSubmit={formSubmitHandler}>
        <div className = "InputOut">Register</div>
        <div className = "InputOut"><label className = "InputIn" >Create a username</label><input className = "InputIn"  value = {username} type = "text" onChange = {updateUsernameState}></input></div>

        <div className = "InputOut"><label className = "InputIn" >Create a password</label><input className = "InputIn"  id = "password" value = {password} type = "text" onChange = {updatePasswordState}></input></div>

            <button className = "navBartxt lessPadding" type = "submit">Submit</button>
        </form> : <div><div>Thank you for signing up {username}</div></div>}
        <Link className = "InputOut noBorder" to = "../" >Click here to return to main site</Link>
        </div>
    )
}

export default RegisterForm