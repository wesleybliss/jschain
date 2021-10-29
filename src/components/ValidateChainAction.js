import React from 'react'
import { useState } from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '../store'

import Button from './Button'
import Spinner from './Spinner'

const ValidateChainAction = () => {
    
    const [message, setMessage] = useState('')
    const [isValidatingChain, setValidatingChain] = useState(false)
    
    const blockchain = useWireValue(store.blockchain)
    
    const validateChain = () => {
        
        const isValid = blockchain.isValid()
        
        setMessage(isValid ? 'Blockchain is valid' : 'Blockchain is INVALID')
        setTimeout(() => setMessage(''), 3000)
        
        setValidatingChain(false)
        
    }
    
    const handleValidateChain = async () => {
        
        setValidatingChain(true)
        setTimeout(validateChain, 1000)
        
    }
    
    return (
        
        <div className="mb-2 p-2 border border-gray-600 rounded">
            
            <p className="mb-2 font-bold">Validate Blockchain</p>
            
            {isValidatingChain
                ? (
                    <div className="flex justify-center items-center content-center">
                        <code className="text-sm">Validating all blocks...</code>
                        <Spinner />
                    </div>
                )
                : (
                    <Button className="" onClick={handleValidateChain}>
                        VALIDATE ALL BLOCKS
                    </Button>
                )
            }
            
            <p className="text-center">{message}</p>
            
        </div>
        
    )
    
}

export default ValidateChainAction
