class Restaurant {
    constructor(id, name, address, processingCapacity) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.processingCapacity = processingCapacity;
        this.menuItems = new Map();
        this.ordersCompleted = [];
    }

    addMenuItem(item) {
        this.menuItems.set(item.getName(), item);
    }

    removeMenuItem(itemName) {
        this.menuItems.delete(itemName);
    }

    getMenuItem(itemName) {
        return this.menuItems.get(itemName);
    }

    addOrder(order) {
        if (this.ordersCompleted.length < this.processingCapacity) {
            this.ordersCompleted.push(order);
        } else {
            throw new Error(`Processing capacity reached for restaurant: ${this.name}. Cannot add more orders.`);
        }
    }

}