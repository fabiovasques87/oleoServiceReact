import React, { useEffect, useState, useRef } from 'react'
import {PageArea} from './styled';
import {mask} from '../../../../components/CnpjCpf/cpf';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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




  //css para o pdf gerado
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });


  function MyDocument() {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #3</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #4</Text>
          </View>
        </Page>
      </Document>
    );
  }

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
        // const response = await fetch(`http://192.168.0.109:4000/trocaCpf/${valor}`);
        const response = await fetch(`http://localhost:4000/trocaCpf/${valor}`);
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

        const [showPDF, setShowPDF] = useState(false);

        const handleButtonClick = () => {
          setShowPDF(true);
        }

        const gerarPDF = async () => {

          // const doc = new jsPDF();


          // doc.setFontSize(16); // define o tamanho padrão da fonte do documento
          // doc.setFont('helvetica', 'normal'); // define a fonte padrão do documento
          
          // const element = document.getElementById('content');
          // html2canvas(element).then(canvas => {
          //   const imgData = canvas.toDataURL('image/png');
          //   doc.addImage(imgData, 'PNG', 10, 20, 200, 350); // adiciona a imagem ao PDF
          //   doc.save('relatorioVeiculosporClientes.pdf');
          // });
           
           // Define as dimensões da página
           
            
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

    <button onClick={handleButtonClick}>Gerar PDF</button>
          {showPDF ? (
            <PDFViewer style={{ width: '100%', height: '500px' }}>
              <MyDocument />
            </PDFViewer>
          ) : null}


                    {cpfNotFound && <p>CPF não encontrado</p>}

                    <div id="content" >

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
    
</div>
    {/* {Só mostrará o botão se encontrar resultados para exibir...} */}

{cpfSearch.resultado.length > 0 &&
          <Button className='button' variant="success" onClick={gerarPDF}>Gerar PDF</Button>
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