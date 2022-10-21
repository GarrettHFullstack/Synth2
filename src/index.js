import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import ErrorPage from "./content/errorPage"
import Navbar from "./content/Navbar"
import AllForSale from "./content/AllForSale"
import Homepage from "./content/homepage"
import Post from "./content/Post"
import Register from "./content/RegisterForm"
import Login from "./content/login"
import NewPost from "./content/NewPost"
import AccountInfo from "./content/AccountInfo"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        errorElement: <ErrorPage />,
        children:  [
            {
            index: true,
            element: < Homepage/>
            },
            {
                path: "AllForSale",
                element: <AllForSale/>
            },
            {
                path: "homepage",
                element: <Homepage/>
            },
            {
                path: "AllForSale/:id",
                element: <Post/>
            }
            ,
            {
                path: "Register",
                element: <Register />
            },
            {
                path: "Login",
                element: <Login />
            },
            {
                path: "NewPost",
                element: <NewPost />
            },
            {
                path: "AccountInfo",
                element: <AccountInfo />
            }
        ] 
    }
    
])


ReactDOM.render(<RouterProvider router = {router}/>, document.getElementById("app"))






