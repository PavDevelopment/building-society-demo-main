import { IBuilding } from '../models/building.model';

export const MOCK_BUILDINGS = (): Array<IBuilding> => {
  return [
    {
      id: '0001',
      address: '30 St Mary Axe, London',
      description:
        '30 St Mary Axe, informally known as The Gherkin, is a commercial skyscraper in London\'s primary financial district, the City of London. It was completed in December 2003 and opened in April 2004.',
      imageUrl:
        'https://i0.wp.com/londontopia.net/wp-content/uploads/2015/06/The-Gherkin_safra-group.jpg',
      nicknames: ['Archmage Cave', 'Albion Jewel'],
    },
  ];
};
