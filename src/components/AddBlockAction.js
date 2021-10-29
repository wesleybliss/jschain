import React from 'react'
import { useState } from 'react'
import { useWireState } from '@forminator/react-wire'
import * as store from '../store'
import Block from '../Block'

import Button from './Button'
import Spinner from './Spinner'

const AddBlockAction = () => {
    
    const [newBlockData, setNewBlockData] = useState('NO DATA')
    const [isAddingBlock, setIsAddingBlock] = useState(false)
    
    const [blockchain, setBlockchain] = useWireState(store.blockchain)
    
    const addBlock = () => {
        
        const block = new Block(Date.now().toString(), newBlockData)
        blockchain.addBlock(block)
        
        setBlockchain(blockchain.clone())
        
        setNewBlockData('NO DATA')
        setIsAddingBlock(false)
        
    }
    
    const handleAddBlock = async () => {
        
        setIsAddingBlock(true)
        setTimeout(addBlock, 1000)
        
    }
    
    return (
        
        <div className="mb-2 p-2 border border-gray-600 rounded">
            
            <p className="mb-2 font-bold">Add New Block</p>
            
            {isAddingBlock
                ? (
                    <div className="flex justify-center items-center content-center">
                        <code className="text-sm">Mining new block...</code>
                        <Spinner />
                    </div>
                )
                : (
                    <>
                        <div className="mb-2">
                            <input
                                className="p-2 text-center"
                                type="text"
                                placeholder={newBlockData}
                                onChange={e => setNewBlockData(e.target.value)} />
                        </div>

                        <Button className="" onClick={handleAddBlock}>
                            ADD BLOCK
                        </Button>
                    </>
                )
            }
            
        </div>
        
    )
    
}

export default AddBlockAction
