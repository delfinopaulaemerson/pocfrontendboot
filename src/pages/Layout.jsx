import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function Layout(){
    return (
        <>
        <NavBar/>
        <main style={{ padding: '1.5rem', flex: 1, display: 'flex' }}>
            <Outlet/>
        </main>
        </>
    );
}