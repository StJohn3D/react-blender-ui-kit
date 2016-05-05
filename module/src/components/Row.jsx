import React from 'react'

export default ({children}) => {
  const child = React.Children.only(children)
  return (
    <section className='timber-row'>
      {child}
    </section>
  )
}
