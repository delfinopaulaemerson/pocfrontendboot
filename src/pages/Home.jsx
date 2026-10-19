import { useState, useEffect, useTransition } from "react";
import edicao from '../assets/editar.jpg';
import exclusao from '../assets/exclusao.jpg';
import { customerAll, deleteCustomer } from "../service/CustomerService";
import { Customer } from "../model/Customer";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home(){

   const [viewMode, setViewMode] = useState('grid');
   const [isPending, startTransition] = useTransition();
   const navigate = useNavigate();
    
   // 1. Estado inicial como array vazio
   const [customers, setCustomers] = useState([]);
   const [loading, setLoading] = useState(true);

   // 2. Consome os dados usando useEffect ao carregar o componente
   useEffect(() => {
     customerAll()
       .then((data) => {
         setCustomers(data);
         setLoading(false);
       })
       .catch((error) => {
         console.error("Erro ao carregar clientes:", error);
         setLoading(false);
       });
   }, []);

   // Estados para controle da paginação
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 5; // Quantidade de clientes por página

   // Cálculos de paginação
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);
   const totalPages = Math.ceil(customers.length / itemsPerPage);

   const handlerExclusao = (id) => {
     startTransition(async () => {
       try {
         // 1. Deleta no servidor
         await deleteCustomer(id);
         
         // 2. Atualiza o estado local removendo o item
         setCustomers(prevCustomers => {
           const updated = prevCustomers.filter(item => item.id !== id);
           
           // Se a página atual ficar vazia após a exclusão (e não for a primeira), volta uma página
           const newTotalPages = Math.ceil(updated.length / itemsPerPage);
           if (currentPage > newTotalPages && newTotalPages > 0) {
             setCurrentPage(newTotalPages);
           }

           return updated;
         });
       } catch (error) {
         console.error("Failed to delete customer:", error);
       }
     });
   };

  const handlerEdicao = (id) => {
     navigate(`/app/customer/edit/${id}`);
  };

  // Funções de navegação da paginação
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Carregando clientes...</div>;
  }

  return (
    <div id="table-container" style={{ opacity: isPending ? 0.6 : 1, transition: 'opacity 0.2s' }}>
      <h2>Customers {isPending && <span style={{ fontSize: '14px', color: '#666' }}>(Deleting...)</span>}</h2>
      
      <table id="table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '20px 50px', borderBottom: '2px solid #ddd' }}>ID</th>
            <th style={{ padding: '20px 50px', borderBottom: '2px solid #ddd' }}>Nome</th>
            <th style={{ padding: '20px 50px', borderBottom: '2px solid #ddd' }}>Email</th>
            <th style={{ padding: '20px 50px', borderBottom: '2px solid #ddd' }}>Papel</th>
            <th style={{ padding: '20px 50px', borderBottom: '2px solid #ddd' }}>Edição</th>
            <th style={{ padding: '20px 50px', borderBottom: '2px solid #ddd' }}>Exclusão</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <tr key={customer.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{customer.id}</td>
                <td style={{ padding: '10px' }}>{customer.nome}</td>
                <td style={{ padding: '10px' }}>{customer.email}</td>
                <td style={{ padding: '10px' }}>{customer.papel}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => handlerEdicao(customer.id)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    <img id="edicao" src={edicao} alt="Editar" />
                  </button>
                </td>
                <td style={{ padding: '10px' }}>
                  <button 
                    disabled={isPending}
                    onClick={() => handlerExclusao(customer.id)}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: isPending ? 'not-allowed' : 'pointer' }}
                  >
                    <img id="exclusao" src={exclusao} alt="Excluir" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                Nenhum cliente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Controles de Paginação */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            style={{ padding: '8px 16px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            Anterior
          </button>
          
          <span style={{ fontSize: '14px', color: '#333' }}>
            Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
          </span>

          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            style={{ padding: '8px 16px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}