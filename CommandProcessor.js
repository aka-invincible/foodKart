import CommandWithTimeStamp from "./CommandWithTimeStamp.js";

class CommandProcessor {
    constructor(restaurantService, orderManager) {
        this.restaurantService = restaurantService;
        this.orderManager = orderManager
    }

    processInputCommands(inputCommands) {
        if (!inputCommands || inputCommands.length === 0) {
            console.log("No commands to process.");
            return;
        }
        let commands = [];
        for (let command of inputCommands) {
            let commandParts = command.split(",\\s*");
            let timeStamp = parseInt(commandParts[0]);
            commands.push(CommandWithTimeStamp(timeStamp, command));
        }

        commands.sort((a, b) => a.getTimestamp() - b.getTimestamp());

        for (let commandWithTimeStamp of commands) {
            let command = commandWithTimeStamp.getCommand();
            let commandParts = command.split(",\\s*");
            let commandType = commandParts[1];

            switch (commandType) {
                case "place-order":
                    let orderId = parseInt(commandParts[2].replace("order", ''));

                    let items = commandParts.slice(3).map(item => item.trim());

                    this.orderManager.createAndPlaceOrder(items, orderId);

                    if (order == null) {
                        console.log(`Order ${orderId} could not be placed.`);
                        break;
                    }

                    console.log(`Order ${orderId} with items ${items} placed successfully.`);
                    break;
                case "update-price":
                    let restaurantId = parseInt(commandParts[2].replace("order", ''));
                    let itemName = commandParts[3].trim();
                    let newPrice = parseFloat(commandParts[4]);
                    this.restaurantService.updateMenuItemPrice(restaurantId, itemName, newPrice, isAvailable = true);

                    console.log(`Price for item ${itemName} at restaurant ${restaurantId} updated to ${newPrice}.`);
                    break;
                case
                    "dispatch-order":
                    let dispatchOrderId = parseInt(commandParts[2].replace("order", ''));
                    let orderToBeDispatched = this.orderManager.getOrder(dispatchOrderId);

                    if (orderToBeDispatched == null) {
                        console.log(`Order ${dispatchOrderId} not found for dispatch.`);
                        break;
                    }

                    if (orderToBeDispatched.getStatus() == OrderStatus.DISPATCHED) {
                        console.log(`Order ${dispatchOrderId} has already been dispatched.`);
                    }
                    this.orderManager.dispatchOrder(orderToBeDispatched);
                    console.log(`Order ${dispatchOrderId} dispatched successfully.`);
                default:
                    console.log(`Unknown command: ${commandType}`);
            }
        }
    }
}