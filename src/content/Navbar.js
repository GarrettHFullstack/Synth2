import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {Outlet} from "react-router-dom"


const Navbar = () => {
    const [info, setInfo] = useState([])
    const [userId, setUserId] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [showLoginButton, setShowLoginButton] = useState(false)
    useEffect(() => {
        async function getBuyerInfo(){
            try{
                const dataUndef = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts")
                const dataDef = await dataUndef.json()
                setInfo(dataDef.data.posts)
                console.log(dataDef.data.posts)
            }catch (error){
                console.log(error)
            }

        }
        async function checkUser(){
                const temp = localStorage.getItem("token")
                temp == null ? setUserId("Temp") : setUserId(localStorage.getItem("token")) 
        }
        
        checkUser()
        console.log(userId)
        getBuyerInfo()
        if(token != null){
            console.log(token)
            toggleLogin()
        }
    },[])
        function toggleLogin() {
            setShowLoginButton(!showLoginButton)
            console.log("it works")
            
        }
        async function getBuyerInfo(){
            try{
                const dataUndef =  await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts")
                const dataDef =  await dataUndef.json()
                setInfo(dataDef.data.posts)
                console.log("click")
            }catch (error){
                console.log(error)
            }

        }

    return(
        <div class = "body">
        <nav>
            <div class = "first-part">
            <Link class = "navBartxt" to = "Homepage">Homepage</Link>
            <Link class = "navBartxt" onClick = {()=> {getBuyerInfo()}} to = "AllForSale">All For Sale</Link>
            </div>
            <div class = "second-part">
            {showLoginButton == true ? <Link class = "navBartxt" to = "NewPost">New Post</Link> : null}
            {showLoginButton != true ?<Link class = "navBartxt" to = "Login">Log In</Link> : null}
            {showLoginButton != true ? <Link class = "navBartxt" to = "Register">Register</Link> : null }
            {showLoginButton == true ? <Link class = "navBartxt"to = "AccountInfo">Account</Link> : null }
            {showLoginButton == true ? <Link class = "navBartxt"to = "/" onClick = {()=>{
            localStorage.removeItem("token")
            toggleLogin()}
            }> Sign Out</Link> : null}
            </div>

        </nav>
            <div class = "baseContainer">
            <Outlet class = "Outlet" context = {[info,showLoginButton,toggleLogin,setShowLoginButton,info,setInfo]} />
            </div>
        </div>
    )
}

export default Navbar