import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import {PageArea} from './styled';



const WidgetsDropdown = () => {



  // const [dados, setDados] = useState([]);

//exibe a quantidade de trocas vencidas

  const [vencidos, setVencidos] = useState(null);

useEffect(() => {
  async function fetchData() {
    const response = await fetch('http://192.168.0.104:4000/trocavencidas');
    // const response = await fetch('http://localhost:4000/trocavencidas');
    const data = await response.json();
    const parsedData = JSON.parse(data);
    if (parsedData && parsedData.length > 0 ){
      setVencidos(parsedData[0].vencidas);
    }
  }
  fetchData();
  //console.log('seus Dados:', teste);
}, []);

//exibe a quantidade de trocas a vencer

const [valorVencer, setValorVencer] = useState(null);

useEffect(() => {
  async function fetchData() {
    const response = await fetch('http://192.168.0.104:4000/trocaAVencer');
    const data = await response.json();
    console.log("dados: ", data);
    const parsedData = JSON.parse(data);
    if (parsedData && parsedData.length > 0 ){
      setValorVencer(parsedData[0].vencer);
    }
  }
  fetchData();
}, []);

//exibe todas as trocas realizadas

const [trocasAll, setTrocasAll] = useState(0);

useEffect(() => {
  async function fetchData() {
    const response = await fetch('http://192.168.0.104:4000/searchServicos');
    const data = await response.json();
    setTrocasAll(data);
  }
  fetchData();
  //console.log('seus Dados:', teste);
}, []);
  

  return (
    
   <>


 <PageArea>
    <CRow>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={<>

              {/*
              26K{' '}
              <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span>
          */}
            </>}
           // title="Trocas de óleo realizadas"
            action={<CDropdown alignment="end">
              {/*
            <CDropdownToggle color="transparent" caret={false} className="p-0">
              <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
            </CDropdownToggle>
          */}


              <div className="card1">
                  {trocasAll.services}  
              </div> 

            </CDropdown>}
            
            chart={<CChartLine

              style={{ height: '100px' }} />} />

              
        </CCol>

        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={<>
              {/*
              26K{' '}
              <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span>
          */}
            </>}
            //title="Trocas à vencer"
            action={<CDropdown alignment="end">
              {/*
             <CDropdownToggle color="transparent" caret={false} className="p-0">
               <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
             </CDropdownToggle>
           */}

            <div className="card2">
              {valorVencer}
            </div> 
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>}
            chart={<CChartLine

              style={{ height: '100px' }} />} />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={<>
              {/*
              26K{' '}
              <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span>
          */}
            </>}
           // title="Trocas vencidas"
            action={<CDropdown alignment="end">
              {/*
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
            */}

              <div className="card3">
                  {/* {dados.map((item)=>(
                     <li key={item.cod_servicos}>{item.cod_servicos}</li> 
                  ))} */}

            
                {vencidos}

              </div> 
              {/* {dados.map((item, index)=>(
                <div key={index}>{item.proxima_troca}</div>
              ))} */}

              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>}
            chart={<CChartLine
              
              style={{ height: '100px' }} />} />
        </CCol>
      </CRow>
      </PageArea> 
      {/* {valorVencer !== null ? `Valor a vencer: ${valorVencer}` : 'Carregando...'}   */}


      </>
       


  )
}

export default WidgetsDropdown
