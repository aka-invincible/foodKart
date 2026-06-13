class OrderService {
    constructor(restaurantService, restaurantSelectionStrategy) {
        this.restaurantService = restaurantService;
        this.restaurantSelectionStrategy = restaurantSelectionStrategy;
    }

    createAndPlaceOrder(menuItemsList, orderId) {
        if (!menuItemsList || menuItemsList.length === 0) {
            throw new Error("Invalid menu items list");
        }

        let restaurants = this.restaurantService.getRestaurants();
        let selectedRestaurant = this.restaurantSelectionStrategy.findRestaurant(restaurants, menuItemsList);

        if (!selectedRestaurant) {
            throw new Error("No restaurant can fulfill the order");
        }

        let MenuItemsInRestaurant = selectedRestaurant.getMenuItems();
        let menuItemListToBeOrdered = new Map();
        for (let menuItem of menuItemsList) {
            if (!MenuItemsInRestaurant.has(menuItem)) {
                throw new Error(`Menu item ${menuItem} is not available in the selected restaurant`);
            }
            if (menuItemListToBeOrdered.get(menuItem) === undefined) {
                menuItemListToBeOrdered.set(menuItem, 1);
            } else {
                menuItemListToBeOrdered.set(menuItem, menuItemListToBeOrdered.get(menuItem) + 1);
            }
        }

        let order = new Order(orderId, selectedRestaurant.getName(),
            selectedRestaurant.getId());

        order.setItemsList(menuItemListToBeOrdered);

        order.setStatus(OrderStatus.ACCEPTED);

        let totalPrice = 0;
        for (let [menuItem, quantity] of menuItemListToBeOrdered) {
            totalPrice += MenuItemsInRestaurant.get(menuItem).getPrice() * quantity;
        }
        order.setTotalPrice(totalPrice);
        selectedRestaurant.addOrder(order);

        this.restaurantService.updateProcessing(selectedRestaurant.getId(), selectedRestaurant.getProcessingCapacity() - menuItemListToBeOrdered.size);

        orders.add(order);
        return order;
    }

    dispatchOrder(order) {
        if (!order) {
            throw new Error("Invalid order");
        }
        if (order.getStatus() === OrderStatus.DISPATCHED) {
            throw new Error("Order is already dispatched");
        }
        order.setStatus(OrderStatus.DISPATCHED);
        let processingCapacityConsumed = 0;
        for (let quantity of order.getItemsList().values()) {
            processingCapacityConsumed += quantity;
        }
        this.restaurantService.updateProcessing(order.getRestaurantId(), this.restaurantService.getProcessingCapacity(order.getRestaurantId()) - processingCapacityConsumed);

        dispatchedOrders.add(order);
        return order;
    }

    showDispatchedOrders() {
        return [...dispatchedOrders];
    }

    getOrder(orderId) {
        for (let order of orders) {
            if (order.getId() === orderId) {
                return order;
            }
        }
        throw new Error(`Order with id ${orderId} not found`);
    }

    setRestaurantService(restaurantService) {
        this.restaurantService = restaurantService;
    }

    getRestaurantService() {
        return this.restaurantService;
    }

    setRestaurantStrategy(restaurantStrategy) {
        this.restaurantStrategy = restaurantStrategy;
    }

    getDispatchedOrders() {
        return [...dispatchedOrders];
    }

    setDispatchedOrders(dispatchedOrders) {
        this.dispatchedOrders = dispatchedOrders;
    }
}