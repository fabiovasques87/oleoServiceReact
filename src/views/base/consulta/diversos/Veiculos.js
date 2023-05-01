import React, { useEffect, useState } from 'react'
import {PageArea} from './styled';
import {mask} from '../../../../components/CnpjCpf/cpf';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { Tooltip } from 'bootstrap';
import data from '../../../../components/tooltip/tooltip'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem,
    CFormSelect,
    CTooltip,
    CCardGroup
    
  } from '@coreui/react'



const Veiculos = () => {

    //search CPF
    const [cpfSearch, setCpfSearch] = useState({ resultado: [] });

    //para exibir a mensagem de erro de cpf não encontrado...
    const [cpfNotFound, setCpfNotFound] = useState(false);


    const handleInputChange = async (event) => {
        const newValue = event.target.value;
        setValor(newValue);
        handleChangeMask(event);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          timeoutRef.current = setTimeout(() => {
            delayedSearch(newValue);
          }, 100);

        // // handleChangeMask();
        // delayedSearch(value);
        
      };

    const handleChangeMask =  async (event) =>{
        const { value } = event.target;
        setValor(mask(value));
         // setValor(e.target.value)}
        //  setCpfSearch(value);
      }

      const cpfSearchFunction = () => {
        if (valor.trim() !== "") {
          handleSubmit({ preventDefault: () => {} });
        } else {
          setCpfSearch({ resultado: [] });
        }
      };

    const handleSubmit = async () => {
        const response = await fetch(`http://192.168.0.109:4000/trocaCpf/${valor}`);
        const data = await response.json();
      
        if (!data) {
          console.error('A resposta da API não contém a chave "resultado".');
          setCpfNotFound(true);
          return;
        }
      
        try {
          const resultado = JSON.parse(data.resultado);
          setCpfSearch({ resultado });
          setCpfNotFound(false);
        } catch (e) {
          console.error('Erro ao analisar a string JSON:', e.message);
          setCpfSearch({ resultado: [] });
          setCpfNotFound(true);
          
        }
      };  


      
      
      
      const delayedSearch = async (value) => {
        if (valor.trim() !== "") {
          await handleSubmit({ preventDefault: () => {} },value);
        } else {
          setCpfSearch({ resultado: [] });
        }
      };


    
     //mascara para cnpj
     const [valor, setValor] = useState('');

     //funcao para pessquisa do cpf
     useEffect(() => {
        cpfSearchFunction();
      }, [valor]);
   
      //função para print
      const print = () =>{
        window.print()
      }

        //Tooltip campo CPF proprietário

        const cpfProp = React.useRef(null);

        React.useEffect(()=>{
            const tooltip =  new Tooltip(cpfProp.current, {
                title: `${data.titleCpf}` //busca os dados do objeto do componente data
             });
    
             return () =>{
                tooltip.dispose();
             };
        },[]);
    
        //Tooltip campo placa proprietário
    
        const placaTrocaOleo = React.useRef(null);
    
        React.useEffect(()=>{
            const tooltip =  new Tooltip(placaTrocaOleo.current, {
                title:`${data.titleTrocaOleo}` //busca os dados do objeto do componente data
             });
    
             return () =>{
                tooltip.dispose();
             };
        },[]);
    
         //Tooltip para histórico do veículo
    
         const placaHistoricoVeiculo = React.useRef(null);
    
         React.useEffect(()=>{
             const tooltip =  new Tooltip(placaHistoricoVeiculo.current, {
                 title: `${data.titleHistorico}` //busca os dados do objeto do componente data
              });
     
              return () =>{
                 tooltip.dispose();
              };
         },[]);

         //serach CPF



    return (

        

        <div>

<container-xl>
    <CRow className="justify-content-center">
        <CCard className="p-4">
            <CCardBody>
                <PageArea>
            <div className='searchArea'>
                
                    <form onSubmit={handleSubmit}>
                            {/* <input type='text'  className='inputSearch--1' 
                                placeholder='Insira o CPF do proprietário'
                                name='cpf_cnpj' id="cpf_cnpj"  onChange={handleChangeMask} onBlur={handleSubmit}  value={valor}
                                ref={cpfProp}  
                                                          
                            />   */}
                            <input type='text'  className='inputSearch--1' 
                                placeholder='Insira o CPF do proprietário'
                                name='cpf_cnpj' id="cpf_cnpj" 
                                // onBlur={handleSubmit}  value={valor}
                                onChange={handleInputChange}
                                value={valor}
                                ref={cpfProp}  
                                                          
                            />  
                            <CIcon icon={icon.cilMagnifyingGlass} size='xl'/> 
                            
                        
                    
                        <input type='text'  className='inputSearch--2'
                            placeholder='Insira a placa'
                            ref={placaTrocaOleo}
                        /> <CIcon icon={icon.cilMagnifyingGlass} size='xl'/>
                    
                        <input type='text'  className='inputSearch--3'
                            placeholder='Insira a placa'
                            ref={placaHistoricoVeiculo}
                        /> <CIcon icon={icon.cilMagnifyingGlass} size='xl'/>
                    </form>
            </div>

            <div className='conteudo' >
                    {  /* assim traz todos os dados */}
                    {/* {cpfSearch.resultado}  */}

                    {/* {cpfSearch.map((cliente) => (
                        <div key={cliente.codcliente}>                          
                            <p>Nome do Cliente: {cliente.nome_cliente}</p>
                            <p>Sobrenone do Cliente: {cliente.sobrenome_cliente}</p>
                            <p>Telefone: {cliente.telefone1_cliente}</p>
                        </div>
                    ))} */}
                    


                   {/* {cpfSearch.resultado.length === 0 &&  (
                    <p>Não encontrado!</p>
                   )} */}


                    {cpfNotFound && <p>CPF não encontrado</p>}

{cpfSearch.resultado.length > 0 && 
    <p className='titleRelat'>Relatório de Veículo por cliente</p>
}

    {cpfSearch.resultado.length > 0 &&  cpfSearch.resultado.map((cliente) => (
    <div key={cliente.codcliente}>



<Table responsive="sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Placa </th>
            <th>Tipo Veículo </th>
            <th>Fabricante Veículo </th>
            <th>Marca Veículo </th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cliente.nome_cliente}</td>
            <td>{cliente.sobrenome_cliente}</td>
            <td>{cliente.placa_veiculo}</td>
            <td>{cliente.tipo_veiculo}</td>
            <td>{cliente.fabricante_veiculo}</td>
            <td>{cliente.modelo_veiculo}</td>
          </tr>
          
          
        </tbody>
      </Table>

      
      </div>
      
    )) }

    {/* {Só mostrará o botão se encontrar resultados para exibir...} */}

{cpfSearch.resultado.length > 0 &&
          <Button className='button' variant="success" onClick={print}>Imprimir</Button>
}



            </div>

            </PageArea>
        </CCardBody>
       </CCard>
  </CRow>
</container-xl>
        </div>
    )
}

export default Veiculos;