import { useWireState } from '@forminator/react-wire'
import * as store from '../store'

import GitHubIcon from './GitHubIcon'

const linkClassBase = 'inline-block py-2 px-4 no-underline hover:text-gray-900 hover:text-underline'
const linkClass = `${linkClassBase} text-gray-600`
const linkClassActive = `${linkClassBase} text-gray-900 font-bold`

const Link = ({ children, className, to, onClick }) => {
    
    const [page, setPage] = useWireState(store.page)
    
    const linkClassFor = target =>
        (page === target) ? linkClassActive : linkClass
    
    return (
        <a
            className={`${linkClassFor(to)} ${className}`}
            href={to}
            onClick={e => {
                setPage(to)
                if (onClick && typeof onClick === 'function')
                    onClick(e)
            }}>
            {children}
        </a>
    )
    
}

const Navbar = () => {
    
    return (
        
        <nav id="Navbar" className="w-full flex flex-wrap justify-between items-center content-center py-3">
            
            <div className="">
                <a className="text-gray-900 text-base no-underline hover:no-underline" href="#">
                    <span className="font-extrabold text-xl">JS Chain</span> <i>Minimal, PoW blockchain demo in JavaScript</i>
                </a>
            </div>
            
            <div className="flex flex-grow hidden">
                <ul className="list-reset lg:flex justify-end flex-1 items-center">
                    <li className="mr-3">
                        <Link to="home">New Chain</Link>
                    </li>
                    <li className="mr-3">
                        <Link to="#">link</Link>
                    </li>
                    <li className="mr-3">
                        <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4" href="#">link</a>
                    </li>
                </ul>
            </div>
            
            <div className="flex justify-center items-center content-center">
                <a href="https://github.com/wesleybliss/jschain" target="_blank">
                    <GitHubIcon
                        className="icon"
                        width="25"
                        height="25" />
                </a>
            </div>
            
        </nav>
        
    )
    
}

export default Navbar
