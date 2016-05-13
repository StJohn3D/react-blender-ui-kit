import React from 'react'

export default ({children}) => {
    const count = React.Children.count(children)
    if ( count === 1) {
        const child = React.Children.only(children)
        return (
            <section className='repanel-row'>
                {child}
            </section>
        )
    } else {
        if ( console && console.warn ) {
            if ( count > 1 ) console.warn('Timber Row received too many children - accepts only one');
            else console.warn('Timber Row received no children - expected one');
        }
        return false;
    }
}