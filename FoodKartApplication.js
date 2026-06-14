import { RestaurantService } from "./RestaurantService.js";
import { Restaurant } from "./Restaurant.js";
import { MenuItem } from "./MenuItem.js";
import { ProcessingCapacityRestaurantStrategy } from "./ProcessingCapacityRestaurantStrategy.js";
import { OrderService } from "./OrderService.js";
import { CommandProcessor } from "./CommandProcessor.js";

function foodKartApplication() {
    const restaurantService = new RestaurantService();

    const restaurant1 = new Restaurant(1, "Haldiram", "location1", 100);
    const restaurant2 = new Restaurant(2, "Bikanervala", "location2", 200);
    const restaurant3 = new Restaurant(3, "Mcdonald", "location3", 300);

    const itemList1 = [];
    const itemList2 = [];

    const item1 = new MenuItem(1, "Paneer Tikka", 200, true);
    const item2 = new MenuItem(2, "Veg Biryani", 150, true);
    const item3 = new MenuItem(3, "Chole Bhature", 200, true);
    const item4 = new MenuItem(4, "Paneer Butter Masala", 250, true);
    const item5 = new MenuItem(5, "Veg Pulao", 180, true);

    itemList1.push(item1, item2, item3, item4);
    itemList2.push(item5, item1, item2, item3);

    restaurantService.addRestaurant(restaurant1, itemList1, 100);
    restaurantService.addRestaurant(restaurant2, itemList2, 200);
    restaurantService.addRestaurant(restaurant3, itemList1, 300);

    const restaurantStrategy = new ProcessingCapacityRestaurantStrategy();
    const orderService = new OrderService(restaurantService, restaurantStrategy);
    const commandProcessor = new CommandProcessor(restaurantService, orderService);

    const inputCommands = [
        "5, place-order, order2, Paneer Tikka, Veg Biryani, Chole Bhature",
        "2, update-price, restaurant3, Paneer Tikka, 50",
        "8, dispatch-order, order2",
        "5, place-order, order3, Veg Biryani, Chole Bhature",
        "3, place-order, order1, Paneer Tikka"
    ];

    commandProcessor.processInputCommands(inputCommands);
}

foodKartApplication();