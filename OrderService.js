import { Order } from './Order.js'
import { OrderStatus } from './OrderStatus.js';
export class OrderService {
    constructor(restaurantService, restaurantSelectionStrategy) {
        this.restaurantService = restaurantService;
        this.restaurantSelectionStrategy = restaurantSelectionStrategy;
        this.orders = [];
        this.dispatchedOrders = [];
    }

    createAndPlaceOrder(menuItemsList, orderId) {
        if (!menuItemsList || menuItemsList.length === 0) {
            throw new Error("Invalid menu items list");
        }

        let restaurants = this.restaurantService.getAllRestaurants();
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

        let order = new Order(orderId, selectedRestaurant.getName(), selectedRestaurant.getId());

        order.setItemsList(menuItemListToBeOrdered);

        order.setStatus(OrderStatus.ACCEPTED);

        let totalPrice = 0;
        for (let [menuItem, quantity] of menuItemListToBeOrdered) {
            totalPrice += MenuItemsInRestaurant.get(menuItem).getPrice() * quantity;
        }
        order.setTotalPrice(totalPrice);
        selectedRestaurant.addOrder(order);

        this.restaurantService.updateProcessingCapacity(selectedRestaurant.getId(), selectedRestaurant.getProcessingCapacity() - menuItemListToBeOrdered.size);

        this.orders.push((order));
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
        let restaurantId = order.getRestaurantId();
        let restaurant = this.restaurantService.getRestaurant(restaurantId);
        let processingCapacityConsumed = 0;
        for (let quantity of order.getItemsList().values()) {
            processingCapacityConsumed += quantity;
        }
        this.restaurantService.updateProcessingCapacity(order.getRestaurantId(), restaurant.getProcessingCapacity() - processingCapacityConsumed);

        this.dispatchedOrders.push(order);
        return order;
    }

    showDispatchedOrders() {
        return [...dispatchedOrders];
    }

    getOrder(orderId) {
        // console.log(orderId, " ", typeof orderId);
        for (let order of this.orders) {
            // console.log(`Order found: ${order.getId()} of type ${typeof order.getId()}`);
            if (order.getId() == orderId) {
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