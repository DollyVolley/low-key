import { useState } from "react"

export function useMutex(): {
    getLock: () => Promise<void>,
    releaseLock: () => void,
    isLocked: boolean,
    } {
    const [isLocked, setIsLocked] = useState(false)

    async function getLock(): Promise<void> {
        if(isLocked) {
            await new Promise(resolve => setTimeout(resolve, 100))
            return getLock()
        }
        setIsLocked(true)
    }

    function releaseLock(): void {
        setIsLocked(false)
    }

    return {getLock, releaseLock, isLocked}

}