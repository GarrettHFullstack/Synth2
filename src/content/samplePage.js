import react, {useState, useEffect} from "react"

const Page = () => {
    const [info, useInfo] = useState()

    useEffect(() => {
        async function postHandler() {
            
            try{
                const response = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts")
                const transData = await response.json()
                useInfo(transData.data.posts)
            }catch(error){
                console.log(error)
            }
        }
        postHandler()
    },[])


    return(
        <div>
            {info && info.length ? info.map((event)=> {
                return(
                    <div> 
                        <div>{event.description}</div>
                        <div>{event.title}</div>
                        <div>{event.author.username}</div>
                    
                    
                    </div>

                )
            }): null}
        </div>
    )
}

export default Page


