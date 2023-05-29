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
import debounce from 'lodash.debounce';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';




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
import moment from "moment";


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



const Diversos = () => {

    //search CPF
    const [cpfSearch, setCpfSearch] = useState({ resultado: [] });

    //para exibir a mensagem de erro de cpf não encontrado...
    const [cpfNotFound, setCpfNotFound] = useState(false);


    const handleInputCpfChange = async (event) => {
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
    
        

      

        // Função para gerar o PDF do relatorio veiculos por clientes

        
        const  exportPDFGeral =  () =>{

         

          //Funciona
          // Seleciona a div que contém o conteúdo a ser convertido para PDF
          const ul = document.getElementById('relat');
          const title = document.getElementById('titleRelat'); //estiliza o titulo do relatório
          // const boot = document.getElementById('bootNone');
          // const thBoot = document.querySelector('.thBoot');

        // boot2.querySelectorAll('.bootEditar').forEach(element => {
        //   element.style.display= 'none';
        // });

        // boot.querySelectorAll('bootNone').forEach(element => {
        //   element.style.display= 'none';
        // });



          // Remove bordas da tabela e das células da tabela
          ul.querySelectorAll('table, td, th',).forEach(element => {
            element.style.border = 'none';
          });

          //remove botão

          // thBoot.style.display = 'none';
          // boot.style.display = 'none';

                    
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

          //add botão
          // thBoot.style.display = 'block';
          // boot.style.display = 'block';

       
};




//gera o pdf a partir do modal do histórico do veiculo

const  exportPDFHisty =  () =>{

         

  //Funciona
  // Seleciona a div que contém o conteúdo a ser convertido para PDF
  const ul = document.getElementById('relatHistyModal');
  const title = document.getElementById('titleHisty'); //estiliza o titulo do relatório 

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
    content: pdfContent,pageOrientation: 'landscape'
  };

  const fileName = "relatorioHisóricoVeiculo.pdf";

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

const buscarInformacoesVeiculo = async (placa_veiculo) =>{
    const response = await fetch(`http://192.168.0.104:4000/servicoTrocaVencendo/${placa_veiculo}`);
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
     

//função search histy placa:


//state para guardar o valor do campo de pesquisa da placa:
const [valorSearchplaca, setvalorSearchplaca] = useState('');



//state para guardar a placa que vem da api
const [searchPlaca, setsearchPlaca] = useState({ resultado: [] });

const handleSearchplaca = async (event) => {
  const newValue = event.target.value;
  setvalorSearchplaca(newValue);
  ApiSearchPlaca(newValue); 

  //função que atualiza a página caso os dois capos estejam preenchidos ao mesmo tempo

  const inputSearchPlaca = document.getElementById('searchPlaca');
  const cpfCnpj = document.getElementById('cpf_cnpj');

  const campoSearchPlacaHisty = inputSearchPlaca.value;
  const campoCpfCnpj = cpfCnpj.value;

  if(campoSearchPlacaHisty !== "" && campoCpfCnpj !== ""){
    alert('Favor preencher um campo de cada vez!');
    location.reload()
  }

 
    
}

//criacao do modal para exibir caso os dois campos estejam preenchidos:

const [modalwarning, setModalwarning] = useState(false);



const ApiSearchPlaca = async (valorSearch) => {
  const response = await fetch(`http://192.168.0.104:4000/clientVeiculo/${valorSearch}`);
  const data = await response.json();

  if (!data) {
    console.error('A resposta da API não contém a chave "resultado".');
    return;
  }

  try {
    const resultado = JSON.parse(data.resultado);
    setsearchPlaca({ resultado });
  } catch (e) {
    console.error('Erro ao analisar a string JSON:', e.message);
    setsearchPlaca({ resultado: [] });
  }
}


//Exibir Modal de edição entre cliente e seu veículos

const [showModalEditar, setShowModalEditar] = useState(false);


const openModalEditar = (codVeiculo) => {
  // setSearchhistyPlaca(codVeiculo);
  // informacoesApiVeicuClient(codVeiculo);
  // setSearchhistyPlaca(codVeiculo);
  // buscarInformacoesVeiculo(codVeiculo);
  // ApiSearchPlaca()
  informacoesApiVeicuClient(codVeiculo)
  setShowModalEditar(true);
  
};


const closeModalEditar = () => {
  setShowModalEditar(false);
};

const informacoesApiVeicuClient = async (placa_veiculo) => {
  const response = await fetch(`http://192.168.0.104:4000/clientVeiculo/${placa_veiculo}`);
  const data = await response.json();

  if (!data) {
    console.error('A resposta da API não contém a chave "resultado".');
    return;
  }

  try {
    const resultado = JSON.parse(data.resultado);
    setsearchPlaca({ resultado });
    // console.log('valores', searchPlaca)

  } catch (e) {
    console.error('Erro ao analisar a string JSON:', e.message);
    setsearchPlaca({ resultado: [] });
  }
}


// captura o cpf do cliente e exibe no campo ao lado para editar veiculo do cliente


 const [updateCpfCliente, setUpdateCpfCliente] = useState([{ resultado: []}]);

 const [cpf, setCpf] = useState(''); // Estado para o valor digitado no campo CPF

const [nomeCliente, setNomeCliente] = useState('');
const [codcliente, setCodcliente] = useState('');

const handleUpdateCpf = (event) => {
  const newValue = event.target.value;
  setCpf(newValue); //salva na state cpf para usar a mascara
  handleChangeMaskUpdateCpfVeicul(event); //chama a função de mascara
  handleUpdateCpfApi(newValue);
}

//Função de mascara

const handleChangeMaskUpdateCpfVeicul =  async (event) =>{
  const { value } = event.target;
  setCpf(mask(value));
  handleUpdateCpfApi()
}

const handleUpdateCpfApi = async (cpf) => {
  const response = await fetch(`http://192.168.0.104:4000/clientVeiculoCpf/${cpf}`);
  const data = await response.json();

  if (!data) {
    console.error('A resposta da API não contém a chave "resultado".');
    return;
  }

  try {
    const resultado = JSON.parse(data.resultado);
    setUpdateCpfCliente({ resultado });

    if (resultado.length > 0) {
      setNomeCliente(resultado[0].nome_cliente); // Define o nome do cliente retornado no estado nomeCliente
    }
    if (resultado.length > 0) {
      setCodcliente(resultado[0].codcliente); // Define o nome do cliente retornado no estado nomeCliente
    }

  } catch (e) {
    console.error('Erro ao analisar a string JSON:', e.message);
    setUpdateCpfCliente({ resultado: [] });
  }
};

useEffect(() => {
  console.log('Dados de cpf:', updateCpfCliente);
}, [updateCpfCliente]);

// const [updateCpfCliente, setUpdateCpfCliente] = useState([{ resultado: []}]);

// const [cpf, setCpf] = useState(''); // Estado para o valor digitado no campo CPF

// const handleUpdateCpf = (event) => {
//   const newValue = event.target.value;
//   setCpf(newValue);
//   handleUpdateCpfApi(newValue); // Passa o valor digitado para a função de chamada da API
// }

// const handleUpdateCpfApi = async (cpf) => {
//   const response = await fetch(`http://192.168.0.104:4000/clientVeiculoCpf/${cpf}`);
//   const data = await response.json();
      
//   if (!data) {
//     console.error('A resposta da API não contém a chave "resultado".');
//     return;
//   }

//   try {
//     const resultado = JSON.parse(data.resultado);
//     setUpdateCpfCliente({ resultado });
//     console.log('Valor do estado updateCpfCliente:', updateCpfCliente);

//   } catch (e) {
//     console.error('Erro ao analisar a string JSON:', e.message);
//     setUpdateCpfCliente({ resultado: [] });
    
//   }
  
// };

// useEffect(() => {
//   console.log('dados de cpf', updateCpfCliente);
// }, [updateCpfCliente]);

//trata do update do veiculo do cliente

//mapea os values dos imputs

const [formValuesUpdateVeicClient, setFormValuesUpdateVeicClient] = useState(null);

const handleInputChangeUpdateVeicClient = (event) => {
  const { name, value } = event.target;
  setFormValuesUpdateVeicClient((prevValues) => ({
    ...prevValues,
    [name]: value
  }));
};

const handleSubmitUpdateClientVeiculo = async (event) => {
  event.preventDefault();

 

  // Criar o objeto data com os valores dos campos

  const form = event.target;
  const data = {
    cod_veiculo: form.elements.cod_veiculo.value,
    codcliente: form.elements.codcliente.value,
    cor_veiculo: form.elements.cor_veiculo.value,
    km_veiculo: form.elements.km_veiculo.value,
    ano_fabricacao_veiculo: form.elements.ano_fabricacao_veiculo.value,
    status_veiculo: form.elements.status_veiculo.value,
    placa_veiculo: form.elements.placa_veiculo.value,
    tipo_veiculo: form.elements.tipo_veiculo.value,
    fabricante_veiculo: form.elements.fabricante_veiculo.value,
    modelo_veiculo: form.elements.modelo_veiculo.value,
    clientecodCliente: form.elements.clientecodCliente.value
  };

  // const data = {
  //   placa_veiculo: 'qqb8c54',
  //   tipo_veiculo: 'carros',
  //   cor_veiculo: 'branco',
  //   modelo_veiculo: 'onix',
  //   fabricante_veiculo: 'GM - Chevrolet',
  //   ano_fabricacao_veiculo: '2019',
  //   km_veiculo: 70000, 
  //   obs_veiculo: 'teste',
  //   status_veiculo: 'ativo',
  //   clientecodCliente: 1 
  // };
  
  console.log('Valor de clientecodCliente:', data.clientecodCliente);

  try {

    console.log('dados da data', JSON.stringify(data));

    // Enviar os dados para a API usando fetch
    const response = await fetch(`http://192.168.0.104:4000/updateVeiculoClient/${form.elements.cod_veiculo.value}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // body: JSON.stringify(placa_veiculo= 'qqb8c54', tipo_veiculo= 'carros',cor_veiculo= 'branco', 
      // modelo_veiculo= 'onix', fabricante_veiculo= 'GM - Chevrolet',ano_fabricacao_veiculo= '2019',
      // km_veiculo= 70000,obs_veiculo= 'teste',status_veiculo= 'ativo',clientecodCliente= 20 ),
    });
    console.log(response);

    // Verificar a resposta da API
    if (response.ok) {
      // Dados enviados com sucesso
      const responseData = await response.json();
      setMessage(responseData.message);
      setShowModalEditveicClient(true);
      console.log('Dados enviados com sucesso!', responseData);
    } else {
      // Lidar com erros de resposta da API
      const errorResponseData = await response.json();
      setMessage(errorResponseData.error);
      setShowModalEditveicClient(true);
      console.error('Erro ao enviar os dados para a API:', response.status);
    }
  } catch (error) {
    // Lidar com erros de rede ou outros erros
    console.error('Erro ao enviar os dados para a API:', error);
  }
}


//controlar modal de exibicao de mensagem de edicao de veiculo


const [showModalEditveicClient, setShowModalEditveicClient] = useState(false);
const [message, setMessage] = useState('');

//fechar modal

const closeModalEditVeicClient = () => {
  setShowModalEditveicClient(false);
  // setShowModalEditar(false); //fechao modal editar que está atras do atual

};

//Toast



useEffect(() => {
  if (showModalEditveicClient) {
    // Define o tempo em milissegundos para exibir o Toast por 6 segundos
    const timeout = setTimeout(() => {
      setShowModalEditveicClient(false);
    }, 6000);

    return () => {
      clearTimeout(timeout);
    };
  }
}, [showModalEditveicClient]);



//Exibir Modal de troca de óleo

const [showModalTrocaOleo, setShowModalTrocaOleo] = useState(false);


const openModalTrocaOleo = (codVeiculo) => {
  // setSearchhistyPlaca(codVeiculo);
  // informacoesApiVeicuClient(codVeiculo);
  // setSearchhistyPlaca(codVeiculo);
  // buscarInformacoesVeiculo(codVeiculo);
  // ApiSearchPlaca()
  ultimaTrocaOleo(codVeiculo)
  setShowModalTrocaOleo(true);
  
};


const closeModalTrocaOleo = () => {
  setShowModalTrocaOleo(false);
};



const ultimaTrocaOleo = async(placa_veiculo) =>{


  const response = await fetch(`http://192.168.0.104:4000/ultimaTrocaOleo/${placa_veiculo}`);
  const data = await response.json();

  if (!data) {
    console.error('A resposta da API não contém a chave "resultado".');
    return;
  }

  try {
    const resultado = JSON.parse(data.resultado);
    setsearchPlaca({ resultado });
    // console.log('valores', searchPlaca)

  } catch (e) {
    console.error('Erro ao analisar a string JSON:', e.message);
    setsearchPlaca({ resultado: [] });
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
                                onChange={handleInputCpfChange}
                                value={valor}
                                ref={cpfProp}  
                                                          
                            />  
                            <CIcon icon={icon.cilMagnifyingGlass} size='xl'/> 
                            
                        
                    
                        <input type='text'  className='inputSearch--2'
                            id='searchPlaca'
                            placeholder='Insira a placa'
                            onChange={handleSearchplaca}
                            value={valorSearchplaca}
                            ref={placaTrocaOleo}
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
            <th colSpan={3}  style={{textAlign:'center'}}>Ações</th>

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
             <td className='thBoot'><Button variant='success' className='bootEditar' onClick={() => openModal(cliente.placa_veiculo)} > Histórico</Button></td>
              <td className='thBoot'><Button className='bootEditar' variant='primary' onClick={()=>openModalEditar(cliente.placa_veiculo)} >Editar</Button></td>
              <td className='thBoot'> <Button variant="warning" onClick={()=>openModalTrocaOleo(cliente.placa_veiculo)} className='bootEditar' > Trocar óleo </Button></td>
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
          <Button className='button'  variant="success" onClick={exportPDFGeral} style={{padding:'10px'}}>Gerar PDF</Button>
}


          


            </div>
  
            <Modal size="xl" show={showModal} onHide={closeModal}>

    <div className='modalContent'>
      <Modal.Header closeButton>
        {/* <Modal.Title>Histórico do Veículo</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>

        {/* Aqui você pode exibir as informações do veículo */}

        <div id='relatHistyModal'>
        <h3 id='titleHisty' style={{textAlign:'center', marginBottom: '20px' }}>Histórico do Veículo</h3>

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
                  <th>Filtro óleo?</th>
                  <th>Filro Combustível</th>
                  <th>Filtro combustível?</th>
                  <th>Filtro Cabine</th>
                  <th>Filtro cabine?</th>
                  <th>Filtro ar</th>
                  <th>Filtro ar?</th>
                  <th>OBS</th>
                  <th>quantidade óleo</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{moment(infoVeiculo.data_troca).format("DD/MM/YYYY")}</td>
                  <td>{moment(infoVeiculo.proxima_troca).format("DD/MM/YYYY")}</td>
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
    </div>



      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal} style={{padding:'10px', width:'120px'}}>
          Fechar
        </Button>
        <Button variant="success" onClick={exportPDFHisty} style={{padding:'10px'}}>
          Gerar Relatório
        </Button>       
      </Modal.Footer>
    </div>
  {/* </div> */}
</Modal>


{/* renderiza resultado da search placa */}

  {searchPlaca.resultado.length > 0  &&

  <h4 className='titleRelat'>Histórico de servicos</h4>

  }

  {searchPlaca.resultado.length > 0 &&  searchPlaca.resultado.map((cliente) => (
      <div key={cliente.cod_veiculo}>


<Table responsive="sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>CPF</th>
            <th>Placa </th>
            <th>Tipo Veículo </th>
            <th>Fabricante Veículo </th>
            <th>Marca Veículo </th>
            <th colSpan={3}  style={{textAlign:'center'}}>Ações</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cliente.nome_cliente}</td>
            <td>{cliente.sobrenome_cliente}</td>
            <td>{cliente.cpf_cliente}</td>
            <td>{cliente.placa_veiculo}</td>
            <td>{cliente.tipo_veiculo}</td>
            <td>{cliente.fabricante_veiculo}</td>
            <td>{cliente.modelo_veiculo}</td>
            {/* <td><Button variant='success' onClick={() => handleHisty(cliente.cod_veiculo)}> Histórico</Button></td> */}
             <td><Button variant='success' id='bootNone' onClick={() => openModal(cliente.placa_veiculo)} style={{padding:'10px'}}> Mais detalhes</Button></td>
              {/* <td><Button className='bootEditar' variant='primary' style={{padding:'10px'}}>Editar</Button></td> */}
              <td> <Button variant="warning" id='bootNone' style={{padding:'10px'}}> Trocar óleo </Button></td>
          </tr>
          
          
        </tbody>
            </Table>
      </div>


))}


{/*Exibir informações do modal de edição ente clientes e seus veículos  */}

<Modal size="xl" show={showModalEditar} onHide={closeModalEditar}>

    <div className='modalContent'>
      <Modal.Header closeButton>
        {/* <Modal.Title>Histórico do Veículo</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>

        {/* Aqui você pode exibir as informações do veículo */}

        <div id='relatHistyModal'>
        <h3 id='titleHisty' style={{marginBottom: '20px', textAlign: 'center'}}>Editar veículo do cliente</h3>

        {searchPlaca.resultado ? (
          searchPlaca.resultado.map((cliente) => ( 
            
            <div className='formEditCliente' > 

              <form onSubmit={handleSubmitUpdateClientVeiculo}> 
                <div class="row">
                  <div class="form-group col-md-6 mb-2">
                      <input type="text" name='nome_cliente' class="form-control" value={cliente.nome_cliente} disabled />
                      {/*campos abaixo irão ficar oculos e servem somente para os dados não irem em branco para a api...  */}
                      <input type="text" name='cod_veiculo' class="form-control" value={cliente.cod_veiculo} hidden  />
                      <input type="text" name='codcliente' class="form-control" value={cliente.codcliente} hidden />
                      <input type="text" name='cor_veiculo'  class="form-control" value={cliente.cor_veiculo} hidden />
                      <input type="text" name='km_veiculo' class="form-control" value={cliente.km_veiculo} hidden />
                      <input type="text" name='ano_fabricacao_veiculo' class="form-control" value={cliente.ano_fabricacao_veiculo} hidden />
                      <input type="text" name='status_veiculo' class="form-control" value={cliente.status_veiculo} hidden />

                    </div>
                    <div class="form-group col-md-6">
                      <input type="text" name='sobrenome_cliente' class="form-control" value={cliente.sobrenome_cliente} disabled />
                    </div>
                    
                </div>

                <div class="row">
                  <div class="form-group col-md-6 mt-2">
                      <input type="text" name='tipo_veiculo' class="form-control" value={cliente.tipo_veiculo} disabled />
                    </div>
                    <div class="form-group col-md-6 mt-2">
                      <input type="text" name='fabricante_veiculo' class="form-control" value={cliente.fabricante_veiculo} disabled/>
                    </div>                    
                </div>
 
                <div class="row">
                  <div class="form-group col-md-6 mt-2">
                      <input type="text" name='modelo_veiculo' class="form-control" value={cliente.modelo_veiculo} disabled />
                    </div>
                    <div class="form-group col-md-6 mt-2">
                      <input type="text" name='placa_veiculo' class="form-control" value={cliente.placa_veiculo} disabled />
                    </div>                    
                </div>

                <div class= "row">
                    <div class="form-group col-md-6 mt-2">
                      <label for="inputEstado">Novo proprietário</label>
                      <input type="text" class="form-control" placeholder='Insira o CPF/CNPJ' onChange={handleUpdateCpf} value={cpf} />
                    </div>
                    <div class="form-group col-md-6 mt-2">
                      <label for="inputEstado">Nome novo proprietário</label>
                      <input type="text" class="form-control"  value={nomeCliente} readOnly />
                      <input type="text" name='clientecodCliente' hidden class="form-control" 
                       value={codcliente} readOnly />
                      
                    </div>
                </div>
            
              {/* <input type='submit' value='enviar' /> */}

        <Button variant="success" type='submit' style={{padding:'10px', width:'120px', marginTop: '30px',
         marginRight: '10px'}}>
          Atualizar
        </Button> 
        <Button variant="secondary" onClick={closeModalEditar
        } style={{padding:'10px', width:'120px', marginTop: '30px'}}>
          Fechar
        </Button> 

              </form>

            </div>
          ))
        ) : (
          <div>Nenhuma informação encontrada!</div>
        )}
    </div>

      {/*Exibicao do Toast com mensagem de retorno */}

      <Toast show={showModalEditveicClient} onClose={() => closeModalEditVeicClient()} style={{position: 'absolute', top: '0'}}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Editar veículos do cliente</strong>
          <small></small>
        </Toast.Header>
        <Toast.Body><p style={{fontSize: '20px',  textAlign: 'center', fontWeight:'bold'}}>{message}</p>
        </Toast.Body>
      </Toast>


      </Modal.Body>
      <Modal.Footer>
       

           
      </Modal.Footer>
    </div>
  {/* </div> */}
</Modal>

{/* Modal para troca de óleo*/}



<Modal size="xl" show={showModalTrocaOleo} onHide={closeModalTrocaOleo}>
<div className='modalContent'>
      <Modal.Header closeButton>
       <Modal.Title>Trocar óleo lubrificante</Modal.Title> 
      </Modal.Header>
      <Modal.Body>

  

{searchPlaca.resultado.length > 0 &&  searchPlaca.resultado.map((cliente) => (
    <div key={cliente.cod_veiculo}>
    
    
    <form>
      <input value={cliente.nome_cliente} />
    </form>

  </div>
))}
    
    
    
    
  


 </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModalTrocaOleo} style={{padding:'10px', width:'120px'}}>
          Fechar
        </Button>
      </Modal.Footer>
    </div>
</Modal>



{/* <div show={showModalEditveicClient} style={{background: 'red'}}> 
  {message}
</div> */}







            </PageArea>
        </CCardBody>
       </CCard>
  </CRow>
</container-xl>

        </div>
        
    )
}

export default Diversos;