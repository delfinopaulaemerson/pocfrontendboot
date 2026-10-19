import React,{ useState, useEffect, use } from "react";
import { customerById, producer, save, updateCustomer } from "../service/CustomerService";
import { Customer } from "../model/Customer";
import { data, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProducerComponent(){
    
    const navigate = useNavigate();
    const { id }  = useParams();
    const [formData, setFormData] = useState({
           id: "",
           nome: "",
           email: "",
           papel: "",
       });
   
       const handleChange = (e) => {
       const { name, value } = e.target;
       
       setFormData((prevData) => ({
           ...prevData,
           [name]: value // Atualiza dinamicamente 'id', 'nome', 'email' ou 'papel'
       }));
   };
   
       const handleSubmit = (e) => {
            e.preventDefault();
            producer(formData);
            navigate("/app");
       }
   
       return (
       <form className="customer-page" onSubmit={handleSubmit}>
         <h2>Kafka Producer</h2>
         <div id="content">
         <div className="customer-fields">
         <div className="customer-field">
           <label>ID:</label>
           <input
             type="text"
             name="id"
             value={formData.id}
             onChange={handleChange}
           />
         </div>
   
         <div className="customer-field">
           <label>Nome:</label>
           <input
             type="text"
             name="nome"
             value={formData.nome}
             onChange={handleChange}
           />
         </div>
         <div className="customer-field">
           <label>E-mail:</label>
           <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
           />
         </div>
         <div className="customer-field">
           <label>Papel:</label>
           <input
             type="text"
             name="papel"
             value={formData.papel}
             onChange={handleChange}
           />
         </div>
         </div>
         </div>
         <button id="salvaralteracoes" type="submit">Kafka Producer</button>
       </form>
     );

}