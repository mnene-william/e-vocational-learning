import React from "react";
import { Link, useLocation} from "react-router-dom"


function Sidebar(){

    const location = useLocation()

    const links = [

        {path:"/admin/dashboard", label:"Dashboard"},
        {path:"/admin/users", label:"Users"},
        {path:"/admin/lessons", label:"Lessons"},
        {path:"/admin/quizzes", label:"Quizzes"},
        {path:"/admin/reviews", label:"Reviews"},
        {path:"/admin/progress", label:"Progress"},

    ]

    return(<>
    
    
    
    </>)


}

export default Sidebar;