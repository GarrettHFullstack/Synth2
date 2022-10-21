import React, {useRef, useState, useEffect} from "react"
import {useOutletContext, useParams, Link} from "react-router-dom"


const Post = () => {
    const [newMessage, setNewMessage] = useState("")
    const context = useOutletContext()
    const [updateContent, setUpdateContent] = useState()
    const [account,setAccount] = useState();
    const divRef = useRef(null)
    
    useEffect(() => {
    
        async function getData(){
        try{
            const response2 = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const tempt = await response2.json()
            setAccount(tempt.data.messages)
    
        } catch(error){
    
        }
        }
        getData()
        },[])
    const {id} = useParams()
    
    const postDetails = context[0][id]
    const postId = postDetails._id
    
    console.log(postId)
    const createNewMessage = (event) => {
        setNewMessage(event.target.value)
        console.log(newMessage)
    }
    
   
    useEffect(()=>{
       if(divRef.current){
        divRef.current.scrollIntoView(
            false,
            {behavior: "smooth", block : "end", inline:"nearest"}

            )
        } else{
            return
        }
    },[account])
    

    async function newMessageSend (event) {
        event.preventDefault()
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${postDetails._id}/messages`, {
            method :"POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }, body : JSON.stringify({
                message: {
                    content: newMessage
                }
            })
        })

        
        const newContextNow = response.json()
        setUpdateContent(newContextNow)
        refresh()
        setNewMessage("")

    }
    async function refresh(){
        try{
            const response2 = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const tempt = await response2.json()
            setAccount(tempt.data.messages)
    
        } catch(error){
    
        }
        }


    console.log(postDetails._id)
    return (
        <div class = "infoContainer">
        {postDetails && postDetails.author.username.length ?  <div Class = "infoContainer" > 
            {<div class = "title">{postDetails.title} </div>}
            {<div class = "user">Sold By: {postDetails.author.username} </div>}
            {<div class = "price">Price: {postDetails.price} </div>}
            {<div class = "desc">Product Description: {postDetails.description} </div>},
            <div class = "nextPostOut"><Link class = "nextPost"to = {`../AllForSale`}>Go back to All For Sale</Link></div>
        
            </div> : "No information" }
            <div class = "infoContainer messenger">
            <div class = "mHeader">Messages {postDetails.author.username}</div>
            <div id = "mMessage">{account ? account.map((event) => { 
                if(event.post._id == postId){
                    return (
                        <div className = "messages">
                            <div >From: {event.fromUser.username}</div>
                            <div ref = {divRef} >{event.content}</div>
                        </div>
                    )}
                
            }) : null}
            </div>
            <form class= "mInput" onSubmit = {newMessageSend}>
            <textarea  value = {newMessage} onChange = {createNewMessage}></textarea>
            <button class= "mInputInside" type = "submit">Send Message</button>
            </form>
            {console.log(updateContent)}
            </div>
        </div>
    )
}

export default Post