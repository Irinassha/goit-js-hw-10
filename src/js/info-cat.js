const selectCatsName = breedsArr => {
  return breedsArr
    .map(breedsArr => {
      return `<form>
      <img
        class="gallery__image"
        src= ${breedsArr.url}
        alt='#'
      />
    <h3>${breedsArr.breeds[0].name}</h3><p>${breedsArr.breeds[0].description}</p></form>`;
    })
    .join('');
};
