import React, { useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { registerMetaMaskUser } from '../../lib/api'
import detectEthereumProvider from '@metamask/detect-provider';

declare let window: any;

const Join = () => {
  
  const handleSignupMetaMask = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      startApp(provider);
    } else {
      console.log('Please install MetaMask!');
    };
    registerMetaMaskUser();
  }

  const startApp = (provider: any) => {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }

  connect();
  }

  /*********************************************/
  /* Access the user's accounts (per EIP-1102) */
  /*********************************************/
  // While you are awaiting the call to eth_requestAccounts, you should disable
  // any buttons the user can click to initiate the request.
  // MetaMask will reject any additional requests while the first is still
  // pending.
  function connect() {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err: any) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  }

  /***********************************************************/
  /* Handle user accounts and accountsChanged (per EIP-1193) */
  /***********************************************************/

  let currentAccount: any = null;
  window.ethereum
    .request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err: any) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    });

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  window.ethereum.on('accountsChanged', handleAccountsChanged);

  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];

      console.log('THIS IS THE CURRENT ACCOUNT!👹', currentAccount);
    }
  }

  useEffect(() => {
    if(window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
  }})

  return (
    <>

      <div className='auth-form-container' >
        <div className='auth-container'>
          <h2>Join 499px</h2>
          <p className='signup'>Discover and share increadible photos, gain global exposure</p>
          
          <Button 
            className='lozenge login-email-btn'
            type='submit'
            as={Link}
            to='/signup'
            data-cy='join-email-signup'
          >
            <Icon name='mail' />
            Continue with email
          </Button>

          <Button className='lozenge login-fb-btn' type='submit' onClick={handleSignupMetaMask}>
            <Button.Content visible>
                Continue with MetaMask
            </Button.Content>
          </Button>

          <Button className='lozenge login-google-btn' type='submit' animated='fade'>
            <Button.Content visible>
              <Icon name='google' />
                Continue with Google
            </Button.Content>
            <Button.Content hidden>
              <Icon color='red' name='warning' />
                  Coming soon
            </Button.Content>
          </Button>

          <p className='have-account'>Already have an account? <Link to='/login'>Log in</Link></p>
        </div>
      </div>


    </>
  )

}

export default Join