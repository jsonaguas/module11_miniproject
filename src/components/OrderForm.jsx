import React, { Component } from 'react';
import axios from 'axios';

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            products: [],
            customer_id: null,
            product_id: null,
            order_date: '', // New state variable for order date
            error: null
        };
    }

    componentDidMount() {
        this.fetchCustomerList();
    }

    fetchCustomerList = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customer');
            this.setState({ customers: response.data });
        } catch (error) {
            this.setState({ error: 'Error fetching customer list' });
        }
    }

    fetchProductList = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            this.setState({ products: response.data });
        } catch (error) {
            this.setState({ error: 'Error fetching product list' });
        }
    }

    handleCustomerClick = (customerId) => {
        this.props.onCustomerSelect(customerId);
        this.setState({ customer_id: customerId }, () => {
            this.fetchProductList();
        });
    };

    handleProductClick = (productId) => {
        this.props.onProductSelect(productId);
        this.setState({ product_id: productId });
    };

    handleDateChange = (event) => {
        this.setState({ order_date: event.target.value });
    };

    handleOrderSubmit = async () => {
        const orderData = {
            customer_id: this.state.customer_id,
            product_id: this.state.product_id,
            quantity: 1,
            order_date: this.state.order_date // Use the selected date
        };
        try {
            await axios.post('http://127.0.0.1:5000/order', orderData);
            alert('Order submitted successfully');
        } catch (error) {
            alert('Error submitting order');
            console.error('Error submitting order:', error);
        }
    };

    render() {
        const { customers, products, customer_id, product_id, order_date, error } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div>
                <h3>Customer List</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id} onClick={() => this.handleCustomerClick(customer.id)}>
                            {customer.name}
                        </li>
                    ))}
                </ul>

                {customer_id && (
                    <div>
                        <h3>Product List</h3>
                        <ul>
                            {products.map(product => (
                                <li key={product.id} onClick={() => this.handleProductClick(product.id)}>
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {customer_id && product_id && (
                    <div>
                        <label>
                            Order Date:
                            <input type="date" value={order_date} onChange={this.handleDateChange} />
                        </label>
                        <button onClick={this.handleOrderSubmit}>Submit Order</button>
                    </div>
                )}
            </div>
        );
    }
}

export default OrderForm;