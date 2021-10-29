import { sha256 } from 'js-sha256'
import { benchmark } from './utils'

class Block {
    
    /**
     * Called when we create a new block
     * 
     * @param {Date} timestamp Timestamp of when the block was created
     * @param {Array[*]} data Data associated with the block (transactions, etc)
     */
    constructor(timestamp = '', data = []) {
        
        // Store the given timestamp & data
        this.timestamp = timestamp
        this.data = data
        
        // Store the initial hash for this block
        this.hash = this.getHash()
        
        // Store the previous block's hash (empty for now)
        // This will be set by the blockchain when a new block is created
        this.prevHash = ''
        
        // Helps add randomness to our hash, so even if 2 blocks with identical
        // timestamps/data/etc. are mined, the hash will be completely different
        this.nonce = 0
        
        // Just for reference, how long it took to mine, in seconds
        // Will be updated in the mine function
        this.miningTime = '0 seconds'
        
    }
    
    getHash() {
        
        // Get a structured text representation of our data
        const jsonData = JSON.stringify(this.data)
        
        // Hash the previous hash + block timestamp + stringified data + our nonce
        const hash = sha256(this.prevHash + this.timestamp + jsonData + this.nonce)
        
        return hash
        
    }
    
    /**
     * Mines a block using PoW
     * 
     * @param {Number} difficulty Difficulty of mining operation (higher is more work, more proof)
     */
    mine(difficulty) {
        
        // Start a new benchmark
        const ts = benchmark()
        
        // Create a target hash that we want to mine until
        const target = Array(difficulty + 1).join('0')
        
        // Grab the first part of the hash so we can compare with our target
        let test = this.hash.substring(0, difficulty)
        
        while (test !== target) {
            
            // Increment the nonce so we get an entirely new hash
            this.nonce++
            
            // Recalculate this block's hash with the new nonce
            this.hash = this.getHash()
            
            // Our test hasn't matched our target yet, so update our test for the next iteration
            test = this.hash.substring(0, difficulty)
            
        }
        
        const durationMillis = benchmark(ts)
        console.info('Added new block in', durationMillis, 'ms')
        
        // Save how long it took in seconds
        this.miningTime = (durationMillis / 1000).toFixed(2) + ' seconds'
        
    }
    
}

export default Block
