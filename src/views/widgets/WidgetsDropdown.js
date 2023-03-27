import React from 'react';
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
            title="Trocas de óleo realizadas"
            action={<CDropdown alignment="end">
              {/*
            <CDropdownToggle color="transparent" caret={false} className="p-0">
              <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
            </CDropdownToggle>
          */}


              <div className="card1">200</div> 

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
            title="Trocas à vencer"
            action={<CDropdown alignment="end">
              {/*
             <CDropdownToggle color="transparent" caret={false} className="p-0">
               <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
             </CDropdownToggle>
           */}

            <div className="card2">10</div> 
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
            title="Trocas vencidas"
            action={<CDropdown alignment="end">
              {/*
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
            */}

              <div className="card3">20</div> 
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
      </>
       


  )
}

export default WidgetsDropdown
