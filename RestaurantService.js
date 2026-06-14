export class RestaurantService {

    constructor() {
        this.restaurants = new Map();
    }

    addRestaurant(restaurant, menuItems, processingCapacity) {
        if (!restaurant || !menuItems || processingCapacity == null) {
            throw new Error("Invalid input: restaurant, menuItems, and processingCapacity cannot be null.");
        }

        if (this.restaurants.has(restaurant.id)) {
            throw new Error(`Restaurant with id ${restaurant.id} already exists.`);
        }

        restaurant.setProcessingCapacity(processingCapacity);

        menuItems.forEach(item => {
            restaurant.addMenuItem(item);
        });

        this.restaurants.set(restaurant.id, restaurant);
    }

    updateRestaurantMenuItem(restaurantId, updateMenuItemName, price, isAvailable) {
        if (!updateMenuItemName || updateMenuItemName.length === 0 || price < 0) {
            throw new Error("Invalid input: updateMenuItemName cannot be null or empty, and price must be >= 0.");
        }

        const restaurant = this.getRestaurant(restaurantId);

        const menuItem = restaurant.getMenuItem(updateMenuItemName);
        if (!menuItem) {
            throw new Error(`Menu item ${updateMenuItemName} not found in restaurant ${restaurant.name}.`);
        }


        menuItem.setPrice(price);
        menuItem.setIsAvailable(isAvailable);
        restaurant.addMenuItem(menuItem);
    }

    updateProcessingCapacity(restaurantId, newCapacity) {
        if (newCapacity <= 0) {
            throw new Error("Invalid input: newCapacity must be greater than 0.");
        }

        const restaurant = this.getRestaurant(restaurantId);
        restaurant.setProcessingCapacity(newCapacity);
    }

    getAllRestaurants() {
        return [...this.restaurants.values()];
    }

    getRestaurant(restaurantId) {
        const restaurant = this.restaurants.get(restaurantId);
        if (!restaurant) {
            throw new Error(`Restaurant with id ${restaurantId} not found.`);
        }
        return restaurant;
    }
}