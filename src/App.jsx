import { LaserEyesProvider } from '@omnisat/lasereyes'
import { LaserEyesLayout } from './lasereyes/LaserEyesLayout'
import { Toaster } from 'react-hot-toast'
import './App.module.scss'

function App() {
  return (
    <LaserEyesProvider config={{ network: 'mainnet' }}>
      <Toaster />
      <LaserEyesLayout />
    </LaserEyesProvider>
  )
}

export default App
