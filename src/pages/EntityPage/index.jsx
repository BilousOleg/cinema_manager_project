import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination, PaginationItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EntityListItem from '../../components/EntityListItem';
import styles from './EntityPage.module.sass';

function EntityPage ({
  entity,
  title,
  items,
  addButtonText,
  onAdd,
  itemsPerPage = 9,
  getImage,
  getPrimaryText,
  getSecondaryText,
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
            <EntityListItem
              key={item.id}
              entity={entity}
              id={item.id}
              image={getImage(item)}
              primaryText={getPrimaryText(item)}
              secondaryText={getSecondaryText?.(item)}
            />
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
