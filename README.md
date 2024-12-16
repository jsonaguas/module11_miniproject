I have created an e-commerce page that is appropriate for an owner managing
their customer base and inventory of products. Using React, I was able to leverage
hooks and states to build the architecture of this single-page-application. Upon
running the Vite server, the home page welcomes the user to presumably the backend
of an ecommerce API. There is a navigation bar that defines the components into
3 discrete groups: customers, products, and orders that are navigable via routed pages.

For customers, one is able to submit a new customer into the database, which will re-render
the customer list component to instantly reflect the change. The customer list component
will also re-render upon any modifications of an existing customer. Each customer will
have their respective customer ID that will constantly be checked and compared to determine
which customer's details need to be displayed. There is also validation on the customer form
before submitting a new customer. Needless to say, any additions or changes are reflected
on the MySQL database.

The same mechanics exist for the products as they do for the customers. You can add
or modify a product that will be part of your e-commerce inventory. Each product
will be assigned a unique ID which will be associated with any user events on the page
such as querying any details and auto-filling the update form.

For orders, I ultimately had hoped one would click on a specific customer which will remain highlighted and then associate an order that they would like to purchase. You will then ideally submit the order. I unfortunately was unable to have this component fully operational, so
it exists purely as theory and not practice.



