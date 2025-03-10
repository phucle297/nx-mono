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
- **Events**:
  - OrderCreated
  - OrderStatusUpdated
  - OrderCancelled
  - OderPaymentRequested
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
POST   /api/v1/products            // CreateProduct
GET    /api/v1/products            // ListProducts
GET    /api/v1/products/:id        // GetProduct
PUT    /api/v1/products/:id        // UpdateProduct
DELETE /api/v1/products/:id        // DeleteProduct
GET    /api/v1/products/search     // SearchProducts

// Order Service
POST   /api/v1/orders              // CreateOrder (publishes OrderCreated and OrderPaymentRequested as needed)
GET    /api/v1/orders              // ListOrders
GET    /api/v1/orders/:id          // GetOrder
PUT    /api/v1/orders/:id/status   // UpdateOrderStatus
DELETE /api/v1/orders/:id          // CancelOrder
GET    /api/v1/orders/customer/:customerId  // Get orders for a customer

// Customer Service
POST   /api/v1/customers                   // RegisterCustomer
GET    /api/v1/customers/:id               // GetCustomerProfile
PUT    /api/v1/customers/:id               // UpdateCustomerProfile
GET    /api/v1/customers/:id/orders        // GetCustomerOrders
PUT    /api/v1/customers/:id/addresses     // UpdateShippingAddress (or manage addresses)
PUT    /api/v1/customers/:id/payment-methods // UpdateBillingInfo/payment-methods

// Cart Service
POST   /api/v1/carts               // CreateCart
GET    /api/v1/carts/:id           // GetCart
PUT    /api/v1/carts/:id/items     // Add/Update Cart Items (maps to AddItemToCart or UpdateQuantity)
DELETE /api/v1/carts/:id/items/:itemId // RemoveItemFromCart
PUT    /api/v1/carts/:id/coupon    // ApplyCoupon

// Payment Service
POST   /api/v1/payments            // ProcessPayment
POST   /api/v1/payments/:id/refund   // RefundPayment
GET    /api/v1/payments/:id/status   // GetPaymentStatus
GET    /api/v1/payments/customer/:customerId // GetPaymentHistory

