// src/components/UpdateCustomerForm.jsx
import { Component } from 'react';
import axios from 'axios';

class UpdateCustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            errors: {},
            errorMessage: ''
        };
    }

    componentDidMount() {
        this.fetchCustomerDetails();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customerId !== this.props.customerId) {
            this.fetchCustomerDetails();
        }
    }

    fetchCustomerDetails = () => {
        axios.get(`http://127.0.0.1:5000/customer/${this.props.customerId}`)
            .then(response => {
                const customer = response.data;
                this.setState({
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    errorMessage: ''
                });
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
                this.setState({ errorMessage: 'Error fetching customer details' });
            });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateForm = () => {
        const { name, email, phone } = this.state;
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        if (!phone) errors.phone = 'Phone is required';
        return errors;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim()
            };

            try {
                const response = await axios.put(`http://127.0.0.1:5000/customer/${this.props.customerId}`, customerData);
                this.props.onUpdateCustomerDetails(response.data);
                this.setState({ errorMessage: '' });
            } catch (error) {
                console.error('Error updating customer:', error);
                this.setState({ errorMessage: 'Error updating customer' });
            }
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { name, email, phone, errors, errorMessage } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Update Customer</h3>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={this.handleChange} />
                    {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={this.handleChange} />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </label>
                <br />
                <label>
                    Phone:
                    <input type="tel" name="phone" value={phone} onChange={this.handleChange} />
                    {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default UpdateCustomerForm;