import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function ImageGalleryModal({ gallery, title, index, onChangeIndex, onClose }) {
  if (!gallery?.length) return null;

  const currentImage = gallery[index] || gallery[0];
  const hasMultiple = gallery.length > 1;

  function goToPrevious() {
    onChangeIndex((index - 1 + gallery.length) % gallery.length);
  }

  function goToNext() {
    onChangeIndex((index + 1) % gallery.length);
  }

  return (
    <div className="image-galleryModal" role="dialog" aria-modal="true" aria-label={`${title} gallery`}>
      <button className="image-galleryModal__backdrop" type="button" aria-label="Close gallery" onClick={onClose} />
      <div className="image-galleryModal__content">
        <button className="image-galleryModal__close" type="button" aria-label="Close gallery" onClick={onClose}>
          <X size={20} />
        </button>
        {hasMultiple ? (
          <button className="image-galleryModal__nav image-galleryModal__nav--prev" type="button" aria-label="Previous image" onClick={goToPrevious}>
            <ChevronLeft size={24} />
          </button>
        ) : null}
        <img src={currentImage} alt={title} />
        {hasMultiple ? (
          <button className="image-galleryModal__nav image-galleryModal__nav--next" type="button" aria-label="Next image" onClick={goToNext}>
            <ChevronRight size={24} />
          </button>
        ) : null}
        <div className="image-galleryModal__caption">
          <strong>{title}</strong>
          <span>{index + 1} / {gallery.length}</span>
        </div>
      </div>
    </div>
  );
}
