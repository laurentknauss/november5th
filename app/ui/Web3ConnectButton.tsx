'use client' ; 
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';

const Web3ConnectButton: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openChainModal,
        openAccountModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = !!account && !!chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
            })}
            className="relative w-full max-w-xs mx-auto"
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                type="button"
                className="group relative w-full px-6 py-3 rounded-xl 
                  bg-transparent text-white 
                  shadow-lg hover:shadow-xl 
                  transition-all duration-300 
                  transform hover:-translate-y-1 
                  flex items-center justify-center 
                  space-x-3
                  border border-white"
              >
                <Wallet className="w-10 h-10 text-white-300 group-hover:text-white transition-colors" />
                <span className="font-semibold tracking-wider">
                  Connect Wallet
                </span>
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden">
                  {/* Chain Information */}
                  <button 
                    onClick={openChainModal}
                    type="button"
                    className="w-full flex items-center p-3 border-b border-zinc-700 hover:bg-zinc-800 transition-colors"
                  >
                    {chain.hasIcon && (
                      <div 
                        className="w-10 h-10 rounded-full mr-3 overflow-hidden"
                        style={{ background: chain.iconBackground }}
                      >
                        {chain.iconUrl && (
                          <img 
                            alt={chain.name ?? 'Chain icon'} 
                            src={chain.iconUrl} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}
                    <span className="text-white text-sm">
                      {chain.name}
                    </span>
                  </button>

                  {/* Account Information */}
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="w-full flex items-center justify-between p-3 hover:bg-zinc-800 transition-colors"
                  >



  <div className="flex items-center space-x-3">
    {account.ensAvatar ? (
      <img 
        src={account.ensAvatar} 
        alt="ENS Avatar" 
        className="w-10 h-10 rounded-full border-2 border-zinc-700"
      />
    ) : (
      <Wallet className="w-10 h-10 text-zinc-300" />
    )}
    <div className="flex flex-col">
      <span className="text-white font-bold text-md">
        {account.ensName || account.displayName}
      </span>
      {account.ensName && (
        <span className="text-zinc-400 text-xs">
          {account.displayName}
        </span>
      )}
    </div>
  </div>
  <span className="text-red-400 font-bold text-lg ml-10">
    {account.displayBalance || 'View Balance'}
  </span>












                  </button>
                </div>

                {chain.unsupported && (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="w-full px-8 py-6 rounded-lg 
                      bg-white text-red-900 
                      hover:bg-red-600 
                      transition-colors 
                      text-sm 
                      animate-pulse
                      font-bold
                      shadow-xl 
                      hover:animate-none"
                  >
                    WRONG NETWORK
                  </button>
                )}
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Web3ConnectButton;