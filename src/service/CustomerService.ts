import axios from "axios";
import { Customer } from "../model/Customer";

export const customerAll = async(): Promise<Customer[]> => {
    try{
        const response =  axios.get(`http://localhost:8081/api/customer`);

        return (await response).data;

    }catch(error){
        console.error("Error userLogin users:", error);
        throw error;

    }
 }
 
 export const customerById = async(id:number): Promise<Customer> => {
    try{
        const response =  axios.get(`http://localhost:8081/api/customer/${id}`);

        return (await response).data;

    }catch(error){
        console.error("Error userLogin users:", error);
        throw error;

    }
 }

 export const deleteCustomer = async(id:number): Promise<void> => {
    try{       
        const response =  axios.delete(`http://localhost:8081/api/customer/${id}`);
        console.log("Excluído com sucesso:",(await response).status)
    }catch(error){
        console.error("Error userLogin users:", error);
        throw error;

    }
 }

 export const updateCustomer = async(id:number,customer:Customer): Promise<void> => {
    try{       
        const response =  axios.put(`http://localhost:8081/api/customer/${id}`,customer);
        console.log("Excluído com sucesso:",(await response).status)
    }catch(error){
        console.error("Error userLogin users:", error);
        throw error;

    }
 }

 export const save = async(customer:Customer): Promise<Customer> => {
    try{
        const response =  axios.post(`http://localhost:8081/api/customer`,customer);
        return (await response).data;
    }catch(error){
        console.error("Error userLogin users:", error);
        throw error;
    }
 } 

 export const producer = async(customer:Customer): Promise<Customer> => {
    try{
        const response =  axios.post(`http://localhost:8081/api/customer/producer`,customer);
        return (await response).data;
    }catch(error){
        console.error("Error userLogin users:", error);
        throw error;
    }
}