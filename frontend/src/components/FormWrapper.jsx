function FormWrapper(props) {
    const getClassName = () => {
        const index = props.index
        const current = props.current
        let className = 'form'

        if (index === current) {
            className += " form-active"
        } else if (index > current) {
            className += " form-next"
        } else {
            className += " form-prev"
        }

        return className
    }

    return (
        <div className={getClassName()}>
            {props.children}
        </div>
    )
}

export default FormWrapper;