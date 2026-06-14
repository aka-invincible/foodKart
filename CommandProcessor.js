import { CommandWithTimeStamp } from "./CommandWithTimeStamp.js";
import { OrderStatus } from "./OrderStatus.js";

export class CommandProcessor {
    constructor(restaurantService, orderManager) {
        this.restaurantService = restaurantService;
        this.orderManager = orderManager;
    }

    processInputCommands(inputCommands) {
        if (!inputCommands || inputCommands.length === 0) {
            console.log("No commands to process.");
            return;
        }

        let commands = [];

        for (let command of inputCommands) {
            let commandParts = command.split(/,\s*/);
            let timeStamp = parseInt(commandParts[0]);
            commands.push(new CommandWithTimeStamp(timeStamp, command));
        }

        commands.sort((a, b) => a.getTimestamp() - b.getTimestamp());

        for (let commandWithTimeStamp of commands) {
            let command = commandWithTimeStamp.getCommand();
            let commandParts = command.split(/,\s*/);
            let commandType = commandParts[1];

            switch (commandType) {

                case "place-order": {
                    let orderId = parseInt(commandParts[2].replace("order", ""));
                    let items = commandParts.slice(3).map(item => item.trim());

                    let order = this.orderManager.createAndPlaceOrder(items, orderId);

                    if (!order) {
                        console.log(`Order ${orderId} could not be placed.`);
                        break;
                    }

                    console.log(`Order ${orderId} with items ${items} placed successfully.`);
                    break;
                }

                case "update-price": {
                    let restaurantId = parseInt(commandParts[2].replace("restaurant", ""));
                    let itemName = commandParts[3].trim();
                    let newPrice = parseFloat(commandParts[4]);

                    this.restaurantService.updateRestaurantMenuItem(
                        restaurantId,
                        itemName,
                        newPrice,
                        true
                    );

                    console.log(`Price for item ${itemName} at restaurant ${restaurantId} updated to ${newPrice}.`);
                    break;
                }

                case "dispatch-order": {
                    let dispatchOrderId = (commandParts[2].replace("order", ""));
                    // console.log(typeof dispatchOrderId)
                    let orderToBeDispatched = this.orderManager.getOrder(dispatchOrderId);

                    if (!orderToBeDispatched) {
                        console.log(`Order ${dispatchOrderId} not found for dispatch.`);
                        break;
                    }

                    // optional check if you have status
                    // if (orderToBeDispatched.getStatus() === OrderStatus.DISPATCHED)

                    this.orderManager.dispatchOrder(orderToBeDispatched);

                    console.log(`Order ${dispatchOrderId} dispatched successfully.`);
                    break;
                }

                default:
                    console.log(`Unknown command: ${commandType}`);
            }
        }
    }
}