import { useEffect, useState } from "react";

 const teste = () => {

    //search CPF
    const [cpfSearch, setCpfSearch] = useState([]);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const response = await fetch(`http://192.168.0.109:4000/trocaCpf/${valor}`);
    //     const data = await response.json(); 
    //     if(data && data.length > 0){
    //         setCpfSearch(data.cpfTroca);
    //     }else{
    //         setCpfSearch(null);
    //     }
    //     setCpfSearch(data);
    //   };

    //   const [valor, setValor] = useState('');

      useEffect(()=> {
        async function fetchData() {
            const response = await fetch(`http://192.168.0.109:4000/trocaCpf/020.418.840-70`);
            const data = await response.json();
            console.log("dados dentro do useEffect: ", data);

                setCpfSearch(data);



            // const parsedData = JSON.parse(data);
            // // setCpfSearch(parsedData)
            // if (parsedData && parsedData.length > 0 ){
            //     setCpfSearch(parsedData.cpfTroca);
            // }
          }
          fetchData();

      }, [])



    return (
        <div> 


            {/* <input type='text'  className='inputSearch--1' 
                placeholder='Insira o CPF do proprietário'
                name='cpf_cnpj' id="cpf_cnpj"  onChange={(e) => setValor(e.target.value)}
                onBlur={handleSubmit}  value={valor}
                
                                            
            />   */}

                {console.log("teste dentro do componente:", cpfSearch.cpfTroca)}

                    {cpfSearch.codcliente}
                    {cpfSearch.nome_cliente}
                

                <div>Teste</div>
              
    
                {/* {cpfSearch.map((item, index) => (
                    <li key={index}>{item.cpfTroca} </li>
                    ))} */}

        </div>
    )

}



export default teste;