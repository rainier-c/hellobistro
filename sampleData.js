const Restaurants = [
  { 
  id: 1,
  name: "Zum Stammtisch Restaurant",
  email: "zumstammtisch@gmail.com",
  phone: "7183863014",
  addressOne: "6946 Myrtle Ave",
  addressTwo: null,
  city: "Glendale",
  state: "NY",
  zip: "11385",
  description: "best german food, number 1 voted by new york times",
  genre: "german",
  type: "seafood",
  paymentId: null
  },
  { 
    id: 2,
    name: "Koi Palace",
    email: "KoiPalace@hotmail.com",
    phone: "9258339090",
    addressOne: "4288 Dublin Blvd",
    addressTwo: "suite #213",
    city: "Dublin",
    state: "CA",
    zip: "94568",
    description: "chinese food, served in morning for dim sum, dinner menu aviable after 5pm",
    genre: "chinese",
    type: "dinner",
    paymentId: "23"
  },
  { 
    id: 3,
    name: "Tasty Pot",
    email: "TastyPot@yahoo.com",
    phone: "5108981202",
    addressOne: "2115 Kittredge St",
    addressTwo: null,
    city: "Berkeley",
    state: "CA",
    zip: "94704",
    description: "hot pot served individually, bringing you happiness",
    genre: "Taiwanese",
    type: "hot pot",
    paymentId: "15"
  },
  { 
    id: 4,
    name: "Mayflower Restaurant",
    email: "Mayflower12@gmail.com",
    phone: "9255518088",
    addressOne: "4086 Grafton St",
    addressTwo: null,
    city: "Dublin",
    state: "CA",
    zip: "94568",
    description: "Traditional chinese restaurant. Finest dishes ever.",
    genre: "Chinese",
    type: "Food",
    paymentId: "16"
  },
  { 
    id: 5,
    name: "Sushi House",
    email: "juicyFish@gmail.com",
    phone: "5108650999",
    addressOne: "2375 Shore Line Dr",
    addressTwo: "suite A",
    city: "Alameda",
    state: "CA",
    zip: "94501",
    description: "You can make reservations for our outdoor patio area. We have heaters to keep you warm. It wouldn't be a bad idea to bring a jacket if you plan on dining at the outdoor patio area. Please give us a call at (510)865-0999 for your reservation.",
    genre: "Japanese",
    type: "Sushi",
    paymentId: "66"
  }
]

const RestaurantUsers = [
  { 
    id: 1,
    RestaurantId: 5,
    email: "bestChef@gmail.com",
    password: "123",
    phone: "5103660999"
  },
  { 
    id: 2,
    RestaurantId: 3,
    email: "fireBenderNation@gmail.com",
    password: "123",
    phone: null
  },
  { 
    id: 3,
    RestaurantId: 2,
    email: "fatfish@gmail.com",
    password: "123",
    phone: null
  }
]

const Customers = [
  { 
    id: 1,
    userName: "eatEverything",
    firstName: null,
    lastName: null,
    password: "123",
    zip: null,
    phone: null,
    email: "IeatRiceErryDay@gmail.com",
    availVotes: null,
    paymentId: 1,
    vendor: null,
    apiKey: null
  },
  { 
    id: 2,
    userName: "SuperSaiyan",
    firstName: "Goku",
    lastName: "Son",
    password: "123",
    zip: null,
    phone: null,
    email: "kamehamehaa@gmail.com",
    availVotes: 5,
    paymentId: 1,
    vendor: null,
    apiKey: null
  },
  { 
    id: 3,
    userName: "Prince of All Saiyans",
    firstName: "Vegeta",
    lastName: null,
    password: "123",
    zip: "94546",
    phone: null,
    email: "IamStrongerThanGoku@gmail.com",
    availVotes: 3,
    paymentId: 1,
    vendor: null,
    apiKey: null
  },
  { 
    id: 4,
    userName: "Pirate King",
    firstName: "Monkey D.",
    lastName: "Luffy",
    password: "123",
    zip: null,
    phone: null,
    email: "IeatMeat@gmail.com",
    availVotes: 0,
    paymentId: 1,
    vendor: null,
    apiKey: null
  },
  { 
    id: 5,
    userName: "Fatboy",
    firstName: "John",
    lastName: "Doe",
    password: "123",
    zip: null,
    phone: "5101239876",
    email: "foodCritic1@gmail.com",
    availVotes: 5,
    paymentId: 1,
    vendor: null,
    apiKey: null
  }
]

