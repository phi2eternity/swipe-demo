export const breeds = [
  'Labrador Retriever',
  'German Shepherd',
  'Golden Retriever',
  'French Bulldog',
  'Bulldog',
  'Beagle',
  'Poodle',
  'Rottweiler',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund',
  'Pembroke Welsh Corgi',
  'Siberian Husky',
  'Australian Shepherd',
  'Cavalier King Charles Spaniel',
  'Shih Tzu',
  'Border Collie',
  'Chihuahua',
  'Great Dane',
  'Maltese'
];

export interface DogWeightCategory {
  name: string;
  minWeight: number;
  maxWeight: number;
};

export const dogWeightCategories: DogWeightCategory[] = [
  {
    name: "Small (S)",
    minWeight: 4,
    maxWeight: 12,
  },
  {
    name: "Small Plus (S+)",
    minWeight: 13,
    maxWeight: 20,
  },
  {
    name: "Medium (M)",
    minWeight: 21,
    maxWeight: 50,
  },
  {
    name: "Large (L)",
    minWeight: 51,
    maxWeight: 80,
  },
  {
    name: "Large Plus (L+)",
    minWeight: 81,
    maxWeight: 100,
  },
  {
    name: "Extra Large (XL)",
    minWeight: 101,
    maxWeight: 300,
  },
];



export const ages: number[] = Array.from({ length: 32 }, (_, index) => index + 1);

