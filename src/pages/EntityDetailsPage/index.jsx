import styles from './EntityDetailsPage.module.sass';

function EntityDetailsPage ({
  heading,
  imgSrc,
  sectionTitle,
  actions,
  children,
}) {
  return (
    <article className={styles.entityDetailsCard}>
      <h2>{heading}</h2>
      <section className={styles.descriptionSection}>
        <img src={imgSrc} alt={heading} />
        <div className={styles.entityInfo}>
          <h3>{sectionTitle}</h3>
          <ul className={styles.entityInformationList}>{children}</ul>
        </div>
      </section>
      {actions}
    </article>
  );
}

export default EntityDetailsPage;