const MenuSections = [
  {
    id: 1,
    name: "breakfast",
    description: null,
    RestaurantId: 2
  },
  {
    id: 2,
    name: "breakfast",
    description: null,
    RestaurantId: 2
  },
  {
    id: 3,
    name: "brunch",
    description: 'breakfast and lunch',
    RestaurantId: 2
  },
  {
    id: 4,
    name: "lunch",
    description: null,
    RestaurantId: 3
  },
  {
    id: 5,
    name: "dinner",
    description: null,
    RestaurantId: 2
  },
  {
    id: 6,
    name: "dinner",
    description: null,
    RestaurantId: 5
  },
  {
    id: 7,
    name: "lateNight",
    description: "after 11pm",
    RestaurantId: 3
  }
]

const MenuItems = [
  {
    MenuSectionId: 1,
    RestaurantId: 2,
    name: "Siu Mai",
    price: 5.10,
    image: null,
    prepTime: 10,
    vegan: 0,
    vegetarian: 0,
    glutenFree: 0,
    spicy: null,
    rating: 20
  },
  {
    MenuSectionId: 4,
    RestaurantId: 3,
    name: "Beef Pot",
    price: 9.99,
    image: null,
    prepTime: 15,
    vegan: 0,
    vegetarian: 0,
    glutenFree: 0,
    spicy: null,
    rating: 1
  },
  {
    MenuSectionId: 4,
    RestaurantId: 3,
    name: "Vegetable Pot",
    price: 8.99,
    image: null,
    prepTime: 12,
    vegan: null,
    vegetarian: null,
    glutenFree: null,
    spicy: 5,
    rating: 50
  },
  {
    MenuSectionId: 6,
    RestaurantId: 5,
    name: "Dragon Roll",
    price: 12.99,
    image: null,
    prepTime: 10,
    vegan: null,
    vegetarian: null,
    glutenFree: null,
    spicy: null,
    rating: null
  },
  {
    MenuSectionId: 6,
    RestaurantId: 5,
    name: "Spicy Spider Roll",
    price: 12.50,
    image: null,
    prepTime: 12,
    vegan: null,
    vegetarian: null,
    glutenFree: 1,
    spicy: 9,
    rating: 23
  },
  {
    MenuSectionId: 6,
    RestaurantId: 5,
    name: "Fish Ball Udon Noodle",
    price: 13.99,
    image: null,
    prepTime: 9,
    vegan: null,
    vegetarian: null,
    glutenFree: 1,
    spicy: 1,
    rating: 88
  }
]

const CustomerRating = [
  {
    CustomerId: 1,
    MenuItemId: 1,
    total: 2
  },
  {
    CustomerId: 2,
    MenuItemId: 2,
    total: null
  },
  {
    CustomerId: 4,
    MenuItemId: 2,
    total: 1
  },
  {
    CustomerId: 5,
    MenuItemId: 6,
    total: 5
  },
  {
    CustomerId: 5,
    MenuItemId: 3,
    total: 3
  }
]

const Orders = [
  {
    CustomerId: 5,
    status: "delivered",
    total: 26.49,
    createdAt: "2018-04-10 22:59:52",
    completedAt: "2018-04-10 23:10:55",
    transaction: "credit card",
    RestaurantId: 5,
    table: 1
  },
  {
    CustomerId: 2,
    status: "paid",
    total: 18.98,
    createdAt: "2018-04-11 11:05:52",
    completedAt: "2018-04-11 11:30:00",
    transaction: "cash",
    RestaurantId: 3,
    table: 3
  }
]

const OrderItems = [
  {
    OrderId: 1,
    MenuItemId: 5,
    request: "delivery",
    price: 12.50,
    promoId: null
  },
  {
    OrderId: 1,
    MenuItemId: 6,
    request: "delivery",
    price: 13.99,
    promoId: null
  },
  {
    OrderId: 2,
    MenuItemId: 2,
    request: null,
    price: 9.99,
    promoId: null
  },
  {
    OrderId: 2,
    MenuItemId: 3,
    request: null,
    price: 8.99,
    promoId: null
  }
]


module.exports.sampleRestaurants = Restaurants;
module.exports.sampleRestaurantUsers = RestaurantUsers;
module.exports.sampleCustomers = Customers;
module.exports.sampleMenuSections = MenuSections;
module.exports.sampleMenuItems = MenuItems;
module.exports.sampleCustomerRating = CustomerRating;
module.exports.sampleOrders = Orders;
module.exports.sampleOrderItems = OrderItems;
