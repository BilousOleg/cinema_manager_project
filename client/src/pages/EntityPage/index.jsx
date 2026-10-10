import { Pagination, PaginationItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EntityListItem from '../../components/EntityListItem';
import NoItems from '../../components/NoItems';
import styles from './EntityPage.module.sass';

function EntityPage ({
  title,
  defaultImage,
  items,
  entity,
  page,
  totalPages,
  onPageChange,
  onAdd,
  onEdit,
  onDelete,
  getImage,
  getPrimaryText,
  getSecondaryText,
}) {
  return (
    <article className={styles.page}>
      <section className={styles.headingSection}>
        <h2>{title}</h2>

        <button className={styles.addBtn} onClick={onAdd}>
          <AddIcon />
          <span>ADD</span>
        </button>
      </section>

      <section className={styles.listSection}>
        {items.length ? (
          <ul>
            {items.map(item => (
              <EntityListItem
                key={item.id}
                entity={entity}
                id={item.id}
                image={getImage(item)}
                defaultImage={defaultImage}
                primaryText={getPrimaryText(item)}
                secondaryText={getSecondaryText?.(item)}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </ul>
        ) : (
          <NoItems message={`Added ${entity} will be displayed here`} />
        )}
      </section>

      <section className={styles.paginationSection}>
        <Pagination
          page={page}
          count={totalPages}
          siblingCount={2}
          boundaryCount={1}
          onChange={(_, value) => onPageChange(value)}
          renderItem={item => (
            <PaginationItem {...item} className={styles.pageItem} />
          )}
        />
      </section>
    </article>
  );
}

export default EntityPage;
