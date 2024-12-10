// src/components/ProductDetails.jsx
import { Component } from 'react';
import axios from 'axios';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchProductDetails();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.productId !== this.props.productId) {
            this.fetchProductDetails();
        }
        if (prevProps.product !== this.props.product) {
            this.setState({ product: this.props.product });
        }
    }

    fetchProductDetails = () => {
        axios.get(`http://127.0.0.1:5000/product/${this.props.productId}`)
            .then(response => {
                this.setState({ product: response.data, error: null });
            })
            .catch(error => {
                this.setState({ error: 'Error fetching product details' });
            });
    };

    handleDelete = () => {
        axios.delete(`http://127.0.0.1:5000/product/${this.props.productId}`)
            .then(response => {
                this.props.onProductDeleted(this.props.productId);
            })
            .catch(error => {
                this.setState({ error: 'Error deleting product' });
            });
    };

    render() {
        const { product, error } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        if (!product) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>Product Details</h3>
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
                <p>Stock: {product.stock}</p>
                <button onClick={this.handleDelete}>Delete Product</button>
            </div>
        );
    }
}

export default ProductDetails;