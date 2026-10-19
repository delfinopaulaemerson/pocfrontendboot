import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css'



function NavBar(){
 const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();  

// Lista dinâmica de títulos da navbar
  const navItems = [
    { id: 1, label: "Home",link: "/app" },
    { id: 2, label: "Customers",link: "/app/customer" },
    { id: 3, label: "Upload",link: "/app/customer/upload" },
    { id: 4, label: "Producer",link: "/app/customer/producer" },
    { id: 5, label: "Sair", link: "/" }
  ];  
  
  function navegar(url) {
    navigate(url);
  }
  
   return (
    <header className="main-header">
      <div className="logo">Pocfrontendboot</div>
      
      <nav className="nav-container">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeTab === item.label ? "active" : ""}`}
                onClick={() =>{ setActiveTab(item.label); navigate(item.link)}}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;