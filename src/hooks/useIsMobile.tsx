import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 760) {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${breakpoint}px)`)
        const update = () => setIsMobile(media.matches)
        media.addEventListener('change', update)
        update()
        return () => media.removeEventListener('change', update)
    }, [breakpoint])
    return isMobile
}