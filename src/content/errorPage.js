import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
const ErrorPage = () => {
    return(
        <div class = "bodyError"> 
        <div class = "infoContainer"> <div class = "title">There has been a problem loading your page</div>
        <Link class = "nextPostOut nextPost" to = "/">Click Here to go to Homepage</Link>
        </div>
        </div>
    )
}

export default ErrorPage