import { NavLink } from 'react-router-dom';

function EntityLinks ({ items, basePath, getLabel }) {
  return (
    <>
      {items.map((item, index) => (
        <span key={item.id}>
          <NavLink to={`/${basePath}/${item.id}`}>{getLabel(item)}</NavLink>

          {index < items.length - 1 && ', '}
        </span>
      ))}
    </>
  );
}

export default EntityLinks;
