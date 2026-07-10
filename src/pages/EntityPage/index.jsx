import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination, PaginationItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './EntityPage.module.sass';

function EntityPage ({
  title,
  items,
  ItemComponent,
  addButtonText,
  onAdd,
  itemsPerPage = 9,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const currentPage = Math.min(Math.max(pageFromUrl, 1), pageCount);

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(start, start + itemsPerPage);

  return (
    <article className={styles.page}>
      <section className={styles.headingSection}>
        <h2>{title}</h2>

        <button className={styles.addBtn} onClick={onAdd}>
          <AddIcon />
          <span>{addButtonText}</span>
        </button>
      </section>

      <section className={styles.listSection}>
        <ul>
          {currentItems.map(item => (
            <ItemComponent key={item.id} {...item} />
          ))}
        </ul>
      </section>

      <section className={styles.paginationSection}>
        <Pagination
          page={currentPage}
          count={pageCount}
          siblingCount={2}
          boundaryCount={1}
          onChange={(e, value) => setSearchParams({ page: value.toString() })}
          renderItem={item => (
            <PaginationItem {...item} className={styles.pageItem} />
          )}
        />
      </section>
    </article>
  );
}

export default EntityPage;
