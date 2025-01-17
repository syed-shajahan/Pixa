import React from 'react'
import { toast } from 'react-toastify';

const SamplePage = () => {
  const notify = () => toast.success('This is a success message!');
  return (
    <div>
      <button onClick={notify}>Show Toast</button>
    </div>
  )
}

export default SamplePage