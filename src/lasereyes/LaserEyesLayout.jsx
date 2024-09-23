import React, { useEffect, useState } from 'react'
import { LEATHER, UNISAT, XVERSE, useLaserEyes } from '@omnisat/lasereyes'
import LaserEyesShimmer from './components/Shimmer'
import LaserEyesModal, { Address } from './LaserEyesModal'
import HeaderShimmer from './../assets/header-shimmer.svg'
import styles from './LaserEyesLayout.module.scss'

export const LaserEyesLayout = () => {
  const [showLaserEyesModal, setShowLaserEyesModal] = useState(false)
  const [showWalletAddress, setShowWalletAddress] = useState(false)
  const [showShimmer, setShowShimmer] = useState(true)
  const { connected, isConnecting, switchNetwork, address, paymentAddress, publicKey, paymentPublicKey, balance, provider, network, accounts, hasUnisat, connect, disconnect } = useLaserEyes()

  const handleSwitchNetwork = async () => {
    await switchNetwork(network === `mainnet` ? `testnet` : `mainnet`)
  }

  useEffect(() => {
    window.setTimeout(() => {
      setShowShimmer(!showShimmer)
    }, 500)
  }, [])

  return (
    <>
      <header className={`${styles.header}`}>
        <img src={HeaderShimmer} />

        {showShimmer && (
          <LaserEyesShimmer>
            <div className={`${styles['shimmer']}`} style={{ width: '200px', height: '38px' }}></div>
          </LaserEyesShimmer>
        )}

        {!showShimmer && (
          <>
            {connected ? (
              <div className={`${styles['wallet']}`}>
                <div className={`${styles['wallet__provider']}`} onClick={()=>handleSwitchNetwork()}>
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_4_311)">
                      <path d="M0 0.5H18V18.5H0V0.5Z" fill={network === `mainnet` ? `#F7931A` : `#5FD15C`} />
                      <path
                        d="M12.836 8.43998C13.002 7.31698 12.152 6.71898 10.981 6.31198L11.361 4.79898L10.435 4.56898L10.066 6.04498L9.32801 5.86798L9.70301 4.38198L8.77801 4.15198L8.39801 5.66998L7.81001 5.53098V5.52598L6.53201 5.20598L6.28601 6.19398C6.28601 6.19398 6.97001 6.35398 6.96001 6.35998C7.33401 6.45598 7.39801 6.70198 7.38701 6.89498L6.96001 8.62798L7.05601 8.65998L6.95401 8.63798L6.35001 11.061C6.30701 11.173 6.19001 11.344 5.92701 11.275C5.93801 11.291 5.25901 11.115 5.25901 11.115L4.79901 12.168L6.00201 12.468L6.66001 12.638L6.27501 14.173L7.20001 14.403L7.57401 12.884L8.31801 13.077L7.93801 14.59L8.86301 14.82L9.24301 13.285C10.82 13.585 12.008 13.467 12.505 12.039C12.906 10.889 12.484 10.232 11.655 9.79298C12.259 9.65998 12.714 9.25898 12.831 8.43998H12.836ZM10.724 11.403C10.441 12.553 8.50501 11.927 7.87901 11.777L8.38701 9.73998C9.01301 9.89998 11.024 10.205 10.724 11.398V11.403ZM11.008 8.42398C10.751 9.46698 9.13601 8.93798 8.61801 8.80898L9.07801 6.96498C9.60101 7.09298 11.28 7.33898 11.008 8.42498V8.42398Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4_311">
                        <rect y="0.5" width="18" height="18" rx="9" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Bitcoin {network === `mainnet` ? `Mainnet` : `Testnet`}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
                  </svg>
                </div>

                <div className={`${styles['wallet__balance']}`} onClick={() => setShowWalletAddress((oldVal) => !oldVal)}>
                  <p>{balance} BTC</p>
                  <div className={`${styles['wallet__balance__address']}`}>
                    🐶&nbsp;
                    <b>{`${address.slice(0, 4)}...${address.slice(38)}`}</b>
                    <button>
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6 0.800012L12 2.20001L6 8.20001L0 2.20001L1.4 0.800012L6 5.37501L10.6 0.800012Z" fill="#131722" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button className={`${styles['btn-connect']}`} onClick={() => setShowLaserEyesModal((oldValue) => !oldValue)}>
                Connect Wallet
              </button>
            )}
          </>
        )}
      </header>

      {showWalletAddress && <Address setShowWalletAddress={setShowWalletAddress} setShowLaserEyesModal={setShowLaserEyesModal} />}
      {showLaserEyesModal && <LaserEyesModal setShowLaserEyesModal={setShowLaserEyesModal} />}
    </>
  )
}
