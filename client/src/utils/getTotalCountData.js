function getTotalCountData ({ movies, actors, directors, studios }) {
  return [
    {
      id: 1,
      text: 'Total films:',
      count: movies,
    },
    {
      id: 2,
      text: 'Total actors:',
      count: actors,
    },
    {
      id: 3,
      text: 'Total directors:',
      count: directors,
    },
    {
      id: 4,
      text: 'Total studios:',
      count: studios,
    },
  ];
}

export default getTotalCountData;
