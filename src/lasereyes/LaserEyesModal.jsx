import React, { useEffect, useState } from 'react'
import { LEATHER, UNISAT, XVERSE, useLaserEyes } from '@omnisat/lasereyes'
import UniSatLogo from './../assets/UniSat.png'
import LeatherLogo from './../assets/Leather.png'
import MagicEdenLogo from './../assets/MagicEden.png'
import OYLLogo from './../assets/OYL.png'
import { LaserEyesDisconnectIcon, LaserEyesConnectedIcon } from './LaserEyesIcon'
import styles from './LaserEyesModal.module.scss'
import toast from 'react-hot-toast'

export default function LaserEyesModal({ setShowLaserEyesModal }) {
  const [chooseWalletModal, setChooseWalletModal] = useState(true)
  const [requestConnectModal, setRequestConnectModal] = useState(false)
  const { connected, isConnecting, address, paymentAddress, publicKey, paymentPublicKey, balance, provider, network, accounts, hasUnisat, connect, disconnect } = useLaserEyes()

  const handleConnect = () => {
    connect(UNISAT)
    setRequestConnectModal((oldVal) => !oldVal)
  }

  const RequestConnectModal = () => {
    return (
      <div className={`${styles['modal']}`}>
        <div className={`${styles['modal__cover']}`} onClick={() => props.setModal((modal) => !modal)} />
        <div className={`${styles['modal__container']}`}>
          <div className={`${styles['modal__header']}`}>
            <ul>
              <li>
                <button onClick={() => setShowLaserEyesModal((modal) => !modal)}>
                  <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12.1163L0 6.11633L6 0.116333L6.88209 0.998426L1.76403 6.11633L6.88209 11.2342L6 12.1163Z" fill="#A5A5A5" />
                  </svg>
                </button>
              </li>
              <li>
                <span>UniSat</span>
              </li>
              <li>
                <button onClick={() => setShowLaserEyesModal((modal) => !modal)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.2 12L0 10.8L4.8 6L0 1.2L1.2 0L6 4.8L10.8 0L12 1.2L7.2 6L12 10.8L10.8 12L6 7.2L1.2 12Z" fill="#A5A5A5" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>

          <div className={`${styles['modal__body--connecting']}`}>
            <figure>
              <img alt={`UniSat`} src={UniSatLogo} />
            </figure>
            <b>Requesting Connection</b>
            <p>Accept connection request in the wallet.</p>
          </div>

          <div className={`${styles['modal__footer']}`}>
            <button onClick={handleConnect}>Try agian</button>
          </div>
        </div>{' '}
      </div>
    )
  }

  const ConnectAWalletModal = () => {
    return (
      <div className={`${styles['modal']} ${styles['modal-wallet']}`}>
        <div className={`${styles['modal__cover']}`} onClick={() => props.setModal((modal) => !modal)} />
        <div className={`${styles['modal__container']}`}>
          <div className={`${styles['modal__header']}`}>
            <ul className={`d-flex flex-row align-items-center justify-content-between`}>
              <li>
                <span>Connect a Wallet</span>
              </li>
              <li>
                <button onClick={() => setShowLaserEyesModal((modal) => !modal)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.2 12L0 10.8L4.8 6L0 1.2L1.2 0L6 4.8L10.8 0L12 1.2L7.2 6L12 10.8L10.8 12L6 7.2L1.2 12Z" fill="#A5A5A5" />
                  </svg>
                </button>
              </li>
            </ul>

            {connected ? <LaserEyesConnectedIcon /> : <LaserEyesDisconnectIcon />}

            <p>One seamless wallet connect  for your Ordinals dApp</p>
          </div>

          <div className={`${styles['modal__body']}`}>
            <p>
              <b>Installed</b>
            </p>

            <ul style={{ rowGap: `1rem` }}>
              <li>
                <div className={`${styles['modal__body__wallet']}`}>
                  <figure>
                    <img alt={`UniSat`} src={UniSatLogo} />
                  </figure>
                  <span>Unisat</span>
                  {hasUnisat ? <button onClick={handleConnect}>Connect</button> : <a href={``}>GET</a>}
                </div>
              </li>
            </ul>

            <p>
              <b>Popular</b>
            </p>

            <ul>
              <li>
                <div className={`${styles['modal__body__wallet']}`}>
                  <figure>
                    <img alt={`UniSat`} src={LeatherLogo} />
                  </figure>
                  <span>Leather</span>
                  <a href={`#`}>GET</a>
                </div>
              </li>
              <li>
                <div className={`${styles['modal__body__wallet']}`}>
                  <figure>
                    <img alt={`Magic Eden`} src={MagicEdenLogo} />
                  </figure>
                  <span>Magic Eden</span>
                  <a href={`#`}>GET</a>
                </div>
              </li>
              <li>
                <div className={`${styles['modal__body__wallet']}`}>
                  <figure>
                    <img alt={`OYL`} src={OYLLogo} />
                  </figure>
                  <span>OYL</span>
                  <a href={`#`}>GET</a>
                </div>
              </li>
            </ul>
          </div>

          <div className={`${styles['modal__footer']}`}>
            <button>Get a Wallet</button>
            <a href={``}>Learn More</a>
          </div>
        </div>{' '}
      </div>
    )
  }

  useEffect(() => {
    console.log(isConnecting)
  }, [])

  if (connected) return false
  if (requestConnectModal) return <RequestConnectModal />
  if (chooseWalletModal) return <ConnectAWalletModal />
}

export const Address = (props) => {
  const { connected, isConnecting, address, paymentAddress, publicKey, paymentPublicKey, balance, provider, network, accounts, hasUnisat, connect, disconnect } = useLaserEyes()

  const handleCopy = () => {
    const e = document.querySelector('#address')
    e.select()
    navigator.clipboard.writeText(e.value)
    toast.success(`Wallet address copied!`)
  }

  return (
    <div className={`${styles['modal']}`}>
      <div className={`${styles['modal__cover']}`} onClick={() => props.setShowWalletAddress((oldVal) => !oldVal)} />
      <div className={`${styles['modal__container']}`}>
        <div className={`${styles['modal__header']}`}>
          <ul>
            <li>
              <span>Wallet Address</span>
            </li>
            <li>
              <button onClick={() => props.setShowWalletAddress((oldVal) => !oldVal)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.2 12L0 10.8L4.8 6L0 1.2L1.2 0L6 4.8L10.8 0L12 1.2L7.2 6L12 10.8L10.8 12L6 7.2L1.2 12Z" fill="#A5A5A5" />
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div className={`${styles['modal__body']}`}>
          <div className={`${styles['modal__body__address']}`}>
            <input type={`hidden`} id={`address`} defaultValue={address} />

            <div className={`d-flex flex-column align-items-center`} style={{ fontSize: '1.5rem' }}>
              <p>
                <b>{`${address.slice(0, 4)}...${address.slice(38)}`}</b>
              </p>

              <p>{balance} BTC</p>
            </div>

            <ul className={`d-flex flex-row align-items-center justify-content-between`}>
              <li className={`flex-1`}>
                <button onClick={handleCopy}>
                  <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.875 12C4.4625 12 4.10938 11.8531 3.81563 11.5594C3.52188 11.2656 3.375 10.9125 3.375 10.5V1.5C3.375 1.0875 3.52188 0.734375 3.81563 0.440625C4.10938 0.146875 4.4625 0 4.875 0H11.625C12.0375 0 12.3906 0.146875 12.6844 0.440625C12.9781 0.734375 13.125 1.0875 13.125 1.5V10.5C13.125 10.9125 12.9781 11.2656 12.6844 11.5594C12.3906 11.8531 12.0375 12 11.625 12H4.875ZM4.875 10.5H11.625V1.5H4.875V10.5ZM1.875 15C1.4625 15 1.10938 14.8531 0.815625 14.5594C0.521875 14.2656 0.375 13.9125 0.375 13.5V3H1.875V13.5H10.125V15H1.875Z"
                      fill="#5F6368"
                    />
                  </svg>
                  <span> Copy Address</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    disconnect()
                    props.setShowWalletAddress((oldVal) => !oldVal)
                      props.setShowLaserEyesModal((oldVal) => !oldVal)
                  }}
                >
                  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2 14C1.5875 14 1.23438 13.8531 0.940625 13.5594C0.646875 13.2656 0.5 12.9125 0.5 12.5V2C0.5 1.5875 0.646875 1.23438 0.940625 0.940625C1.23438 0.646875 1.5875 0.5 2 0.5H7.25V2H2V12.5H7.25V14H2ZM10.25 11L9.21875 9.9125L11.1313 8H5V6.5H11.1313L9.21875 4.5875L10.25 3.5L14 7.25L10.25 11Z"
                      fill="#5F6368"
                    />
                  </svg>
                  <span>Disconnect</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${styles['modal__footer']}`}></div>
      </div>
    </div>
  )
}
