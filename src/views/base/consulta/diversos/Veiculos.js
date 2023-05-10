import React, { useEffect, useState, useRef } from 'react'
import {PageArea} from './styled';
import {mask} from '../../../../components/CnpjCpf/cpf';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { renderToStaticMarkup } from 'react-dom/server';
import logo from '../../../../assets/images/logo.png';


// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf.js';
// import { toPng } from 'html-to-image';
// import htmlToImage from 'html-to-image';

// import jsPDF from 'jspdf';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfMake from "html-to-pdfmake";


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
        const response = await fetch(`http://192.168.0.104:4000/trocaCpf/${valor}`);
        // const response = await fetch(`http://localhost:4000/trocaCpf/${valor}`);
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

      

        // Função para gerar o PDF

        
        const  exportPDF =  () =>{

         

          //Funciona
          // Seleciona a div que contém o conteúdo a ser convertido para PDF
          const ul = document.getElementById('relat');
          const title = document.getElementById('titleRelat'); //estiliza o titulo do relatório

          // Remove bordas da tabela e das células da tabela
          ul.querySelectorAll('table, td, th').forEach(element => {
            element.style.border = 'none';
          });
                    
          //estiliza o titulo do relatório
          title.style.fontSize = '22pt';
          title.style.fontWeight = 'bold';
          title.style.textAlign = 'center';
          title.style.marginBottom = '30px';

          //esse código faz com que após clicar no botao de gerar cpf, volte a ter bordas normais na tabela

          ul.querySelectorAll('tbody').forEach(element => {
            element.style.borderBottom = '0.1px solid #ccc';
          });
          ul.querySelectorAll('tbody').forEach(element => {
            element.style.borderTop = '0.1px solid #ccc';
          });

          const pdfContent = htmlToPdfMake(ul.innerHTML, title.innerHTML);

          const docDefinition = {
            content: pdfContent
          };

          const fileName = "relatorioVeiculosClientes.pdf";

          pdfMake.createPdf(docDefinition).download(fileName);

        

       
};

//Modal para abrir o histórico do veículo

const [showModal, setShowModal] = useState(false);
// const [selectedData, setSelectedData] = useState(null);

 //chama a função de histórico do veículo
 const [searchhistyPlaca, setSearchhistyPlaca ] = useState ({ resultado: [] })
// const [searchhistyPlaca, setSearchhistyPlaca ] = useState ([]);


//teste de Modal

// const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

// Função para abrir o modal e passar os dados selecionados
// const handleOpenModal = (data) => {
//   setSelectedData(data);
//   setShowModal(true);
// }

//  // Função para fechar o modal
//  const handleCloseModal = () => {
//   setSelectedData(null);
//   setShowModal(false);
// }

 const openModal = (codVeiculo) => {
  setSearchhistyPlaca(codVeiculo);
  buscarInformacoesVeiculo(codVeiculo);
  setShowModal(true);
  
};

const closeModal = () => {
  setShowModal(false);
};




 
// const handleHisty =  async (cod_veiculo) => {
//   // cpfSearch.resultado.length > 0 && cpfSearch.resultado.map(async (cliente) => {
//   //   const response = await fetch(`http://192.168.0.104:4000/servicoTrocaVencendo/${cliente.cod_veiculo}`);
//   //   const data = await response.json();
//   //   // faça algo com os dados retornados
//   // })

//   setSearchhistyPlaca(cod_veiculo);
//   buscarInformacoesVeiculo(cod_veiculo);

// }

const buscarInformacoesVeiculo = async (cod_veiculo) =>{
    const response = await fetch(`http://192.168.0.104:4000/servicoTrocaVencendo/${cod_veiculo}`);
    const data = await response.json();
    if (!data) {
      console.error('A resposta da API não contém a chave "resultado".');
      return;
    }
  
    try {
      const resultado = JSON.parse(data.resultado);
      setSearchhistyPlaca({ resultado });
    } catch (e) {
      console.error('Erro ao analisar a string JSON:', e.message);
      searchhistyPlaca({ resultado: [] });
      
    }
  

}
        


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

                    <div id='relat'  >
                    
                   

{cpfSearch.resultado.length > 0  &&

    <p className='titleRelat' id='titleRelat'>Relatório de Veículo por cliente</p>
    
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
            <th colSpan={2}  style={{textAlign:'center'}}>Ações</th>

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
            {/* <td><Button variant='success' onClick={() => handleHisty(cliente.cod_veiculo)}> Histórico</Button></td> */}
             <td><Button variant='success' onClick={() => openModal(cliente.cod_veiculo)}> Histórico</Button></td>
              <td><Button className='bootEditar' variant='primary'>Editar</Button></td>
          </tr>
          
          
        </tbody>
            </Table>

      </div>
      
      
    )) }


