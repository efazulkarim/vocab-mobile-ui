import { faker } from '@faker-js/faker'
import niceColors from 'nice-color-palettes'
faker.seed(1)

// https://www.flaticon.com/packs/linear-color-housekeeping-elements

const data = [
  {
    type: 'Soup',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480438.png',
  },
  {
    type: 'Salad',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480473.png',
  },
  {
    type: 'Rice',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480484.png',
  },
  {
    type: 'Sushi',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480504.png',
  },
  {
    type: 'Spaguetti',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480618.png',
  },
  {
    type: 'Pizza',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480627.png',
  },
  {
    type: 'Burger',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480641.png',
  },
  {
    type: 'Fried egg',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480653.png',
  },
  {
    type: 'Pancake',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480681.png',
  },
  {
    type: 'French fries',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480708.png',
  },
  {
    type: 'Steak',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480720.png',
  },
  {
    type: 'Ice cream',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480729.png',
  },
  {
    type: 'Roast chicken',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480739.png',
  },
  {
    type: 'Cheese',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480749.png',
  },
  {
    type: 'Ramen',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480765.png',
  },
  {
    type: 'Beer',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480796.png',
  },
  {
    type: 'Orange juice',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480808.png',
  },
  {
    type: 'Hot dog',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480814.png',
  },
  {
    type: 'English breakfast',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480823.png',
  },
  {
    type: 'Tea',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480828.png',
  },
  {
    type: 'Waffle',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480833.png',
  },
  {
    type: 'Lasagna',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480844.png',
  },
  {
    type: 'Cake',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480860.png',
  },
  {
    type: 'Donut',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480867.png',
  },
  {
    type: 'Fish',
    image: 'https://cdn-icons-png.flaticon.com/256/3480/3480870.png',
  },
]

const colors = niceColors[1]
export const tabs = [
  'Today',
  'Chips',
  'Fish',
  'Tea',
  'Burger',
  'Coffee',
  'Drinks',
  'Breakfast',
]
export default data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  subType: faker.commerce.productName(),
  color: `${colors[index % colors.length]}66`,
  fullColor: colors[index % colors.length],
  description: [...Array(2).keys()]
    .map(faker.commerce.productDescription)
    .join('. '),
  price: `$${faker.datatype.number({ min: 0.5, max: 10, precision: 0.1 })}`,
  subcategories: faker.helpers.shuffle(data).slice(0, 3),
}))

export const popularFood = faker.helpers.shuffle(data).map((item) => ({
  ...item,
  key: faker.datatype.uuid(),
  rating: faker.datatype.number({ min: 2, max: 5, precision: 0.1 }),
  price: `$${faker.datatype.number({ min: 0.5, max: 10, precision: 0.1 })}`,
}))
