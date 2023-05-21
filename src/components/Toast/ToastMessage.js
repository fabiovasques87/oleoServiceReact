import React, { useState, useEffect } from 'react'
import Toast from 'react-bootstrap/Toast';



export const ToastMessage = () =>{


    const [showToastCadClient, setToastCadClient] = useState(false);
    const [message, setMessage] = useState('');

    const closeToastCadClient = () => {
      setToastCadClient(false);
    }

    useEffect(() => {
      if (showToastCadClient) {
        // Define o tempo em milissegundos para exibir o Toast por 6 segundos
        const timeout = setTimeout(() => {
          setToastCadClient(false);
        }, 6000);
    
        return () => {
          clearTimeout(timeout);
        };
      }
    }, [showToastCadClient]);

    <Toast show={showToastCadClient} onClose={() => closeToastCadClient()} className='toastCadClient'>
        <Toast.Header>
        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
        <strong className="me-auto">Cadastro de cliente</strong>
        <small></small>
        </Toast.Header>
        <Toast.Body className='ToasBody'><p>{message}</p>
        </Toast.Body>
    </Toast>

}


