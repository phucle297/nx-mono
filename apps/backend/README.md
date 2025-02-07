# Domain-Driven E-commerce System Architecture

## Core Domains & Bounded Contexts

### 1. Product Domain

- **Commands**:
  - CreateProduct
  - UpdateProduct
  - DeleteProduct
  - UpdateInventory
  - SetProductPrice
- **Events**:
  - ProductCreated
  - ProductUpdated
  - ProductDeleted
  - InventoryUpdated
  - PriceChanged
- **Queries**:
  - GetProduct
  - ListProducts
  - SearchProducts
  - GetInventoryLevel

### 2. Order Domain

- **Commands**:
  - CreateOrder
  - UpdateOrderStatus
  - CancelOrder
  - ProcessPayment
- **Events**:
  - OrderCreated
  - OrderStatusUpdated
  - OrderCancelled
  - PaymentProcessed
  - OrderFulfilled
- **Queries**:
  - GetOrder
  - ListOrders
  - GetOrderHistory
  - GetOrderStatus

### 3. Customer Domain

- **Commands**:
  - RegisterCustomer
  - UpdateCustomerProfile
  - UpdateShippingAddress
  - UpdateBillingInfo
- **Events**:
  - CustomerRegistered
  - ProfileUpdated
  - AddressUpdated
  - BillingInfoUpdated
- **Queries**:
  - GetCustomerProfile
  - GetCustomerOrders
  - GetCustomerAddresses

### 4. Cart Domain

- **Commands**:
  - CreateCart
  - AddItemToCart
  - RemoveItemFromCart
  - UpdateQuantity
  - ApplyCoupon
- **Events**:
  - CartCreated
  - ItemAdded
  - ItemRemoved
  - QuantityUpdated
  - CouponApplied
- **Queries**:
  - GetCart
  - GetCartTotal
  - GetAppliedDiscounts

### 5. Payment Domain

- **Commands**:
  - ProcessPayment
  - RefundPayment
  - CapturePayment
- **Events**:
  - PaymentProcessed
  - PaymentFailed
  - RefundInitiated
  - RefundCompleted
- **Queries**:
  - GetPaymentStatus
  - GetPaymentHistory
  - GetRefundStatus

### 6. Shipping Domain

- **Commands**:
  - CreateShipment
  - UpdateShipmentStatus
  - AssignCarrier
- **Events**:
  - ShipmentCreated
  - ShipmentStatusUpdated
  - CarrierAssigned
  - DeliveryCompleted
- **Queries**:
  - GetShipmentStatus
  - TrackShipment
  - GetDeliveryEstimate

## API Gateway Routes

```typescript
// Product Service
POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
GET    /api/products/search

// Order Service
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/status
DELETE /api/orders/:id
GET    /api/orders/customer/:customerId

// Customer Service
POST   /api/customers
GET    /api/customers/:id
PUT    /api/customers/:id
GET    /api/customers/:id/orders
PUT    /api/customers/:id/addresses
PUT    /api/customers/:id/payment-methods

// Cart Service
POST   /api/carts
GET    /api/carts/:id
PUT    /api/carts/:id/items
DELETE /api/carts/:id/items/:itemId
PUT    /api/carts/:id/coupon

// Payment Service
POST   /api/payments
POST   /api/payments/:id/refund
GET    /api/payments/:id/status
GET    /api/payments/customer/:customerId

// Shipping Service
POST   /api/shipments
GET    /api/shipments/:id/track
PUT    /api/shipments/:id/status
GET    /api/shipments/order/:orderId
```

## NX Monorepo Structure

```
apps/
  ├── ec-api-gateway/
  ├── ec-product-service/
  ├── ec-order-service/
  ├── ec-customer-service/
  ├── ec-cart-service/
  ├── ec-payment-service/
  ├── ec-shipping-service/
  └── ec-client/
libs/
  ├── shared/
  │   ├── types/
  │   ├── utils/
  │   └── configs/
  ├── api-interfaces/
  ├── event-bus/
  ├── database/
  └── ui-components/
```

## Event Store Configuration

```typescript
// Event store configuration for each service
const eventStoreConfig = {
  type: 'mysql',
  host: process.env.EVENT_STORE_HOST,
  port: process.env.EVENT_STORE_PORT || 3306,
  username: process.env.EVENT_STORE_USER,
  password: process.env.EVENT_STORE_PASSWORD,
  database: process.env.EVENT_STORE_DB,
};

// Event bus configuration
const eventBusConfig = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [process.env.KAFKA_BROKER],
    },
    consumer: {
      groupId: 'ecommerce-consumer',
    },
  },
};
```

## Required External Services & Infrastructure

1. **Databases**:

   - PostgreSQL for event store
   - MongoDB for read models
   - Redis for caching

2. **Message Brokers**:

   - Kafka for event bus
   - Redis pub/sub for real-time updates

3. **Infrastructure**:

   - Kubernetes for orchestration
   - Docker for containerization
   - Nginx for API gateway
   - ElasticSearch for product search

4. **External Services**:
   - Payment gateway (PayPal/Moomo)
   - Shipping providers' APIs
   - Email service (SendGrid/AWS SES)
   - SMS service (Twilio)
   - Object storage (S3)
