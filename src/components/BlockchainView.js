import React from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '../store'

import AddBlockAction from './AddBlockAction'
import ValidateChainAction from './ValidateChainAction'

const titleCase = str => !str
    ? '' : str.substring(0, 1).toUpperCase() + str.substring(1)

const snippet = (str, len = 20) => {
    if (!str || str.length < (len * 2)) return str
    return str.substring(0, len) + '...' + str.substring(str.length - len)
}

const BlockView = ({ block, field }) => {
    const value = JSON.stringify(block[field], null, 4)
    return (
        <div className="flex">
            <code className="mr-2 text-sm font-bold">{titleCase(field)}:</code>
            <code className="text-sm" title={value}>{snippet(value)}</code>
        </div>
    )
}

const BlockchainView = () => {
    
    const blockchain = useWireValue(store.blockchain)
    
    return (
        
        <div className="w-full grid grid-cols-3 gap-4 mt-10">
            
            <div className="flex flex-col bg-gray-200 p-4 col-span-2">
                
                <h4 className="text-lg mb-6">BLOCKS</h4>
                
                <div className="flex flex-col">
                    {[...blockchain?.chain]?.reverse()?.map(it => (
                        <div
                            key={`block-${it.timestamp}`}
                            className="mb-2 p-2 border border-gray-600 rounded">
                            {!it.prevHash && (
                                <code className="block p-4 text-sm text-red-500">
                                    GENESIS BLOCK
                                </code>
                            )}
                            <BlockView block={it} field="timestamp" />
                            <BlockView block={it} field="hash" />
                            <BlockView block={it} field="prevHash" />
                            <BlockView block={it} field="nonce" />
                            <BlockView block={it} field="data" />
                            <BlockView block={it} field="miningTime" />
                        </div>
                    ))}
                </div>
                
            </div>
            
            <div className="flex flex-col bg-gray-100 p-4">
                <h4 className="text-lg mb-6">ACTIONS</h4>
                <AddBlockAction />
                <ValidateChainAction />
            </div>
            
            {/* <div className="flex flex-col bg-gray-200 p-4">
                <h4 className="text-lg mb-6">LOGS</h4>
            </div> */}
            
        </div>

    )

}

export default BlockchainView
