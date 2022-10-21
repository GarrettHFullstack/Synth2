import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {useOutletContext} from "react-router-dom"
const AllForSale = () => {
    const outletinfo = useOutletContext();
    const information = outletinfo[0]
    return (
        <div class = "allContainer">
        {information && information.length ? information.map((AllForSale, index)=> {
            return <div Class = "infoContainer" key = {index}> 
            {<div class = "title">{AllForSale.title} </div>}
            {<div class = "user">Sold By: {AllForSale.author.username} </div>}
            {<div class = "price">Price: {AllForSale.price} </div>}
            {<div class = "desc">Product Description: {AllForSale.description} </div>}
            <div class = "nextPostOut"><Link class = "nextPost"to = {`/AllForSale/${index}`}>Go to {AllForSale.title} </Link></div>
            </div>
        } ) : "NONE"} 
        </div>
    )
}
export default AllForSale