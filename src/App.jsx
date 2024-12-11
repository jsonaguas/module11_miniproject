import { Component } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import UpdateCustomerForm from './components/UpdateCustomerForm';
import CustomerList from './components/CustomerList';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import UpdateProductForm from './components/UpdateProductForm';
import OrderForm from './components/OrderForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import NaviBar from './components/NaviBar';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCustomerId: null,
            selectedProductId: null,
            customers: [],
            products: [],
        };
    }
    

    handleCustomerSelect = (customerId) => {
        this.setState({ selectedCustomerId: customerId });
    };
    handleProductSelect = (productId) => {
        this.setState({ selectedProductId: productId });
    };

    handleCustomerDeleted = (customerId) => {
        this.setState(prevState => ({
            selectedCustomerId: null,
            customers: prevState.customers.filter(customer => customer.id !== customerId)
        }));
    };

    handleProductDeleted = (productId) => {
        this.setState(prevState => ({
            selectedProductId: null,
            products: prevState.products.filter(product => product.id !== productId)
        }));
    };

    updateCustomerList = (customers) => {
        this.setState({ customers });
    };

    updateProductList = (products) => {
        this.setState({ products });
    };

    addCustomer = (newCustomer) => {
        this.setState(prevState => ({
            customers: [...prevState.customers, newCustomer]
        }));
    };

    addProduct = (newProduct) => {
        this.setState(prevState => ({
            products: [...prevState.products, newProduct]
        }));
    };

    updateCustomerDetails = (updatedCustomer) => {
        this.setState(prevState => ({
            customers: prevState.customers.map(customer =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        }));
    };

    updateProductDetails = (updatedProduct) => {
        this.setState(prevState => ({
            products: prevState.products.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        }));
    };

    render() {
        const { selectedCustomerId, customers, selectedProductId, products } = this.state;
        const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);
        const selectedProduct = products.find(product => product.id === selectedProductId);

        return (
                <div className="app-container">
                    <NaviBar />
                    <Routes>
                        <Route path="/customers" element={
                            <>
                                <h1>Our Customers</h1>
                                <CustomerForm onAddCustomer={this.addCustomer} />
                                <CustomerList 
                                    customers={customers} 
                                    onCustomerSelect={this.handleCustomerSelect} 
                                    updateCustomerList={this.updateCustomerList}
                                />
                                {selectedCustomer && (
                                    <>
                                        <CustomerDetails 
                                            customerId={selectedCustomerId} 
                                            customer={selectedCustomer}
                                            onCustomerDeleted={this.handleCustomerDeleted}
                                        />
                                        <UpdateCustomerForm 
                                            customerId={selectedCustomerId} 
                                            onUpdateCustomerDetails={this.updateCustomerDetails}
                                        />
                                    </>
                                )}
                            </>
                        } />
                        <Route path="/products" element={
                            <>
                                <h1>Our Products</h1>
                                <ProductForm onAddProduct={this.addProduct} />
                                <ProductList 
                                    products={products} 
                                    onProductSelect={this.handleProductSelect} 
                                    updateProductList={this.updateProductList}
                                />
                                {selectedProduct && (
                                    <>
                                        <ProductDetails 
                                            productId={selectedProductId} 
                                            product={selectedProduct}
                                            onProductDeleted={this.handleProductDeleted}
                                        />
                                        <UpdateProductForm 
                                            productId={selectedProductId} 
                                            onUpdateProductDetails={this.updateProductDetails}
                                        />
                                    </>
                                )}
                            </>
                        } />
                        <Route path="/orders" element={
                            <>
                                <h1>Place an Order</h1>
                                <OrderForm 
                                    customers={customers} 
                                    products={products} 
                                    onCustomerSelect={this.handleCustomerSelect} 
                                    onProductSelect={this.handleProductSelect}
                                />
                            </>
                        } />
                        <Route path="/" element={<h1>Welcome to Our Store</h1>} />
                    </Routes>
                </div>
        );
    }
}

export default App;
