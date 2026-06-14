export class ProcessingCapacityRestaurantStrategy {
    findRestaurant(availableRestaurants, menuListItems) {
        if (!availableRestaurants || availableRestaurants.length === 0) return null;

        let selectedRestaurant = null;
        let maxCapacity = -1;

        for (let restaurant of availableRestaurants) {

            let hasAllItems = true;

            for (let item of menuListItems) {
                if (!restaurant.getMenuItems().has(item)) {
                    hasAllItems = false;
                    break;
                }
            }

            if (hasAllItems && restaurant.getProcessingCapacity() > maxCapacity) {
                maxCapacity = restaurant.getProcessingCapacity();
                selectedRestaurant = restaurant;
            }
        }

        return selectedRestaurant;
    }
}