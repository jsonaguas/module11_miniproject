// src/components/ProductList.jsx
import { Component } from 'react';
import axios from 'axios';

class ProductList extends Component {
    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.products !== this.props.products) {
            this.fetchProducts();
        }
    }

    fetchProducts = () => {
        axios.get('http://127.0.0.1:5000/products')
            .then(response => {
                this.props.updateProductList(response.data);
            })
            .catch(error => {
                this.setState({ error: 'Error fetching products' });
            });
    };

    handleProductClick = (productId) => {
        this.props.onProductSelect(productId);
    };

    render() {
        const { products = [], error } = this.props;

        if (error) {
            return <div>{error}</div>;
        }

        return (
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
        );
    }
}

export default ProductList;