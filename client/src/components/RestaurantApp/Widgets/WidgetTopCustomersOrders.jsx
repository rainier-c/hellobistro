// Import dependencies
import React from "react";

// Import CSS
import "../../../styles/Widgets.css";

const WidgetTopCustomersOrders = props => {
  let topFiveCustomersByOrders =
    props.state.restaurant.analytics.top5CustomersByOrders;

  const renderTopFiveCustomers = () => {
    return topFiveCustomersByOrders.map((customer, index) => {
      if (index < 5) {
        return (
          <div className="section info" key={index}>
            <span className="info-detail">{customer.orders}</span>
            <span className="info-label">{customer.userName}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="WidgetTotalCustomers widget widget-small">
      <div className="widget-header-icon mat-color-purple">
        <i className="material-icons">people</i>
      </div>
      <div className="widget-header-text">Top 5 Customers (Orders)</div>
      {!topFiveCustomersByOrders ? (
        <div className="loading-spinner" />
      ) : (
        renderTopFiveCustomers()
      )}
    </div>
  );
};

export default WidgetTopCustomersOrders;
