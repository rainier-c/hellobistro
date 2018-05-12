const sequelize = require('sequelize');
const {
  Customer,
  CustomerRating,
  MenuItem,
  Order,
  OrderItem,
  Restaurant,
  RestaurantUser,
  MenuSection,
} = require('../database/index.js');

// LOAD DATA

const data = {};

const getUsers = async () => {
  data.users = await Customer.findAll({}).map(user => user.get({ plain: true }));
  console.log(data.users.length, ' users loaded.');
};

const getRestaurants = async () => {
  data.restaurants = await Restaurant.findAll({ include: [{ model: MenuItem }] }).map(biz => biz.get({ plain: true }));
  // filter out restaurants that don't have menu items.
  data.restaurants = data.restaurants.filter(biz => (biz.MenuItems ? biz.MenuItems.length > 0 : 1 + 1 === 3));
  console.log(data.restaurants, ' restaurants loaded.');
};

// HELPER FUNCTIONS

const getRandomUserId = () => {
  const min = 0;
  const max = data.users.length;
  const i = Math.floor(Math.random() * (max - min)) + min;
  return data.users[i].id;
};

const getRandomRestaurantId = () => {
  const min = 0;
  const max = data.restaurants.length;
  const i = Math.floor(Math.random() * (max - min)) + min;
  return data.restaurants[i].id;
};

const getRandomQuantity = () => {
  const min = 1;
  const max = 5;
  return Math.floor(Math.random() * (max - min)) + min;
};

// SIMULATOR ACTIONS

const toggleOrderStatus = (ordersArray) => {
  ordersArray.forEach((order) => {
    Order.findOne({ where: { id: order.id } }).then(result => result.update({ completedAt: order.completedAt, status: order.status }));
  });
};

// Pass in options object in following format --> {restaurantId: 1, customerId: 3, }
const generateOrder = (options) => {
  const RestaurantId = options.restaurantId || getRandomRestaurantId();
  const CustomerId = options.customerId || getRandomUserId();
  const quantity = options.quantity || getRandomQuantity();
  const createdAt = options.createdAt || sequelize.literal('CURRENT_TIMESTAMP');
  const completedAt = options.completedAt || null;
  const status = options.status || 'queued';
  const menu = data.restaurants.find(biz => biz.id === RestaurantId).MenuItems;
  const order = [];
  const min = 0;
  const max = menu.length - 1;
  // randomly select 'i' quantity of food items at index of 'j'
  for (let i = 1; i <= quantity; i += 1) {
    const j = Math.floor(Math.random() * (max - min)) + min;
    if (order.indexOf(menu[j]) === -1) {
      const orderItem = menu[j];
      orderItem.quantity = 1;
      orderItem.special = 'Generated by simulator';
      order.push(orderItem);
    } else {
      const k = order.indexOf(menu[j]);
      order[k].quantity += 1;
    }
  }
  // calculate total bill based on items in order.
  const total = order.reduce((a, b) =>
    a + (b.price * b.quantity), 0);
  console.log('Generated Order... customerId: ', CustomerId, ' resturantId: ', RestaurantId, ' items: ', order, ' Total price: ', total);

  // post order to database.
  Order.create({
    status,
    total,
    transactionId: 111,
    table: 'Generated by simulator',
    CustomerId,
    RestaurantId,
    createdAt,
    completedAt,
  }).then((result) => {
    console.log('Successfully created order');
    order.forEach((item) => {
      result.addMenuItem(item.id, { through: { special: item.special, price: item.price } }).then((resultitem) => { console.log('Created orderitem', resultitem); });
    });
  });
};

// Simulator
const getRandomTimeInterval = () => {
  const intervals = [30000, 60000];
  const min = 0;
  const max = intervals.length;
  const i = Math.floor(Math.random() * (max - min)) + min;
  return intervals[i];
};

const startSimulation = async () => {
  await getUsers();
  await getRestaurants();
  /** GENERATE A RANDOM ORDER (COPY FUNCTION TO GENERATE MULTIPLE) */
  generateOrder({RestaurantId: 24});
  /** GENERATE ORDERS FOR A SPECIFIED DATE / TIME */
  // generateOrder({restaurantId: 24, status: 'completed', createdAt: '2018-01-02 07:10:52', completedAt: '2018-01-02 07:20:52' });
  /** GENERATE ONE RANDOM ORDER EVERY 30 SECONDS */
  // setInterval(generateOrder, 30000);
  /** MODIFY AN ORDER */
  // toggleOrderStatus([{ id: 15, completedAt: '2018-05-02 22:16:42', status: 'completed' }, { id: 17, completedAt: '2018-05-03 05:13:49', status: 'completed' }, { id: 18, completedAt: '2018-05-03 22:43:13', status: 'completed' }, { id: 19, completedAt: '2018-05-03 22:48:05', status: 'completed' }, { id: 20, completedAt: '2018-05-04 01:24:25', status: 'completed' }, { id: 21, completedAt: '2018-05-04 05:35:26', status: 'completed' }, { id: 22, completedAt: '2018-05-04 05:40:32', status: 'completed' }, { id: 23, completedAt: '2018-05-05 04:36:07', status: 'completed' }, { id: 56, completedAt: '2018-05-04 04:59:09', status: 'completed' }]);
};

startSimulation();
