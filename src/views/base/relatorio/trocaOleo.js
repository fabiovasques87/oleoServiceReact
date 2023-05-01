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
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';



const TrocaOleo = () => {

    const {register, handleSubmit, formState: { errors } } =  useForm(); //cuida das validacoes dos campos

    const [dados, setDados] = useState({});

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('http://localhost:4000/trocavencidas');
        const data = await response.json();
        setDados(data);
      }
      fetchData();
    }, []);
    

    




    return (
        <>
        


        {dados.cod_servicos}

            <CContainer>
            <CRow className="justify-content-center">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <FormArea>
                    <h2 className="mb-5">Relatorio de troca de óleo</h2>
                    <CForm onSubmit={handleSubmit()}  name='cad_veiculo'> 
                        <CRow className="mb-8">
                            <CFormLabel htmlFor="placaVeiculo" className="col-sm-2 col-form-label">Data Inicial <span>*</span></CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="date" name='placaVeiculo' id="placaVeiculo"                          
                                    {...register("placaVeiculo", {
                                    required: "Preenchimento obrigatório",
                                    minLength: {
                                        value: 7,
                                        message: "Mínimo 7 Dígitos"
                                    }
                                    })}                                                    
                                    />{errors.placaVeiculo && <span className='errors-alert'>{errors.placaVeiculo.message}</span>}
                                </CCol>
                                <CFormLabel htmlFor="placaVeiculo" className="col-sm-2 col-form-label">Data Final <span>*</span></CFormLabel>
                                <CCol sm={4}>
                                    <CFormInput type="date" name='placaVeiculo' id="placaVeiculo"                          
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
                            <CRow className="mb">
                                <CCol sm={12}>
                                    <CFormSelect >
                                        <option>Selecione uma Unidade</option>
                                        <option>Sampaio</option>
                                        <option>Express</option>

                                    </CFormSelect>
                                </CCol>
                            </CRow>
                            <CRow className="mb-8">    
                                <CCol sm={4}>
                                <button>Consultar</button>
                                </CCol>
                            </CRow> 

                    </CForm>
                    </FormArea>
                </CCardBody>
              </CCard>
            </CCardGroup>
        </CRow>

            </CContainer>

          
        
        </>
    );
}

export default TrocaOleo;