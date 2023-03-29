import React , { useState }  from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import InputMask from "react-input-mask";
import ReactDOM from "react-dom";
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";







 
const Teste = (props) => {


  const [cpfCnpj, setCpfCnpj] = useState("");
  const [mask, setMask] = useState("");

  const mySchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().min(8).max(32).required()
  });

  const {register, handleSubmit, formState: { errors } } =  useForm({
    resolver: yupResolver(mySchema)
  })

  return (
    <>
      <form onSubmit={handleSubmit()}>
        <input type='text' name='email' 
        {...register("email")}                        
        /><p className='errors-message'>{errors.email?.message}</p>

        <input type='password' name='password' 
        {...register("password")}                        
        /><p className='errors-message'>{errors.password?.message}</p>

<InputMask mask="99999-999" value={props.value} onChange={props.onChange} />

 

        <input type='submit' />
    </form>
    </>
  )




}

export default Teste;