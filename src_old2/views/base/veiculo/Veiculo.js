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
  CButtonGroup,
  
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
import { useEffect } from 'react'
import {mask} from '../../../components/CnpjCpf/cpf';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';


  const Veiculo = () => {


  const {register, handleSubmit, formState: { errors } } =  useForm(); //cuida das validacoes dos campos
 

  //busca veículos da api fipe

  const[buscaVeiculo, setBuscaVeiculo] = useState(''); //guarda o tipo de veiculo selecionado
  const [options, setOptions] = useState([]); // estado para armazenar as opções relacionadas à categoria selecionada

  
     // Efeito colateral para buscar as opções relacionadas à categoria selecionada na API
  useEffect(() => {
    async function fetchOptions() {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${buscaVeiculo}/marcas`);
      const data = await response.json();
      setOptions(data);
    }
    if (buscaVeiculo) {
      fetchOptions();
    }
  }, [buscaVeiculo]);


      const buscaVeiculos =  async () =>{
      const  response = await fetch(`https://parallelum.com.br/fipe/api/v1/${buscaVeiculo}/marcas`);
        return response();
      }

      //Mascara  CPF/CNPJ

      const [valor, setValor] = useState('');

      const handleChangeMask = (event) =>{
        const { value } = event.target
      
        setValor(mask(value))
      }


      //Válida campo select

      // const validaSelect = () => {
      //   var campoSelect = document.getElementById("tipo_veiculo");
      //   if(campoSelect.value == "" || campoSelect.value == "Selecione uma opção") {
      //     alert("Preencha o tipo do veiculo");
      //   } 
      // }

     

  return (
    <>

  
<container-xl>
        <CRow className="justify-content-center">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <FormArea>
                    <h2 className="mb-5">Cadastro de veículos</h2>
             
                   <CForm onSubmit={handleSubmit()}  name='cad_veiculo'> 
                     <CRow className="mb-8">
                      
                      <CFormLabel htmlFor="proprietario" className="col-sm-2 col-form-label">CPF<span>*</span></CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="text" name='cpf_cnpj' id="cpf_cnpj" onChange={handleChangeMask} value={valor}                        
                          required
                        /> 
                        </CCol>
                    
                        <CFormLabel htmlFor="nomeProprietario" className="col-sm-2 col-form-label">Nome <span>*</span></CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="text" name='nomeProprietario' id="nomeProprietario"                          
                          {...register("nomeProprietario", {
                            required: "Preenchimento obrigatório",
                            minLength: {
                              value: 3,
                              message: "Mínimo 6 caracteres"
                            }
                          })}                                                    
                          />{errors.nomeProprietario && <span className='errors-alert'>{errors.nomeProprietario.message}</span>}
                        </CCol>
                        
                   
                    </CRow>

                    <CRow className="mb-8">

                    <CFormLabel htmlFor="sobrenome" className="col-sm-2 col-form-label">Sobrenome <span>*</span></CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" name='sobrenome' id="sobrenome"                          
                            {...register("sobrenome", {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 4,
                                message: "Mínimo 4  caracteres"
                              }
                            })}                                                    
                            />{errors.sobrenome && <span className='errors-alert'>{errors.sobrenome.message}</span>}
                          </CCol>

                       <CFormLabel htmlFor="placaVeiculo" className="col-sm-2 col-form-label">Placa do Veículo <span>*</span></CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="text" name='placaVeiculo' id="placaVeiculo"                          
                            {...register("placaVeiculo", {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 7,
                                message: "Mínimo 7 Dígitos"
                              }
                            })}                                                    
                            />{errors.placaVeiculo && <span className='errors-alert'>{errors.placaVeiculo.message}</span>}
                          </CCol>

                          </CRow>

                      <CRow className="mb-8">

                      <CFormLabel htmlFor="tipo_veiculo" className="col-sm-2 col-form-label">Tipo Veículo <span>*</span></CFormLabel>
                            <CCol sm={4}>
                              <CFormSelect aria-label="Default select example" id='tipo_veiculo' value={buscaVeiculo} name='tipo_veiculo' onChange={e=>setBuscaVeiculo(e.target.value)}                            
                                required
                              > 
                                
                                <option>Selecione uma opção</option>
                                <option value="carros">Carro</option>
                                <option value="motos">Moto</option>
                                <option value="caminhoes">Caminhão</option>

                              </CFormSelect>                         
                               {/*   <p>o tipo do veiculo selecionado foi: {buscaVeiculo}</p>    */}                                   
                                {errors.tipo_veiculo && <span className='errors-alert'>{errors.tipo_veiculo.message}</span>}
                            </CCol>
                            
                        <CFormLabel htmlFor="marca_veiculo" className="col-sm-2 col-form-label">Marca do Veículo <span>*</span></CFormLabel>
                            <CCol sm={4}>
                            <CFormSelect name='marca_veiculo' id='options'                           
                            > 
                              <option value={buscaVeiculos()}>Selecionae uma opção</option> {/*vai buscar os dados da API  */}
                                {options.map(option=>(
                                  //busca os dados da api conforme busca no campo tippo do veiculo
                                  <option key={option.codigo} value={option.codigo}>{option.nome}</option>
                                   
                              ))}
                               
                              
                              {/* {alert(resultBuscaveiculo)} */}

                            </CFormSelect>                                                     
                             {errors.marca_veiculo && <span className='errors-alert'>{errors.marca_veiculo.message}</span>}
                            </CCol>

                            </CRow>


                      <CRow className="mb-8">

                      <CFormLabel htmlFor="modelo_veiculo" className="col-sm-2 col-form-label">Modelo do Veículo <span>*</span></CFormLabel>
                            <CCol sm={4}>
                            <CFormInput type='text' name='modelo_veiculo' id='modelo_veiculo'
                             {...register("modelo_veiculo", {
                              required: "Preenchimento obrigatório",
                              minLength: {
                                value: 3,
                                message: "Mínimo 3 Dígitos"
                              }
                            })}    
                            />                                                                                                      
                              {errors.modelo_veiculo && <span className='errors-alert'>{errors.modelo_veiculo.message}</span>}
                            </CCol>


                        <CFormLabel htmlFor="cor_veiculo" className="col-sm-2 col-form-label">Cor do Veículo</CFormLabel>
                            <CCol sm={4}>
                            <CFormInput id='cor_veiculo' name='cor_veiculo'/>
                                                                                 
                             {errors.marca_veiculo && <span className='errors-alert'>{errors.marca_veiculo.message}</span>}
                            </CCol>

                            </CRow>


                    <CRow className="mb-8">
                      
                      <CFormLabel htmlFor="ano_fabricacao" className="col-sm-2 col-form-label">Ano de Fabricação</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="number" id="ano_fabricacao" name='ano_fabricacao' />                        
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


export default Veiculo
