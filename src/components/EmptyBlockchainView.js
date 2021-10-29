import React from 'react'
import { useState } from 'react'
import { useWireState, useWireValue } from '@forminator/react-wire'
import * as store from '../store'
import Blockchain from '../Blockchain'

import Button from './Button'

const maxDifficulty = 4

const DifficultyTile = ({ n, label, active, ...props }) => (
    <div
        className={`
            p-3 mx-3 border border-gray-500 rounded text-center
            hover:border-black hover:bg-gray-200 cursor-pointer
            ${active ? 'bg-gray-200' : ''}
        `}
        {...props}>
        <h2 className="text-2xl">{n}</h2>
        <p className="text-sm">{label}</p>
    </div>
)

const EmptyBlockchainView = () => {
    
    const [difficulty, setDifficulty] = useState(1)
    
    const [blockchain, setBlockchain] = useWireState(store.blockchain)
    
    const updateDifficulty = n => {
        setDifficulty(parseInt(n, 10))
    }
    
    const handleCreateBlockchain = () => {
        setBlockchain(new Blockchain(difficulty))
    }
    
    return (
        
        <div className="mt-40">
            
            <h4 className="mb-10 text-2xl">Create a new blockchain</h4>
            
            <div className="mb-5">
                
                <p className="mb-4">Mining Difficulty</p>
                
                <div className="flex justify-around mb-10">
                    <DifficultyTile
                        n="1"
                        label="Near-instant"
                        active={difficulty === 1}
                        onClick={() => updateDifficulty(1)} />
                    <DifficultyTile
                        n="3"
                        label="Pretty quick"
                        active={difficulty === 3}
                        onClick={() => updateDifficulty(3)} />
                    <DifficultyTile
                        n="5"
                        label="Takes some work"
                        active={difficulty === 5}
                        onClick={() => updateDifficulty(5)} />
                    <DifficultyTile
                        n="6"
                        label="I hate my computer"
                        active={difficulty === 6}
                        onClick={() => updateDifficulty(6)} />
                </div>
            </div>
            
            <Button onClick={handleCreateBlockchain}>
                CREATE BLOCKCHAIN
            </Button>
            
            <p>{blockchain?.chain?.length}</p>
            
        </div>
        
    )
    
}

export default EmptyBlockchainView
