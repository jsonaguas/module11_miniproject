// src/components/CustomerForm.jsx
import { Component } from 'react';
import axios from 'axios';

class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            errors: {}
        };
    }

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
                const response = await axios.post('http://127.0.0.1:5000/customer', customerData);
                this.props.onAddCustomer(response.data);
                this.setState({
                    name: '',
                    email: '',
                    phone: '',
                    errors: {}
                });
            } catch (error) {
                console.error('Error adding customer:', error);
                this.setState({ errorMessage: 'Error adding customer' });
            }
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <form className="formy" onSubmit={this.handleSubmit}>
                <h3 className="form_title">Add Customer</h3>
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

export default CustomerForm;