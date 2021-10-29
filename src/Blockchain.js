import Block from './Block'

class Blockchain {
    
    constructor(difficulty = 1) {
        
        // Will contain all of our blocks
        this.chain = []
        
        // Create a genesis block with the current timestamp
        const currentTimestamp = Date.now().toString()
        const genesisBlock = new Block(currentTimestamp)
        
        // Add the genesis block as the first one in the chain
        this.chain.push(genesisBlock)
        
        // Set our default difficulty for this blockchain
        this.difficulty = difficulty
        
    }
    
    getLatestBlock() {
        
        // Since arrays are indexed starting at zero, the
        // latest block index will be the length minus one
        const latestBlockIndex = (this.chain.length - 1)
        
        return this.chain[latestBlockIndex]
        
    }
    
    addBlock(block) {
        
        // Tie the new block to the hash of the current latest block
        block.prevHash = this.getLatestBlock().hash
        
        // Since prevHash is now set, we need to recalculate the block's hash
        block.hash = block.getHash()
        
        // Mine the block
        block.mine(this.difficulty)
        
        // Now save the new block in the chain
        this.chain.push(block)
        
    }
    
    isValid() {
        
        // Loop through all blocks in this chain & validate their hashes
        // Start at 1 since the first iteration will get the previous block (1 - 1 = 0, the first index in the array)
        for (let i = 1; i < this.chain.length; i++) {
            
            // Grab the current & previous blocks
            const currentBlock = this.chain[i]
            const prevBlock = this.chain[i - 1]
            
            // Ensure the current block's hash hasn't been tampered with by recalculating it
            const hashMatches = (currentBlock.hash === currentBlock.getHash())
            
            // Ensure the current block's prevHash matches the previous block's hash
            const prevHashMatches = (prevBlock.hash === currentBlock.prevHash)
            
            // If either of those checks don't pass, fail the validation
            if (!hashMatches || !prevHashMatches) {
                // Break out of the loop & tell the caller validation failed
                return false
            }
            
        }
        
        // All blocks validated, so tell the caller the chain is valid
        return true
        
    }
    
    /**
     * Convenience method since React won't detect changes when adding blocks
     */
    clone() {
        
        const newBlockchain = new Blockchain(this.difficulty)
        
        newBlockchain.chain = this.chain
        
        return newBlockchain
        
    }
    
}

export default Blockchain
