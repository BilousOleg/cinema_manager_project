import { NavLink } from 'react-router-dom';

function EntityLinks ({ items, basePath, getLabel }) {
  if (!items.length) {
    return <span>—</span>;
  }

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
