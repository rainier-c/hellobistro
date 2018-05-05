const moment = require("moment");
const {
  Customer,
  Restaurant,
  MenuSection,
  MenuItem,
  Order,
  OrderItem
} = require("../database/index.js");

let customerDirectory = {};

let colors = [
  "#EF5350",
  "#FF7043",
  "#FFEE58",
  "#66BB6A",
  "#29B6F6",
  "#5C6BC0",
  "#AB47BC",
  "#EF5350",
  "#FF7043",
  "#FFEE58",
  "#66BB6A",
  "#29B6F6",
  "#5C6BC0",
  "#AB47BC",
  "#EF5350",
  "#FF7043",
  "#FFEE58",
  "#66BB6A",
  "#29B6F6",
  "#5C6BC0",
  "#AB47BC"
];

let analyticsData = null;

const generateAnalyticsObject = () => {
  const defaultAnalyticsObject = {
    allCustomers: [],
    totalCustomers: 0,
    totalCustomersLast30Days: 0,
    totalCustomersLast60Days: 0,
    totalCustomersLast90Days: 0,
    topFiveCustomersByRevenue: null,
    topFiveCustomersByOrders: null,
    totalRevenue: 0,
    totalRevenueLast30Days: 0,
    totalRevenueLast60Days: 0,
    totalRevenueByDayOfWeek: {
      data: {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
      },
      widgetData: {
        datasets: [
          {
            label: null,
            data: [],
            backgroundColor: colors,
          },
        ],
        labels: [],
      },
      Monday: 0,
    },
    totalRevenueByMonth: {
      data: {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      },
      widgetData: {
        datasets: [
          {
            label: null,
            data: [],
            backgroundColor: colors,
          }
        ],
        labels: []
      }
    },
    itemOrderTotals: {
      data: {},
      widgetData: {
        datasets: [
          {
            data: [],
            backgroundColor: colors
          }
        ],
        labels: []
      }
    },
    openOrders: []
  };

  return defaultAnalyticsObject;
};

const buildTotalCustomers = () => {
  analyticsData.totalCustomers = customerDirectory.length;
};

const buildTotalRevenue = order => {
  analyticsData.totalRevenue += order.total;
  return null;
};

const buildTotalRevenueLast30Days = order => {
  let now = moment(Date.now());
  let completed = moment(order.completedAt);
  let diffInDays = now.diff(completed, "days");

  if (diffInDays <= 30) {
    analyticsData.totalRevenueLast30Days += order.total;
  }

  return null;
};

const buildTotalRevenueLast60Days = order => {
  let now = moment(Date.now());
  let completed = moment(order.completedAt);
  let diffInDays = now.diff(completed, "days");

  if (diffInDays <= 60) {
    analyticsData.totalRevenueLast60Days += order.total;
  }

  return null;
};

const buildTotalRevenueByDayOfWeek = order => {
  let day = moment(order.completedAt).format("dddd");
  analyticsData.totalRevenueByDayOfWeek.data[day] += order.total;
};

const buildTotalRevenueByMonth = order => {
  let month = moment(order.completedAt).format("MMM");
  analyticsData.totalRevenueByMonth.data[month] += order.total;
};

const buildCustomerDirectory = order => {
  const currentCustomer = order.Customer.userName;

  if (!customerDirectory[currentCustomer]) {
    customerDirectory[currentCustomer] = {
      orders: 1,
      totalRevenue: order.total,
      averageRevenue: order.total,
      lastOrderDate: order.completedAt
    };
  } else {
    customerDirectory[currentCustomer].orders++;
    customerDirectory[currentCustomer].totalRevenue += order.total;
    customerDirectory[currentCustomer].averageRevenue =
      customerDirectory[currentCustomer].totalRevenue /
      customerDirectory[currentCustomer].orders;

    if (customerDirectory[currentCustomer.lastOrderDate < order.completedAt]) {
      customerDirectory[currentCustomer].lastOrderDate = order.completedAt;
    }
  }
};

