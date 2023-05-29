import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const Veiculo = React.lazy(() => import('./views/base/veiculo/Veiculo')) //cadastro de veiculos
const Cliente = React.lazy(() => import('./views/base/cliente/Cliente')) //cadastro de clientes
const Diversos = React.lazy(() => import('./views/base/consulta/diversos/Diversos')) //consulta de diversos
const ConsultaCliente = React.lazy(() => import('./views/base/consulta/cliente/ConsultaCliente')) //consulta de clientes
const ConsultaVeiculo = React.lazy(() => import('./views/base/consulta/veiculo/ConsultaVeiculo'))//consulta de veiculos
const trocaOleo = React.lazy(()=> import('./views/base/relatorio/trocaOleo'))
const teste = React.lazy(()=> import('./views/base/teste/teste'))



// // Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

// //Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

//const Charts = React.lazy(() => import('./views/charts/Charts'))




const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base/veiculo', name: 'Veiculo', element: Veiculo, exact: true },//cad veiculos
  { path: '/base/cliente', name: 'Cliente', element: Cliente, exact: true },//cad clientes
  { path: '/base/consulta/diversos', name: 'Diversos', element: Diversos, exact: true },//consulta diversos
  { path: '/base/consulta/cliente', name: 'ConsultaCliente', element: ConsultaCliente, exact: true },//consulta Clientes
  { path: '/base/consulta/veiculo', name: 'ConsultaVeiculo', element: ConsultaVeiculo, exact: true },//consulta Veículos
  { path: '/base/relatorio', name: 'trocaOleo', element: trocaOleo, exact: true },//consulta Veículos
  { path: '/base/teste', name: 'teste', element: teste, exact: true },//página de testes...


  
]

export default routes