{/* {
  searchhistyPlaca.trocaOleo.length > 0 && searchhistyPlaca.trocaOleo.map((infoVeiculo) => (

  // searchhistyPlaca && searchhistyPlaca.trocaOleo.length > 0 && searchhistyPlaca.trocaOleo.map((infoVeiculo) => (    
    
    <div key={infoVeiculo.cod_veiculo}>
      <div>{infoVeiculo.cod_veiculo} </div>
      <div>{infoVeiculo.placa_veiculo} </div>
      <div>{infoVeiculo.tipo_veiculo}</div>
      <div>{infoVeiculo.marca_veiculo}</div>
      <div>{infoVeiculo._veiculo}</div>

    </div>
    
))} */}


{/* 
{searchhistyPlaca && 
    
    <div key={searchhistyPlaca.cod_veiculo}>
      <div>{searchhistyPlaca.cod_veiculo} </div>
      <div>{searchhistyPlaca.placa_veiculo} </div>
      <div>{searchhistyPlaca.tipo_veiculo}</div>
      <div>{searchhistyPlaca.marca_veiculo}</div>
      <div>{searchhistyPlaca.modelo_veiculo}</div>
  
    </div>
}   */}

  

    



{/* 
{searchhistyPlaca.trocaOleo.servicos ? (
  searchhistyPlaca.trocaOleo.servicos.map((infoVeiculo) => (
    <div key={infoVeiculo.cod_servicos}>
      <div>{infoVeiculo.km}</div>
    </div>
  ))
) : (
  <div>Nenhum histórico encontrado</div>
)} */}

    
</div>


    {/* {Só mostrará o botão se encontrar resultados para exibir...} */}

{cpfSearch.resultado.length > 0 &&
          <Button className='button'  variant="success" onClick={exportPDF}>Gerar PDF</Button>
}


          


            </div>
  
            <Modal size="xl" show={showModal} onHide={closeModal}>

    <div className='modalContent'>
      <Modal.Header closeButton>
        <Modal.Title>Histórico do Veículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* Aqui você pode exibir as informações do veículo */}



        {searchhistyPlaca.resultado ? (
          searchhistyPlaca.resultado.map((infoVeiculo) => (
            
            <div className="table-responsive">
            <Table className='tableHisty' style={{fontSize: '14px'}}>
              <thead>
                <tr>
                  <th>Data de Troca</th>
                  <th>Próxima de Troca</th>
                  <th>KM</th>
                  <th>Tipo óleo</th>
                  <th>Filtro óleo</th>
                  <th>Troca Filtro óleo?</th>
                  <th>Filro Combustível</th>
                  <th>Troca Filtro combustível?</th>
                  <th>Filtro Cabine</th>
                  <th>Trocado filtro cabine?</th>
                  <th>Filtro ar</th>
                  <th>Troca filtro ar?</th>
                  <th>OBS</th>
                  <th>quantidade óleo</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{infoVeiculo.data_troca}</td>
                  <td>{infoVeiculo.proxima_troca}</td>
                  <td>{infoVeiculo.km}</td>
                  <td>{infoVeiculo.tipo_oleo}</td>
                  <td>{infoVeiculo.filtro_oleo}</td>
                  <td>{infoVeiculo.status_filtro_oleo}</td>
                  <td>{infoVeiculo.filtro_combustivel}</td>
                  <td>{infoVeiculo.status_filtro_combustivel}</td>
                  <td>{infoVeiculo.filtro_cabine}</td>
                  <td>{infoVeiculo.status_filtro_cabine}</td>
                  <td>{infoVeiculo.filtro_ar}</td>
                  <td>{infoVeiculo.status_filtro_ar}</td>
                  <td>{infoVeiculo.obs_troca}</td>
                  <td>{infoVeiculo.qtd_oleo}</td>


                </tr>
              </tbody>
            </Table>
            </div>
          ))
        ) : (
          <div>Nenhum histórico encontrado</div>
        )}




      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal} style={{padding:'10px', width:'120px'}}>
          Fechar
        </Button>
        <Button variant="secondary" onClick={closeModal} style={{padding:'10px'}}>
          Gerar Relatório
        </Button>
      </Modal.Footer>
    </div>
  {/* </div> */}
</Modal>



            </PageArea>
        </CCardBody>
       </CCard>
  </CRow>
</container-xl>

        </div>
        
    )
}

export default Veiculos;