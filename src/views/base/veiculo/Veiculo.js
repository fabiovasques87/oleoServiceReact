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



  // const {
  //   register,
  //   handleSubmit,
  //   formState: {errors},
  //   reset,
  // } = useForm ({resolver: yupResolver(schema)});

  // const onSubmitHandler = (data: ISignin) => {
  //   console.log(data);
  //   reset()
  // };



  const Veiculo = () => {


  


  // // const [veiculo, setVeiculo] = useState({
  // //   email:'',
  // //   password:''
  // // });

  // // const [status, setStatus] = useState({
  // //   type:'',
  // //   mensagem:''
  // // });


  // // const valueInput = e=> setVeiculo({...veiculo,[e.target.email]: e.target.value });

  // // const AddVeiculo = async e => {
  // //   e.preventDefault();



  // //   if(!(await validate())) return; // se retornar diferente de null, retorna e não continua o processamento
  // //   //validação


  // //   const saveDataForm = true; //aqui pode fazer a requisissao para o back...

  // //   if(saveDataForm){
  // //     setStatus({
  // //       type:'success',
  // //       mensagem: 'veículo cadastrado com sucesso!'
  // //     });

  // //     setVeiculo({
  // //       email:'',
  // //       password:''
  // //     });

  // //   }else{
  // //     setStatus({
  // //       type: 'error',
  // //       mensagem:'Erro: não cadastrado!'
  // //     });
  // //   }



  


  // // const validate = async () => {
  // //     const schema = yup.object().shape({
  // //       email: yup.string("erro:").email().required("Erro:"),
  // //       password: yup.string().min(8).max(32).required("Erro:"),
  // //   });

  // //   try{
  // //     await schema.validate(veiculo);
  // //     return true;
  // //   }catch(err) {
  // //     setStatus({
  // //       type: 'error',
  // //       mensagem: err.errors
  // //     });
  // //     return false; //indica que houve erros
  // //   }

  // // }

  // }



   

  // validate: values => {
  //   const {email, password} = values
  //   const errors = {}

  //   if(!email) {
  //     errors.email= 'Informe o email!'
  //   }else if(email.length < 5){
  //     errors.email = 'infrome um e-mail!'
  //   }

  //   if(!password) errors.password= 'Informe uma senha!'

  //   if(!password) errors.password= 'Informe a senha'

  //   return errors


  // }

  // const mySchema = yup.object().shape({
  //   email: yup.string().required(),
  //   // password: yup.string().min(8).max(32).required()
  // });

  const {register, handleSubmit, formState: { errors } } =  useForm();
  const onSubmit = async data => {
    await login(data.email, data.password);
    reset();
  };

  return (
    <>

  
<container-xl>
        <CRow className="justify-content-center">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <FormArea>
                    <h1 className="mb-5">Cadastro de veículos</h1>
             
                   <CForm onSubmit={handleSubmit()} > 
                     <CRow className="mb-8">
                      
                      <CFormLabel htmlFor="proprietario" className="col-sm-2 col-form-label">CPF Proprietário</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="text" id="proprietario" name='cpfProprietario'                           
                          {...register("cpfProprietario",
                          {
                            required: "Preenchimento obrigatório",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "O valor inserido não corresponde ao formato de e-mail"
                            }
                          }) }
                          />{errors.cpfProprietario && <span className='errors-alert'>{errors.cpfProprietario.message}</span>}
                        </CCol>
                    
                        <CFormLabel htmlFor="nomeProprietario" className="col-sm-2 col-form-label">Nome do proprietario</CFormLabel>
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

                    <CFormLabel htmlFor="sobrenome" className="col-sm-2 col-form-label">Sobrenome</CFormLabel>
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

                       <CFormLabel htmlFor="placaVeiculo" className="col-sm-2 col-form-label">Placa do Veículo</CFormLabel>
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

                      <CFormLabel htmlFor="tipo_veiculo" className="col-sm-2 col-form-label">Tipo Veículo</CFormLabel>
                            <CCol sm={4}>
                            <CFormSelect aria-label="Default select example" 
                             {...register("tipo-veiculo", {
                              required: "Preenchimento obrigatório",
                              
                            })} 
                            
                            > 
                              <option>Carro</option>
                              <option>Moto</option>
                              <option>Caminhão</option>

                            </CFormSelect>                         
                                                                                
                              {errors.tipo_veiculo && <span className='errors-alert'>{errors.tipo_veiculo.message}</span>}
                            </CCol>
                        <CFormLabel htmlFor="marca_veiculo" className="col-sm-2 col-form-label">Marca do Veículo</CFormLabel>
                            <CCol sm={4}>
                            <CFormSelect id='marca_veiculo' name='marca_veiculo' 
                             {...register("marca_veiculo", {
                              required: "Preenchimento obrigatório",
                              
                            })} 
                            
                            > 
                              <option>Volkswagem</option>
                              <option>Chevrollet</option>
                              <option>Fiat</option>

                            </CFormSelect>                                                     
                             {errors.marca_veiculo && <span className='errors-alert'>{errors.marca_veiculo.message}</span>}
                            </CCol>

                            </CRow>


                      <CRow className="mb-8">

                      <CFormLabel htmlFor="modelo_veiculo" className="col-sm-2 col-form-label">Modelo do Veículo</CFormLabel>
                            <CCol sm={4}>
                            <CFormSelect name='modelo_veiculo' id='modelo_veiculo' 
                             {...register("modelo_veiculo", {
                              required: "Preenchimento obrigatório",
                              
                            })} 
                            
                            > 
                              <option>ONIX</option>
                              <option>GOL</option>
                              <option>UNO</option>

                            </CFormSelect>                                                                                                         
                              {errors.tipo_veiculo && <span className='errors-alert'>{errors.tipo_veiculo.message}</span>}
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
                          <CFormInput type="number" id="ano_fabricacao" name='ano_fabricacao'                           
                          {...register("ano_fabricacao",
                          {
                            required: "Preenchimento obrigatório",
                            
                          }) }
                          />{errors.ano_fabricacao && <span className='errors-alert'>{errors.ano_fabricacao.message}</span>}
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
