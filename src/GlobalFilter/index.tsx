import React, { InputHTMLAttributes } from 'react';

// import { Container } from './styles';
interface FilterProps  extends InputHTMLAttributes<HTMLInputElement> {
  filter: string;
  setFilter?: any;
}

const GlobalFilter: React.FC<FilterProps> = ({ filter, setFilter, ...rest }) => {
  return (
    <span>
      Search: {' '}
      <input value={filter || ''} onChange={e => setFilter(e.target.value)} {...rest} type="text"/>
    </span>
  );
}

export default GlobalFilter;