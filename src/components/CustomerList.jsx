// src/components/CustomerList.jsx
import { Component } from 'react';
import axios from 'axios';

class CustomerList extends Component {
    componentDidMount() {
        this.fetchCustomers();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.customers !== this.props.customers) {
            this.fetchCustomers();
        }
    }

    fetchCustomers = () => {
        axios.get('http://127.0.0.1:5000/customer')
            .then(response => {
                this.props.updateCustomerList(response.data);
            })
            .catch(error => {
                this.setState({ error: 'Error fetching customers' });
            });
    };

    handleCustomerClick = (customerId) => {
        this.props.onCustomerSelect(customerId);
    };

    render() {
        const { customers = [], error } = this.props;

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div className="clist">
                <h3>Customer List</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id} onClick={() => this.handleCustomerClick(customer.id)}>
                            {customer.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default CustomerList;