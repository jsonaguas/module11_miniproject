// src/components/ProductForm.jsx
import { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            stock: '',
            errors: {},
            errorMessage: '',
            showSuccessModal: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateForm = () => {
        const { name, price} = this.state;
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!price) errors.price = 'Price is required';
        return errors;
    };

    handleClose = () => {
        this.setState({ showSuccessModal: false });        
  };

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            const productData = {
                name: this.state.name.trim(),
                price: parseFloat(this.state.price.trim()),
                stock: parseInt(this.state.stock.trim(), 10)
            };

            try {
                const response = await axios.post('http://127.0.0.1:5000/product', productData);
                this.props.onAddProduct(response.data);
                this.setState({
                    name: '',
                    price: '',
                    stock: '',
                    errors: {},
                    errorMessage: '',
                    showSuccessModal: true
                });
            } catch (error) {
                console.error('Error adding product:', error);
                this.setState({ errorMessage: 'Error adding product' });
            }
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { name, price, stock, errors, errorMessage, showSuccessModal } = this.state;

        return (
            <><form className="formy" onSubmit={this.handleSubmit}>
                <h3>Add Product</h3>
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
            </form><Modal show={showSuccessModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Product has been successfully</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal></>
        );
    }
}

export default ProductForm;