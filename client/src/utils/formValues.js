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
