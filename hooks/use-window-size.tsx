import { useEffect, useState } from "react"

type WindowSize = 'sm' | 'md' | 'lg'

export const useWindowSize = (): WindowSize => {
    const [size, setSize] = useState<WindowSize>('md');

    const checkSize = () => {
        if (window.innerWidth < 768) {
            setSize('sm')
        } else if (window.innerWidth < 1024) {
            setSize('md')
        } else {
            setSize('lg')
        }
    }

    useEffect(() => {
        checkSize()
        window.addEventListener('resize', checkSize)
        return () => window.removeEventListener('resize', checkSize)
    }, [])

    return size
}