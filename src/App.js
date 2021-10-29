import React from 'react'
import { useWireState, useWireValue } from '@forminator/react-wire'
import * as store from './store'
import Block from './Block'

import Navbar from './components/Navbar'
import BlockchainView from './components/BlockchainView'
import EmptyBlockchainView from './components/EmptyBlockchainView'

const App = () => {
    
    const hasBlockchain = useWireValue(store.hasBlockchain)
    
    return (
        
        <main className="max-w-screen-xl h-screen mx-auto px-8 py-4">
            
            <Navbar />
            
            <div className="flex flex-col justify-center items-center content-center text-center">
                {hasBlockchain
                    ? <BlockchainView />
                    : <EmptyBlockchainView />
                }
            </div>
            
        </main>
        
    )
    
}

export default App
