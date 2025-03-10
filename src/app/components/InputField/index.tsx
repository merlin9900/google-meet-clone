import React from 'react'
import { InputFieldProps } from './type'

const InputField = ({className, type, onChange, value, placeholder, children, onSubmit}: InputFieldProps) => {
  return (
     <form className={className} onSubmit={onSubmit}>
        {children}
        <input
        className='focus:outline-none w-[100%] h-full'
           type={type}
           onChange={onChange}
           value={value}
           placeholder={placeholder}
        />
     </form>
  );
}

export default InputField