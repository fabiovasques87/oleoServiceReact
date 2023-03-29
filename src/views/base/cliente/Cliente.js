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
  CFormSelect
  
} from '@coreui/react'
import { CFormFeedback } from '@coreui/react'
import { DocsExample } from 'src/components'
import { CFormText } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import { CForm,CFormInput,CButton,CFormCheck,CContainer,CCardGroup,CInputGroup,CInputGroupText } from '@coreui/react'
import {FormArea} from './styled';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Formik,withFormik } from 'formik';
import axios from 'axios';



  const Cliente = () => {


  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  async function buscarEndereco() {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setEstado(response.data.uf);
    } catch (error) {
      console.log(error);
    }
  }

    const {register, handleSubmit, formState: { errors } } =  useForm();
    const onSubmit = async data => {
      await login(data.email, data.password);
      reset();
    };
  

  return (
    <>

  
{/* <form>
      <label>
        CEP:
        <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
      </label>
      <button type="button" onClick={buscarEndereco}>Buscar Endereço</button>

      <label>
        Logradouro:
        <input type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
      </label>

      <label>
        Bairro:
        <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
      </label>

      <label>
        Cidade:
        <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
      </label>

      <label>
        Estado:
        <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
      </label>
    </form> */}


<container-xl>
        <CRow className="justify-content-center">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <FormArea>
                    <h2 className="mb-5">Cadastro de Clientes</h2>
             
                   <CForm onSubmit={handleSubmit()} > 
                     <CRow className="mb-8">
                      
                      <CFormLabel htmlFor="nome_cliente" className="col-sm-2 col-form-label">Nome do Cliente</CFormLabel>
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
                    
                        <CFormLabel htmlFor="sobrenome_cliente" className="col-sm-2 col-form-label">Sobrenome  do Cliente</CFormLabel>
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

                    <CFormLabel htmlFor="cpf_cnpj" className="col-sm-2 col-form-label">CPF/CNPJ</CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" name='cpf_cnpj' id="cpf_cnpj"                          
                            {...register("cpf_cnpj", {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 4,
                                message: "Mínimo 4  caracteres"
                              }
                            })}                                                    
                            />{errors.cpf_cnpj && <span className='errors-alert'>{errors.cpf_cnpj.message}</span>}
                          </CCol>

                       <CFormLabel htmlFor="tel_1" className="col-sm-2 col-form-label">Telefone 1</CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="number" name='tel_1' id="tel_1"                          
                            {...register("tel_1", {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 9,
                                message: "Mínimo 9 Dígitos"
                              }
                            })}                                                    
                            />{errors.tel_1 && <span className='errors-alert'>{errors.tel_1.message}</span>}
                          </CCol>

                          </CRow>

                      <CRow className="mb-8">
                      <CFormLabel htmlFor="tel_2" className="col-sm-2 col-form-label">Telefone 2</CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="number" name='tel_2' id="tel_2"                                                                        
                            />{errors.tel_2 && <span className='errors-alert'>{errors.tel_2.message}</span>}
                          </CCol>

                        <CFormLabel htmlFor="data_nasci" className="col-sm-2 col-form-label">Data de nascimento</CFormLabel>
                            <CCol sm={4}>
                         <CFormInput type='date'  name='date_nasci' id='date_nasci'/>                                                    
                            </CCol>

                            </CRow>


                      <CRow className="mb-8">

                      <CFormLabel htmlFor="modelo_veiculo" className="col-sm-2 col-form-label">Sexo</CFormLabel>
                            <CCol sm={4}>
                              <input type='radio'name='sexo'  value="sexo_masculino"/> Masculino
                              <input type='radio'name='sexo'  value="sexo_femenino"/> Femenino

                             </CCol>


                        <CFormLabel htmlFor="cep" className="col-sm-2 col-form-label">CEP</CFormLabel>
                            <CCol sm={4}>
                            <CFormInput type='number' id='cep' name='cep'
                            value={cep} onChange={(e) => setCep(e.target.value)}
                            onBlur={buscarEndereco} required
                            />
                                                                                 
                            </CCol>

                            </CRow>


                    <CRow className="mb-8">
                      
                      <CFormLabel htmlFor="uf" className="col-sm-2 col-form-label">Estado</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="text" id="uf" name='uf' 
                          value={estado} onChange={(e) => setEstado(e.target.value)}                           
                          {...register("uf",
                          {
                            required: "Preenchimento obrigatório",
                            
                          }) }
                          />{errors.uf && <span className='errors-alert'>{errors.uf.message}</span>}
                        </CCol>

                        <CFormLabel htmlFor="cidade" className="col-sm-2 col-form-label">Cidade</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="text" id="cidade" name='cidade' 
                           value={cidade} onChange={(e) => setCidade(e.target.value)}  required />                        
                        </CCol>

                        </CRow>

                        <CRow className="mb-8">
                      
                      <CFormLabel htmlFor="bairro" className="col-sm-2 col-form-label">Bairro</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="text" id="bairro" name='bairro'
                          value={bairro} onChange={(e) => setBairro(e.target.value)}  required />                         
                        </CCol>

                        <CFormLabel htmlFor="rua" className="col-sm-2 col-form-label">Rua</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="text" id="rua" name='rua'
                          value={logradouro} onChange={(e) => setLogradouro(e.target.value)}                           
                          required
                        />
                        </CCol>

                        </CRow>

                        <CRow className="mb-8">
                      
                      <CFormLabel htmlFor="numero" className="col-sm-2 col-form-label">Número</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="number" id="numero" name='numero' />                                                    
                        </CCol>

                        </CRow>

                        <CRow className="mb-8">    

                            <CCol sm={4}>
                              <button>Cadastrar</button>
                            </CCol>
                            
                        </CRow> 

                  
                    
                    
                   </CForm>
                    </FormArea>
                </CCardBody>
              </CCard>
            </CCardGroup>
        </CRow>
      </container-xl>
    </>
  )
}


export default Cliente
