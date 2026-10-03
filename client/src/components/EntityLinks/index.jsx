import { Link } from 'react-router-dom';

function EntityLinks ({ items, basePath, getLabel }) {
  if (!items.length) {
    return <span>—</span>;
  }

  return (
    <>
      {items.map((item, index) => (
        <span key={item.id}>
          <Link to={`/${basePath}/${item.id}`}>{getLabel(item)}</Link>

          {index < items.length - 1 && ', '}
        </span>
      ))}
    </>
  );
}

export default EntityLinks;
