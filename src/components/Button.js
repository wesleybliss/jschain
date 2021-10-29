
const Button = ({
    children,
    className,
    ...props
}) => {
    
    return (
        
        <button
            className="
                px-4 py-2 border-none outline-none font-bold
                bg-gray-300 focus:border-none focus:outline-none rounded
                hover:bg-gray-200 active:bg-gray-400
            "
            {...props}>
            {children}
        </button>
        
    )
    
}

export default Button
