class Order {
    constructor(id, restaurantName, restaurantId) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.restaurantId = restaurantId;
        this.status = OrderStatus.PENDING;
        this.totalPrice = 0;
        this.itemsList = new Map();
    }

    getId() {
        return this.id;
    }

    setId() {
        this.id = id;
    }

    getRestaurantName() {
        return this.restaurantName;
    }

    setRestaurantName(restaurantName) {
        this.restaurantName = restaurantName;
    }

    getItemsList() {
        return this.itemsList;
    }

    setItemsList(itemsList) {
        this.itemsList = itemsList;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    getTotalPrice() {
        return this.totalPrice;
    }

    setTotalPrice(totalPrice) {
        this.totalPrice = totalPrice;
    }

    getRestaurantId() {
        return this.restaurantId;
    }

    setRestaurantId(restaurantId) {
        this.restaurantId = restaurantId;
    }
}