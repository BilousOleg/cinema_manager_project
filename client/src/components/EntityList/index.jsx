function EntityList ({ items, getLabel }) {
  if (!items.length) {
    return <span>—</span>;
  }

  return (
    <>
      {items.map((item, index) => (
        <span key={item.id}>
          {getLabel(item)}
          {index < items.length - 1 && ', '}
        </span>
      ))}
    </>
  );
}

export default EntityList;
