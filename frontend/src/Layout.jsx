import { Outlet  } from "react-router-dom"; // Outlet uses the Layout.jsx as a base and naye cheezon ko jahan chaho wahan paas karega keeping the rest of the components fixed

export default function Layout(){
    return(
        <>
            <Outlet/> 
        </>
    )
}