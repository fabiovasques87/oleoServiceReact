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


  


  const [veiculo, setVeiculo] = useState({
    email:'',
    password:''
  });

  const [status, setStatus] = useState({
    type:'',
    mensagem:''
  });


  const valueInput = e=> setVeiculo({...veiculo,[e.target.email]: e.target.value });

  const AddVeiculo = async e => {
    e.preventDefault();



    if(!(await validate())) return; // se retornar diferente de null, retorna e não continua o processamento
    //validação


    const saveDataForm = true; //aqui pode fazer a requisissao para o back...

    if(saveDataForm){
      setStatus({
        type:'success',
        mensagem: 'veículo cadastrado com sucesso!'
      });

      setVeiculo({
        email:'',
        password:''
      });

    }else{
      setStatus({
        type: 'error',
        mensagem:'Erro: não cadastrado!'
      });
    }



  


  const validate = async () => {
      const schema = yup.object().shape({
        email: yup.string("erro:").email().required("Erro:"),
        password: yup.string().min(8).max(32).required("Erro:"),
    });

    try{
      await schema.validate(veiculo);
      return true;
    }catch(err) {
      setStatus({
        type: 'error',
        mensagem: err.errors
      });
      return false; //indica que houve erros
    }

  }

  }

  return (
    <>

    

  {/* <CRow className="mb-3">
    <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</CFormLabel>
      <CCol sm={4}>
        <CFormInput type="text" id="staticEmail" defaultValue="email@example.com" />
      </CCol>
  
      <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</CFormLabel>
      <CCol sm={4}>
        <CFormInput type="password" id="inputPassword"/>
      </CCol>
  </CRow> */}

<container-xl>
        <CRow className="justify-content-center">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <FormArea>
                    <h1 className="mb-5">Cadastro de veículos</h1>
                    {/* <div className="AreaForm">
                      <form>
                      <label> Nome
                        <input type='text' />
                      </label>
                      <label>Sobrenome
                        <input type='text' />
                      </label>
                      <label>Sobrenome
                        <input type='text' />
                      </label>
                      <label>Sobrenome
                        <input type='text' />
                      </label>
                      <label>Sobrenome
                        <input type='text' />
                      </label>
                      </form>
                    </div> */}


                  <CForm onSubmit={AddVeiculo} >
                    <CRow className="mb-8">
                      
                      <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="text" id="staticEmail" name='email' defaultValue="email@example.com" 
                          onChange={valueInput} value={veiculo.email} 
                          /><br />
                        </CCol>
                    
                        <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="password" name='password' id="inputPassword"
                          onChange={valueInput} value={veiculo.password} 
                          /><br />
                        </CCol>
                        
                    </CRow>

                    <CRow className="mb-8">
                      <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="text" id="staticEmail" defaultValue="email@example.com" />
                        </CCol>
                    
                        <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</CFormLabel>
                        <CCol sm={4}>
                          <CFormInput type="password" id="inputPassword"/>
                        </CCol>

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
