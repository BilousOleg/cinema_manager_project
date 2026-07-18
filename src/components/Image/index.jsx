function Image ({ src, fallback, alt, ...props }) {
  const handleImageError = ({ currentTarget }) => {
    currentTarget.onerror = null;

    if (fallback) {
      currentTarget.src = fallback;
    }
  };

  return (
    <img
      src={src || fallback}
      alt={alt}
      onError={handleImageError}
      {...props}
    />
  );
}

export default Image;
