import React from 'react'

function Category() {
  return (
    <div>
      <h1>Categories</h1>
      <label >New Category Name</label>
      <form className='flex gap-1 flex-row'>
        <input type="text" className='mb-0' />
        <button className='btn-primary py-1'>save</button>
      </form>
    </div>
  )
}

export default Category