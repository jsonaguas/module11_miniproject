// src/components/CustomerDetails.jsx
import { Component } from 'react';
import axios from 'axios';

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchCustomerDetails();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customerId !== this.props.customerId) {
            this.fetchCustomerDetails();
        }
        if (prevProps.customer !== this.props.customer) {
            this.setState({ customer: this.props.customer });
        }
    }

    fetchCustomerDetails = () => {
        axios.get(`http://127.0.0.1:5000/customer/${this.props.customerId}`)
            .then(response => {
                this.setState({ customer: response.data, error: null });
            })
            .catch(error => {
                this.setState({ error: 'Error fetching customer details' });
            });
    };

    handleDelete = () => {
        axios.delete(`http://127.0.0.1:5000/customer/${this.props.customerId}`)
            .then(response => {
                this.props.onCustomerDeleted(this.props.customerId);
            })
            .catch(error => {
                this.setState({ error: 'Error deleting customer' });
            });
    };

    render() {
        const { customer, error } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        if (!customer) {
            return <div>Loading...</div>;
        }

        return (
            <div class="clist">
                <h3>Customer Details</h3>
                <p>Name: {customer.name}</p>
                <p>Email: {customer.email}</p>
                <p>Phone: {customer.phone}</p>
                <button onClick={this.handleDelete}>Delete Customer</button>
            </div>
        );
    }
}

export default CustomerDetails;