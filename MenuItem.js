class MenuItem {
    constructor(id, name, price, isAvailable) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.isAvailable = isAvailable;
    }

    getId() {
        return id;
    }

    getName() {
        return name;
    }

    getPrice() {
        return price;
    }

    getIsAvailable() {
        return isAvailable;
    }

    setName(name) {
        this.name = name;
    }

    setPrice(price) {
        this.price = price;
    }

    setIsAvailable(isAvailable) {
        this.isAvailable = isAvailable;
    }
}