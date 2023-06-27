import React, { useState } from 'react'
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
  CTooltip
  
} from '@coreui/react'
import { CFormFeedback } from '@coreui/react'
import { DocsExample } from 'src/components'
import { CFormText } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import { CForm,CFormInput,CButton,CFormCheck,CContainer,CCardGroup,CInputGroup,CInputGroupText } from '@coreui/react'
import {FormArea} from './styled';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import axios from 'axios';
import {mask} from '../../../components/CnpjCpf/cpf';
import { useEffect } from 'react'
import Toast from 'react-bootstrap/Toast';
//import {ToastMessageStyle} from './styled';
import Spinner from 'react-bootstrap/Spinner';



  const Audiencia = () => {

    //mascara de cpf/cnpj

  const handleChangeMask = (event) => {
    const { name, value } = event.target;
    // Aplicar a máscara ao valor
    const maskedInput = mask(value);
    // Atualizar o valor do campo com a máscara aplicada
    setValue(name, maskedInput);
  };

      const [cep, setCep] = useState('');
      const [logradouro, setLogradouro] = useState('');
      const [bairro, setBairro] = useState('');
      const [cidade, setCidade] = useState('');
      const [estado, setEstado] = useState('');


      useEffect(() => {
        const buscarUf = async () => {
          try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            setEstado(response.data.uf);
            setValue('uf', response.data.uf);
          } catch (error) {
            console.log(error);
          }
        };
    
        buscarUf();
      }, []);


  async function buscarEndereco() {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setEstado(response.data.uf);

      //aqui usa o register do useForm e envia os dados para a api e salvar no banco
      setValue('uf_cliente', response.data.uf);
      setValue('rua_cliente', response.data.logradouro);
      setValue('bairro_cliente', response.data.bairro);
      setValue('cidade_cliente', response.data.localidade);


    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=> {

  }, [buscarEndereco]);

    const {register, handleSubmit, reset, formState: { errors }, setValue  } =  useForm();

    //controlar Toast com respostas para usuario

    const [showToastCadSucess, setToastCadSucess] = useState(false);
    const [showToastCadError, setToastCadError] = useState(false);
    const [messageSucess, setMessageSucess] = useState('');
    const [messageError, setMessageError] = useState('');

    const closeToastCadSucess = () => {
      setToastCadSucess(false);
    }

    const closeToastCadError = () => {
      setToastCadError(false);
    }

    //Toast de Success

    useEffect(() => {
      if (showToastCadSucess) {
        // Define o tempo em milissegundos para exibir o Toast por 6 segundos
        const timeout = setTimeout(() => {
          setToastCadSucess(false);
        }, 6000);
    
        return () => {
          clearTimeout(timeout);
        };
      }
    }, [showToastCadSucess]);
    
    //Toast de erro

    useEffect(() => {
      if (showToastCadError) {
        // Define o tempo em milissegundos para exibir o Toast por 6 segundos
        const timeout = setTimeout(() => {
          setToastCadError(false);
        }, 6000);
    
        return () => {
          clearTimeout(timeout);
        };
      }
    }, [showToastCadError]);

    //carregamento do loading

    const [isLoading, setIsLoading] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);


    const CadCliente =  async (data) => {
      console.log('dados do data', data)
          setIsLoading(true);
          setIsTimeout(false);
       
        const { nome_cliente, sobrenome_cliente, cpf_cliente, telefone1_cliente,telefone2_cliente,  data_nascimento_cliente	, 
          sexo_cliente, cep_cliente, uf_cliente, cidade_cliente, rua_cliente, bairro_cliente, numero_rua_cliente
        } = data;

    const formData = {
      nome_cliente,
      sobrenome_cliente,
      cpf_cliente,
      telefone1_cliente,
      telefone2_cliente,
      data_nascimento_cliente,
      sexo_cliente,
      cep_cliente,
      uf_cliente,
      cidade_cliente,
      rua_cliente,
      bairro_cliente,
      numero_rua_cliente
      
    };
      

    try {
      // ...
  
      // Antes de fazer a requisição, o timer verificar se demora mais de 10 segundos
      const timeout = setTimeout(() => {
        setIsTimeout(true);
      }, 10000);
  
      // Fazer a requisição à API
      const response = await fetch('http://192.168.0.104:4000/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
              // Dados enviados com sucesso
              const responseData = await response.json();
              setMessageSucess(responseData.message);
              setToastCadSucess(true);
              setIsLoading(false);
              console.log('Dados enviados com sucesso!', responseData);
              
              // Limpar os campos do formulário
              reset();
             
      }
      else {

              // Lidar com erros de resposta da API
              const errorResponseData = await response.json();
              console.log('Error response data:', errorResponseData);
              setMessageError(errorResponseData.error);
              setToastCadError(true);
              setIsLoading(false);
              console.error('Erro ao enviar os dados para a API:', response.status);
          }
  
          // Limpar o timer do timeout
          clearTimeout(timeout);

      
          // Restante do seu código...
      
        } catch (error) {
          // Restante do seu código...
          console.error('Erro ao enviar os dados para a API:', error);
        } 
  };
  
  

  
    //mascara para cnpj
    const [valor, setValor] = useState('');


    //chamar a função handleChangeMask sempre que o campo de cpf for alterado
    useEffect(() => {
      setValue('cpf_cliente', valor);
    }, [valor, setValue]);
    

    
    
    
  return (
    <>

<container-xl>
        <CRow className="justify-content-center">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <FormArea>
                    <h2 className="mb-5">Cadastro de audiências</h2>
             
                    <CForm onSubmit={handleSubmit(CadCliente)} > 
                      <CRow className="mb-8">
                        
                        <CFormLabel htmlFor="nome_escrivao" className="col-sm-2 col-form-label">Nome Escrivão<span>*</span></CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" id="nome_escrivao" name='nome_escrivao'                           
                            {...register("nome_escrivao",
                            {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres"
                              }
                            }) }
                            />{errors.nome_escrivao && <span className='errors-alert'>{errors.nome_escrivao.message}</span>}
                          </CCol>
                      
                          <CFormLabel htmlFor="numero_processo" className="col-sm-2 col-form-label">Numero processo<span>*</span></CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="number" name='numero_processo' id="numero_processo"                          
                            {...register("numero_processo", {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres"
                              }
                            })}                                                    
                            />{errors.numero_processo && <span className='errors-alert'>{errors.numero_processo.message}</span>}
                          </CCol>
                          
                    
                      </CRow>

                      <CRow className="mb-8">

                      <CFormLabel htmlFor="cpf_cliente" className="col-sm-2 col-form-label">Data Audiência<span>*</span></CFormLabel>
                      <CCol sm={4}>
                      <CFormInput type="date" name='data_audiencia' id="data_audiencia"                          
                            {...register("data_audiencia", {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres"
                              }
                            })}                                                    
                            />{errors.data_audiencia && <span className='errors-alert'>{errors.data_audiencia.message}</span>}
                                                       
                      </CCol>
                      

                      <CFormLabel htmlFor="cpf_cliente" className="col-sm-2 col-form-label">Upload Arquivos<span>*</span></CFormLabel>
                      <CCol sm={4}>
                      <CFormInput type="file" name='caminho' id="caminho"                          
                            {...register("caminho", {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres"
                              }
                            })}                                                    
                            />{errors.caminho && <span className='errors-alert'>{errors.caminho.message}</span>}                              
                      </CCol>

                        </CRow>

                    
                    <CRow className="mb-8">

                      <CCol sm={4}>
                            <CButton>Cadastrar</CButton>
                      </CCol>
                      </CRow>
                      
                    </CForm>

                          
                        
                          

                    </FormArea>

                   {/*Exibicao do Toast Success */}

                  
                  <Toast show={showToastCadSucess} onClose={() => closeToastCadSucess()} className='toastCadSucess'>
                      <Toast.Header  className='toastCadSucessHEader'>
                        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                        <strong className="me-auto">Cadastro de cliente</strong>
                        <small></small>
                        </Toast.Header>
                        <Toast.Body className='ToasBody'><p className='MsgBodyToast'>{messageSucess}</p>
                        </Toast.Body>
                      </Toast>
                           {/*Exibicao do Toast Error */}
                      <Toast show={showToastCadError} onClose={() => closeToastCadError()} className='toastCadError'>
                      <Toast.Header className='toastCadErrorHeader'>
                        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                        <strong className="me-auto">Cadastro de cliente</strong>
                        <small></small>
                        </Toast.Header>
                        <Toast.Body><p className='MsgBodyToast'>{messageError}</p>
                        </Toast.Body>
                      </Toast>
                  

                  {isLoading && (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {isTimeout && (
            
                      <Toast show={isTimeout} onClose={() => closeToastCadError()} className='toastCadError'>
                      <Toast.Header className='toastCadErrorHeader'>
                        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                        <strong className="me-auto">Cadastro de cliente</strong>
                        <small></small>
                        </Toast.Header>
                        <Toast.Body><p className='MsgBodyToast'>Erro de comunicação com o servidor</p>
                        </Toast.Body>
                      </Toast>
            

                    // <div className="alert alert-danger" role="alert">
                    //   A requisição demorou mais de 10 segundos.
                    // </div>
                  )}

                       


                </CCardBody>
              </CCard>
            </CCardGroup>
        </CRow>
      </container-xl>
    </>
  )
}


export default Audiencia
