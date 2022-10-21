import React, {useState, useEffect} from "react"
import {useOutletContext} from "react-router-dom"
const AccountInfo = () => {
    const [account,setAccount] = useState();
    const importContext = useOutletContext();
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
        setAccount(tempt.data)

    } catch(error){

    }
    }
    getData()
    },[])
    const [deleteId, setDeleteId] = useState("")
    useEffect(() => {
    async function deleteFromProfile(id){
        try{
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            const response2 = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts")
            const responsetranslate = await response2.json()
            importContext[5]([...responsetranslate.data.posts])
        }catch(error){
            console.log(error)
        }
    }
    deleteFromProfile(deleteId)
    },[deleteId])
    return (
        <div class = "nowhere">
            <div className = "Header">Messages</div>
            {account && account.messages.length ? account.messages.map((users) => {
                return <div class = "infoContainer"> 
                <div class = "title">{console.log(users)}</div>
                <div class = "title">From Product: {users.post.title}</div>
                <div class = "desc">{users.content}</div>
                <div class = "price ">User: {users.fromUser.username}</div>
                </div>
            }) : <div>No Messages Yet</div>
        }   
            <div className = "Header">Posts</div>
            {account && account.posts.length ? account.posts.map((users) => {
                return <div class = "infoContainer"> Posts
                    <div class = "title">{users.title}</div>
                    <div class = "desc">{users.description}</div>
                    <div class = "price ">{users.price}</div>
                    <button onClick = {() => setDeleteId(users._id)}>Delete Post</button>
                    </div>
            }) : <div>"No Posts Yet"</div>
        }
        </div>
    )
}
export default AccountInfo