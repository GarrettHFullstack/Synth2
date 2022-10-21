import react, {useState, useEffect} from "react"
import {Link, useNavigate, useOutletContext} from "react-router-dom"
const NewPost = () => {
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    const [price,setPrice] = useState("")
    const [isTrue,setISTrue] = useState(false)
    const importOutlet = useOutletContext();
    const navigate = useNavigate();
    async function MakePost(event){
        event.preventDefault()
        try{
            console.log(localStorage.getItem("token"))
            const response = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts",
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }, 
                body : JSON.stringify({
                    post: {
                        title: name,
                        description: desc,
                        price: price
                      }
                    })
                }) 
                const newinfo = await response.json()
                importOutlet[5]([...importOutlet[4],newinfo.data.post])
              } catch(error){
                console.log(error)
                
        }
        navigate("../AllForSale")
    }
    const NameHandler = (event) => {
        setName(event.target.value)
    }
    const DescHandler = (event) => {
        setDesc(event.target.value)
    }
    const PriceHandler = (event) => {
        setPrice(event.target.value)
    }
    

    return(
        <div class = "Inputcontainer">
            {isTrue == false ? <form class = "Inputcontainer2"onSubmit={MakePost}>
            <div className = "InputOut">Post a Product</div>
            <div className = "InputOut"><div className = "InputIn">Product Name</div> <input className = "InputIn"type = "text" value = {name} onChange = {NameHandler}></input></div>
                <div className = "InputOut"><div className = "InputIn">Product Description</div><input className = "InputIn"type = "text" value = {desc} onChange = {DescHandler} ></input></div>
                <div className = "InputOut"><div className = "InputIn">Product Price</div> <input className = "InputIn"type = "text" value = {price} onChange = {PriceHandler}></input></div>
                <button className = "navBartxt lessPadding" type = "submit">Submit New Post</button>
            </form> : null} 
            <Link className = "InputOut noBorder"to = "../AllForSale">Click here to go to All posts</Link>
        </div>
    )
}

export default NewPost