// Shipping Service
POST   /api/v1/shipments           // CreateShipment
GET    /api/v1/shipments/:id/track // TrackShipment
PUT    /api/v1/shipments/:id/status // UpdateShipmentStatus
GET    /api/v1/shipments/order/:orderId // GetShipmentStatus / Shipment details for an order
```

## NX Monorepo Structure

```
project-root/
├── apps/                                       # presentation layer (only calls application layer)
│   ├── api-gateway/                            # API Gateway
│   │   ├── src/
│   │   │   ├── product/                             # versioned controllers
│   │   │   │   ├──controllers/
│   │   │   │   │   └── v1   # exposes APIs (calls services from application layer)
│   │   │   │   │       └── product.controller.ts   # exposes APIs (calls services from application layer)
│   │   │   │   └── product.module.ts
│   │   │   ├── other services/
│   │   │   ├── middlewares/
│   │   │   ├── config/
│   │   │   ├── interceptors/
│   │   │   ├── main.ts
│   │   │   └── app.module.ts
│   │   └── project.json
│   │
│   ├── product-service/                        # product microservice (cqrs, event sourcing)
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── product.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── v1/
│   │   │   │       └── product.controller.ts
│   │   │   ├── use-cases/
│   │   │   ├── views/
│   │   │   ├── middlewares/
│   │   │   └── interceptors/
│   │   └── project.json
│   │
│   └── other-microservices/
│
├── libs/                                       # core libraries (domain + application + infra)
│   ├── domain/                                 # core domain layer (inner circle)
│   │   ├── products/
│   │   │   ├── src/
│   │   │   │   ├── aggregate/
│   │   │   │   ├── entity/
│   │   │   │   ├── value-object/
│   │   │   │   ├── event/
│   │   │   │   ├── domain-service/             # pure business logic, no dependencies
│   │   │   │   ├── repository/                 # repository interfaces, not implementations
│   │   │   │   ├── types/
│   │   │   │   ├── proto/                      # *.proto file for grpc
│   │   │   │   └── index.ts
│   │   │   └── project.json/
│   │   └── other-domains/
│   │
│   ├── application/                            # application layer (use cases)
│   │   ├── src/
│   │   │   ├── commands/                       # command handlers (cqrs)
│   │   │   │   ├── handlers/
│   │   │   │   └── impl/
│   │   │   ├── queries/                        # query handlers (cqrs)
│   │   │   │   ├── handlers/
│   │   │   │   └── impl/
│   │   │   ├── event-handlers/                 # event-driven handlers
│   │   │   ├── providers/                      # mapping interfaces/abstract-class from domain layer to infrastructure
│   │   │   ├── services/                       # application services (orchestrate domain logic)
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   ├── infrastructure/                         # infrastructure layer (outermost circle)
│   │   ├── src/
│   │   │   ├── persistence/                    # database config (orm, schema)
│   │   │   ├── repository/                     # repository implementations (calls db)
│   │   │   ├── messaging/                      # message broker (kafka, rabbitmq, etc.)
│   │   │   ├── eventstore/                     # event store integration
│   │   │   ├── external-service/               # http, grpc, or third-party integrations
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   ├── sdk/                                    # sdk layer (apps interact via this)
│   │   ├── src/
│   │   │   ├── product-sdk/                    # sdk exposing application layer services
│   │   │   │   └── v1/                         # versioned sdk
│   │   │   │       ├── index.ts
│   │   │   │       └── product.client.ts       # calls application layer services
│   │   │   ├── other-services-sdk/
│   │   │   ├── api-gateway-sdk/                # sdk for clients to interact with api gateway
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   ├── common/                                 # shared utilities (constants, decorators)
│   │   ├── src/
│   │   │   ├── constant/
│   │   │   ├── cache/                          # redis, memcached, etc.
│   │   │   ├── logging/                        # winston, pino, etc.
│   │   │   ├── exception/                      # custom exceptions
│   │   │   ├── entity/                         # base entity classes
│   │   │   ├── decorator/
│   │   │   ├── middleware/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   └── eventstore/                             # event store & messaging abstractions
│       ├── src/
│       │   ├── kafka/
│       │   ├── rabbitmq/
│       │   ├── eventstore/
│       │   └── index.ts
│       └── project.json
├── tools/                                      # eslint, tsconfig,...
│   ├── eslint-config/
│   └── typescript-config/
├── nx.json                                     # nx workspace configuration
├── package.json                                # root package configuration
└── tsconfig.base.json                          # shared typescript configuration
```

## Sequence Diagrams of an API Request

- Command Flow:

```mermaid
sequenceDiagram
    participant Client
    participant API Gateway
    participant Product SDK
    participant Product Service
    participant Command Handler
    participant Product Aggregate
    participant Event Store
    participant Event Bus
    participant Kafka

    Client->>API Gateway: POST /api/v1/products

    %% SDK Layer (libs/sdk/*)
    API Gateway->>Product SDK: createProduct()

    %% Service Layer (libs/services/*)
    Product SDK->>Product Service: create(CreateProductDto)

    %% Application Layer (libs/core/application/*)
    Product Service->>Command Handler: execute(CreateProductCommand)

    %% Domain Layer (libs/core/domain/*)
    Command Handler->>Product Aggregate: create()
    Product Aggregate->>Product Aggregate: Apply Business Rules
    Product Aggregate-->>Command Handler: Return Events

    %% Infrastructure Layer (libs/core/infrastructure/*)
    Command Handler->>Event Store: Save Events
    Event Store-->>Command Handler: Confirm Save
    Command Handler->>Event Bus: Publish Events
    Event Bus->>Kafka: Produce Events

    %% Response Path through layers
    Command Handler-->>Product Service: Return Result
    Product Service-->>Product SDK: Return Result
    Product SDK-->>API Gateway: Return Result
    API Gateway-->>Client: 201 Created
```

- Query Flow:

```mermaid
sequenceDiagram
    participant Client
    participant API Gateway
    participant Product SDK
    participant Product Service
    participant Query Handler
    participant Read DB
    participant Event Store

    Client->>API Gateway: GET /api/v1/products
    API Gateway->>Product SDK: getProducts()
    Product SDK->>Product Service: getProducts()
    Product Service->>Query Handler: execute(GetProductsQuery)
    Query Handler->>Event Store: Get Latest Version
    Query Handler->>Read DB: Get Products
    Read DB-->>Query Handler: Return Data
    Query Handler-->>Product Service: Return Result
    Product Service-->>Product SDK: Return Result
    Product SDK-->>API Gateway: Return Result
    API Gateway-->>Client: 200 OK
```

### NOTE

1. Using Outbox Pattern:

- Kafka + Database:
- When a service publish event, emit to table in database instead of emit directly to kafka (outbox table)
- A background progress (CDC-Change Data Capture) (Debezium/polling worker) read data from outbox table and send event to kafka

2. Materialize View Pattern:

- Save event to Event store
- Worker/consumer listen event and update materialized view
- Materialized view act like a read model
