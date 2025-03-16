import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';
import Image from 'next/image';

const Web3ConnectButton: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = 
          ready && 
          account && 
          chain && 
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': { 
                opacity: 0, 
                pointerEvents: 'none', 
                userSelect: 'none' 
              },
            })}
            className="w-full max-w-xs mx-auto"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="group relative w-full px-6 py-3 rounded-xl 
                      bg-transparent 
                      text-zinc-900 
                      shadow-lg hover:shadow-xl 
                      transition-all duration-300 
                      transform hover:-translate-y-1 
                      flex items-center justify-center 
                      space-x-3
                      border border-zinc-800 border-radius "
                  
                  >
                    <Wallet className="w-8 h-8 text-white-600 transition-colors" />
                    <span className="font-bold tracking-wider">
                      Connect Wallet
                    </span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="w-full px-4 py-2 rounded-lg 
                      bg-red-500 text-white 
                      hover:bg-red-600 
                      transition-colors 
                      text-sm
                      animate-pulse 
                      font-bold
                      shadow-lg 
                      hover:animate-none"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
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
                          className="w-6 h-6 rounded-full mr-3 overflow-hidden relative"
                          style={{ 
                            background: chain.iconBackground,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image 
                              alt={chain.name ?? 'Chain icon'} 
                              src={chain.iconUrl} 
                              fill
                              sizes="24px"
                              className="object-cover"
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
                        <Wallet className="w-5 h-5 text-zinc-300" />
                        <span className="text-white font-bold">
                          {account.displayName}
                        </span>
                      </div>
                      <span className="text-red-400 fot-bold text-lg ml-10">
                        {account.displayBalance || 'View Balance'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Web3ConnectButton;