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
import {ToastMessageStyle} from './styled';
import Spinner from 'react-bootstrap/Spinner';



  const Cliente = () => {

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

      

    


  async function buscarEndereco(cep) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setEstado(response.data.uf);
      // setCep(response.data.cep_cliente)

      //aqui usa o register do useForm e envia os dados para a api e salvar no banco
      setValue('uf_cliente', response.data.uf);
      setValue('rua_cliente', response.data.logradouro);
      setValue('bairro_cliente', response.data.bairro);
      setValue('cidade_cliente', response.data.localidade);
      // setValue('cep_cliente', response.data.cep_cliente);



    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeCep = (e) => {
    const newCep = e.target.value;
    setCep(newCep);
    setValue('cep_cliente', newCep); // Atualiza o valor do campo "cep_cliente" usando setValue
  };


 

  useEffect(()=> {

  }, [buscarEndereco]);

    const {register, handleSubmit, formState: { errors }, setValue  } =  useForm();

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


    const onSubmit =  async (data) => {
      console.log('dados do data', data)
          setIsLoading(true);
          setIsTimeout(false);
       
        const { nome_cliente, sobrenome_cliente, cpf_cliente, telefone1_cliente,telefone2_cliente,  data_nascimento_cliente	, 
          sexo_cliente, cep_cliente, uf_cliente, cidade_cliente, bairro_cliente, rua_cliente 
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
      bairro_cliente,
      rua_cliente,
      // numero_rua_cliente
      
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
                    <h2 className="mb-5">Cadastro de Clientes</h2>
             
                    <CForm onSubmit={handleSubmit(onSubmit)} > 
                      <CRow className="mb-8">
                        
                        <CFormLabel htmlFor="nome_cliente" className="col-sm-2 col-form-label">Nome<span>*</span></CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" id="nome_cliente" name='nome_cliente'                           
                            {...register("nome_cliente",
                            {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres"
                              }
                            }) }
                            />{errors.nome_cliente && <span className='errors-alert'>{errors.nome_cliente.message}</span>}
                          </CCol>
                      
                          <CFormLabel htmlFor="sobrenome_cliente" className="col-sm-2 col-form-label">Sobrenome<span>*</span></CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" name='sobrenome_cliente' id="sobrenome_cliente"                          
                            {...register("sobrenome_cliente", {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres"
                              }
                            })}                                                    
                            />{errors.sobrenome_cliente && <span className='errors-alert'>{errors.sobrenome_cliente.message}</span>}
                          </CCol>
                          
                    
                      </CRow>

                      <CRow className="mb-8">

                      <CFormLabel htmlFor="cpf_cliente" className="col-sm-2 col-form-label">CPF/CNPJ<span>*</span></CFormLabel>
                      <CCol sm={4}>
                      <CFormInput
                              type="text"
                              name="cpf_cliente"
                              id="cpf_cliente"
                              required
                              {...register('cpf_cliente')}
                              onChange={handleChangeMask}
                            />                                           
                          </CCol>

                        <CFormLabel htmlFor="telefone1_cliente" className="col-sm-2 col-form-label">Telefone 1<span>*</span></CFormLabel>
                            <CCol sm={4}>
                            <CFormInput type='number' name='telefone1_cliente' id='telefone1_cliente' 
                               {...register("telefone1_cliente", {
                                required: "Preenchimento obrigatório",
                               
                              })}
                              />          
                            </CCol>

                            </CRow>

                        <CRow className="mb-8">
                        {/* <CFormLabel htmlFor="telefone2_cliente" className="col-sm-2 col-form-label">Telefone 2</CFormLabel>
                            <CCol sm={4}>
                            <CTooltip content="Favor inserir no numero de telefone com DDD sem espaços ou caracteres especiais">
                            <CFormInput type='number' name='telefone2_cliente' id='telefone2_cliente' 
                               {...register("telefone2_cliente")}
                              />  
                            </CTooltip>                                                             
                            </CCol> */}

                          <CFormLabel htmlFor="telefone2_cliente" className="col-sm-2 col-form-label">Telefone 2</CFormLabel>
                          <CCol sm={4}>
                              <CFormInput type='number' name='telefone2_cliente' id='telefone2_cliente' 
                               {...register("telefone2_cliente")}
                              />  
                           </CCol> 


                          <CFormLabel htmlFor="data_nascimento" className="col-sm-2 col-form-label">Data de nascimento</CFormLabel>
                              <CCol sm={4}>
                          <CFormInput type='date'  name='data_nascimento_cliente' id='data_nascimento_cliente' 
                          {...register("data_nascimento_cliente")}
                          />                                                    
                            </CCol>
                          </CRow>


                        <CRow className="mb-8">

                         <CFormLabel htmlFor="modelo_veiculo" className="col-sm-2 col-form-label">Sexo</CFormLabel>
                              <CCol sm={4}>
                                <input type='radio'name='sexo'  value="masculino"  {...register("sexo_cliente")}/> Masculino
                                <input type='radio'name='sexo'  value="femenino"  {...register("sexo_cliente")}/> Femenino
                               
                              </CCol>


                          <CFormLabel htmlFor="cep_cliente" className="col-sm-2 col-form-label">CEP<span>*</span></CFormLabel>
                              <CCol sm={4}>
                                <CTooltip content="Após inserir o CEP, favor clicar fora do campo" >
                                  <CFormInput type='number' id='cep_cliente' name='cep_cliente' placeholder='Ex: 96418260'
                                  value={cep} onChange={handleChangeCep}
                                  onBlur={buscarEndereco} required  
                                  />                                                             
                                </CTooltip>                                                     
                              </CCol>

                              </CRow>


                      <CRow className="mb-8">
                        
                        <CFormLabel htmlFor="uf" className="col-sm-2 col-form-label">Estado</CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" id="uf" name='uf'
                            value={estado} onChange={(e) => setEstado(e.target.value)}  
                             {...register('uf_cliente')}                       

                            />                        
                          </CCol>

                          <CFormLabel htmlFor="cidade" className="col-sm-2 col-form-label">Cidade</CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" id="localidade" name='localidade' disabled
                            value={cidade} onChange={(e) => setCidade(e.target.value)}  required 
                            {...register('cidade_cliente')}
                            />                        
                          </CCol>

                          </CRow>

                          <CRow className="mb-8">
                        
                        <CFormLabel htmlFor="bairro" className="col-sm-2 col-form-label">Bairro</CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" id="bairro" name='bairro' disabled
                            value={bairro} onChange={(e) => setBairro(e.target.value)}  required 
                            {...register('bairro_cliente')}
                            />                         
                          </CCol>

                          <CFormLabel htmlFor="rua" className="col-sm-2 col-form-label">Rua</CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" id="rua" name='rua'   disabled
                            value={logradouro} onChange={(e) => setLogradouro(e.target.value)}                           
                            {...register('rua_cliente')} required
                          />
                          </CCol>

                          </CRow>

                          <CRow className="mb-8">
                        
                        <CFormLabel htmlFor="numero" className="col-sm-2 col-form-label">Número</CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="number" id="numero" name='numero' 
                            {...register('numero_rua_cliente')}
                            />                                                    
                          </CCol>

                          </CRow> 

                          <CRow className="mb-8">    

                              <CCol sm={2}>
                                <CButton type='submit'>Cadastrar</CButton>
                              </CCol>
                              
                          </CRow> 

                    
                      
                      
                    </CForm>

                          <form>
                        
                          </form>

                    </FormArea>

                   {/*Exibicao do Toast Success */}

                  <ToastMessageStyle> 
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
                  </ToastMessageStyle>  

                  {isLoading && (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}

                  {isTimeout && (
             <ToastMessageStyle> 
                      <Toast show={isTimeout} onClose={() => closeToastCadError()} className='toastCadError'>
                      <Toast.Header className='toastCadErrorHeader'>
                        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                        <strong className="me-auto">Cadastro de cliente</strong>
                        <small></small>
                        </Toast.Header>
                        <Toast.Body><p className='MsgBodyToast'>Erro de comunicação com o servidor</p>
                        </Toast.Body>
                      </Toast>
            </ToastMessageStyle> 

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


export default Cliente
