// src/components/UpdateProductForm.jsx
import { Component } from 'react';
import axios from 'axios';

class UpdateProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            stock: '',
            errors: {},
            errorMessage: ''
        };
    }

    componentDidMount() {
        this.fetchProductDetails();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.productId !== this.props.productId) {
            this.fetchProductDetails();
        }
    }

    fetchProductDetails = () => {
        axios.get(`http://127.0.0.1:5000/product/${this.props.productId}`)
            .then(response => {
                const product = response.data;
                this.setState({
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                    errorMessage: ''
                });
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                this.setState({ errorMessage: 'Error fetching product details' });
            });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateForm = () => {
        const { name, price, stock } = this.state;
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!price) errors.price = 'Price is required';
        return errors;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            const productData = {
                name: this.state.name,
                price: parseFloat(this.state.price),
                stock: parseInt(this.state.stock, 10)
            };

            try {
                const response = await axios.put(`http://127.0.0.1:5000/product/${this.props.productId}`, productData);
                this.props.onUpdateProductDetails(response.data);
                this.setState({ errorMessage: '' });
            } catch (error) {
                console.error('Error updating product:', error);
                this.setState({ errorMessage: 'Error updating product' });
            }
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { name, price, stock, errors, errorMessage } = this.state;

        return (
            <form className="formy" onSubmit={this.handleSubmit}>
                <h3>Update Product</h3>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={this.handleChange} />
                    {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                </label>
                <br />
                <label>
                    Price:
                    <input type="text" name="price" value={price} onChange={this.handleChange} />
                    {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
                </label>
                <br />
                <label>
                    Stock:
                    <input type="text" name="stock" value={stock} onChange={this.handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default UpdateProductForm;