import React, { useEffect, useState } from 'react'
import {PageArea} from './styled';
import {mask} from '../../../../components/CnpjCpf/cpf';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { Tooltip } from 'bootstrap';
import data from '../../../../components/tooltip/tooltip'




const Veiculos = () => {


     //mascara para cnpj
     const [valor, setValor] = useState('');


     const handleChangeMask = (event) =>{
       const { value } = event.target
     
       setValor(mask(value))
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

    return (

        

        <div>

            

        <PageArea>
            <div className='searchArea'>
                
                    <form>
                            <input type='text'  className='inputSearch--1' 
                                placeholder='Insira o CPF do proprietário'
                                name='cpf_cnpj' id="cpf_cnpj"  onChange={handleChangeMask} value={valor}
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

    </PageArea>
        </div>
    )
}

export default Veiculos;