const buildAllCustomers = () => {
  analyticsData.allCustomers.length = 0;

  // analyticsData.totalCustomers = customerDirectory.length;

  for (var key in customerDirectory) {
    let completed = moment(customerDirectory[key].lastOrderDate);
    let now = moment(Date.now());

    let diffInDays = now.diff(completed, "days");

    analyticsData.totalCustomers++;

    if (diffInDays <= 30) {
      analyticsData.totalCustomersLast30Days++;
    }

    if (diffInDays <= 60) {
      analyticsData.totalCustomersLast60Days++;
    }

    if (diffInDays <= 90) {
      analyticsData.totalCustomersLast90Days++;
    }

    let customer = Object.assign({}, customerDirectory[key], { userName: key });
    analyticsData.allCustomers.push(customer);
  }

  analyticsData.allCustomers.sort((a, b) => {
    var nameA = a.userName.toLowerCase();
    var nameB = b.userName.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};

const buildTopFiveCustomersByOrders = () => {
  analyticsData.topFiveCustomersByOrders = analyticsData.allCustomers
    .slice()
    .sort((a, b) => {
      if (a.orders < b.orders) {
        return 1;
      }
      if (a.orders > b.orders) {
        return -1;
      }

      // names must be equal
      return 0;
    });
};

const buildTopFiveCustomersByRevenue = () => {
  analyticsData.topFiveCustomersByRevenue = analyticsData.allCustomers
    .slice()
    .sort((a, b) => {
      if (a.totalRevenue < b.totalRevenue) {
        return 1;
      }
      if (a.totalRevenue > b.totalRevenue) {
        return -1;
      }

      // names must be equal
      return 0;
    });
};

const buildItemOrderTotals = order => {
  order.MenuItems.forEach(item => {
    if (!analyticsData.itemOrderTotals.data[item.id]) {
      analyticsData.itemOrderTotals.data[item.id] = {
        name: item.name,
        orders: 1,
        totalRevenue: item.price
      };
    } else {
      analyticsData.itemOrderTotals.data[item.id].orders++;
      analyticsData.itemOrderTotals.data[item.id].totalRevnue += item.price;
    }
  });
};

const analytics = {
  async buildAndSendData(req, res) {
    analyticsData = generateAnalyticsObject();
    const { restaurant_id } = req.params;

    orders = await Order.findAll({
      where: {
        RestaurantId: restaurant_id
      },
      include: [
        {
          model: MenuItem,
          required: false
        },
        {
          model: Customer,
          required: false
        }
      ]
    });

    customerDirectory = {};

    await orders.forEach(order => {
      // If order is not completed, push it to openOrders
      if (!order.completedAt) {
        analyticsData.openOrders.push(order);
      } else {
        buildTotalRevenue(order);
        buildTotalRevenueLast30Days(order);
        buildTotalRevenueLast60Days(order);
        buildTotalRevenueByDayOfWeek(order);
        buildTotalRevenueByMonth(order);
        buildCustomerDirectory(order);
        buildItemOrderTotals(order);
      }
    });

    await buildAllCustomers();
    await buildTopFiveCustomersByRevenue();
    await buildTopFiveCustomersByOrders();

    for (var key in analyticsData.itemOrderTotals.data) {
      let item = analyticsData.itemOrderTotals.data[key];
      analyticsData.itemOrderTotals.widgetData.datasets[0].data.push(
        item.orders
      );
      analyticsData.itemOrderTotals.widgetData.labels.push(item.name);
    }

    for (var key in analyticsData.totalRevenueByMonth.data) {
      let month = analyticsData.totalRevenueByMonth.data[key];
      analyticsData.totalRevenueByMonth.widgetData.datasets[0].data.push(month);
      analyticsData.totalRevenueByMonth.widgetData.labels.push(key);
    }

    for (var key in analyticsData.totalRevenueByDayOfWeek.data) {
      let day = analyticsData.totalRevenueByDayOfWeek.data[key];
      analyticsData.totalRevenueByDayOfWeek.widgetData.datasets[0].data.push(
        day
      );
      analyticsData.totalRevenueByDayOfWeek.widgetData.labels.push(key);
    }

    res.json(analyticsData);
  }
};

module.exports = analytics;
