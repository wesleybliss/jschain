
const benchmarks = {}

export const uuidv4 = () => {
    const replacer = c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    const initial = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
    return initial.replace(/[018]/g, replacer)
}

export const benchmark = (existingKey = null) => {
    
    if (existingKey) {
        
        if (!benchmarks[existingKey])
            console.warn('Benchmark called with non-existent key', existingKey)
        
        const end = window.performance.now()
        const time = end - benchmarks[existingKey].start
        
        delete benchmarks[existingKey]
        
        return time
        
    }
    
    const key = uuidv4()
    
    benchmarks[key] = {
        start: window.performance.now(),
    }
    
    return key
    
}

/**
 * Creates a SHA256 hash of a given message
 * 
 * @param {String} message The message/data to hash
 * @returns {String} Hashed message
 */
export const sha256 = async (message) => {
    
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message)
    
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
    
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    
    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    return hashHex
    
}
