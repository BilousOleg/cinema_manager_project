export const normalizeFormValues = values =>
  Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      if (typeof value !== 'string') {
        return [key, value];
      }

      const trimmedValue = value.trim();

      return [key, trimmedValue === '' ? null : trimmedValue];
    })
  );

export const toMovieFormValues = movie => ({
  title: movie?.title ?? '',
  genreIds: movie?.Genres?.map(genre => genre.id) ?? [],
  year: movie?.year ?? '',
  poster: movie?.poster ?? '',
  trailer: movie?.trailer ?? '',
  directorIds: movie?.Directors?.map(director => director.id) ?? [],
  actorIds: movie?.Actors?.map(actor => actor.id) ?? [],
  studioIds: movie?.Studios?.map(studio => studio.id) ?? [],
  description: movie?.description ?? '',
});

export const toPersonFormValues = person => ({
  firstName: person?.Person?.firstName ?? '',
  lastName: person?.Person?.lastName ?? '',
  birthDate: person?.Person?.birthDate ?? '',
  countryId: person?.Person?.countryId ?? '',
  photo: person?.Person?.photo ?? '',
  biography: person?.Person?.biography ?? '',
});

export const toStudioFormValues = studio => ({
  studioName: studio?.studioName ?? '',
  countryId: studio?.countryId ?? '',
  founded: studio?.founded ?? '',
  logo: studio?.logo ?? '',
  description: studio?.description ?? '',
});
