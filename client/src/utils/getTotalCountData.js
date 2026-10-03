function getTotalCountData ({ movies, actors, directors, studios }) {
  return [
    {
      id: 1,
      text: 'Total films:',
      count: movies.length,
    },
    {
      id: 2,
      text: 'Total actors:',
      count: actors.length,
    },
    {
      id: 3,
      text: 'Total directors:',
      count: directors.length,
    },
    {
      id: 4,
      text: 'Total studios:',
      count: studios.length,
    },
  ];
}

export default getTotalCountData;
