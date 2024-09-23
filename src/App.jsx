import { LaserEyesProvider } from '@omnisat/lasereyes'
import { LasereyesLayout } from './lasereyes/LasereyesLayout'
import { Toaster } from 'react-hot-toast'
import './App.module.scss'

function App() {
  return (
    <LaserEyesProvider config={{ network: 'mainnet' }}>
      <Toaster />
      <LasereyesLayout />
    </LaserEyesProvider>
  )
}

export default App
