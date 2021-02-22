import React, { InputHTMLAttributes } from 'react';

// import { Container } from './styles';
interface FilterProps  extends InputHTMLAttributes<HTMLInputElement> {
  column: any;
}

const ColumnFilter: React.FC<FilterProps> = ({ column, ...rest }) => {
  const { filterValue, setFilter } = column 
  return (
    <span>
      Search: {' '}
      <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} {...rest} type="text"/>
    </span>
  );
}

export default ColumnFilter;