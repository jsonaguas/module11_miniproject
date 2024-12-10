import { Component } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import UpdateCustomerForm from './components/UpdateCustomerForm';
import CustomerList from './components/CustomerList';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCustomerId: null,
            selectedProductId: null,
            customers: [],
            products: []
        };
    }

    handleCustomerSelect = (customerId) => {
        this.setState({ selectedCustomerId: customerId });
    };

    handleCustomerDeleted = (customerId) => {
        this.setState(prevState => ({
            selectedCustomerId: null,
            customers: prevState.customers.filter(customer => customer.id !== customerId)
        }));
    };



    updateCustomerList = (customers) => {
        this.setState({ customers });
    };

    addCustomer = (newCustomer) => {
      this.setState(prevState => ({
          customers: [...prevState.customers, newCustomer]
      }));
  };


  updateCustomerDetails = (updatedCustomer) => {
      this.setState(prevState => ({
          customers: prevState.customers.map(customer =>
              customer.id === updatedCustomer.id ? updatedCustomer : customer
          )
      }));
  };



    render() {
        const { selectedCustomerId, customers} = this.state;
        const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);
        return (
            <div className="app-container">
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
                
            </div>
        );
    }
}

export default App;
