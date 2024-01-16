class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.quantity = 0;
        this.giftWrap = false;
    }

    calculateTotal() {
        return this.quantity * this.price;
    }
    
    calculateGiftWrapFee() {
        return (this.giftWrap === true) * this.quantity;
    }
}

function applyDiscountsAndPrintAnswer(productA, productB, productC, subtotal) {
    let beforeDiscountAmount = [productA.calculateTotal(), productB.calculateTotal(), productC.calculateTotal()];
    let discountOnEach = [0, 0, 0];
    let discountAllOver = 0;
    let discountNameOnEach = "bulk_5_discount";
    let discountNameAllOver = "flat_10_discount";
    if(subtotal > 200) {
        discountAllOver = 10;
    }
    
    discountOnEach[0] = (productA.quantity > 10 ? productA.calculateTotal() * 0.05 : 0);
    discountOnEach[1] = (productB.quantity > 10 ? productB.calculateTotal() * 0.05 : 0);
    discountOnEach[2] = (productC.quantity > 10 ? productC.calculateTotal() * 0.05 : 0);
    
    if(productA.quantity + productB.quantity + productC.quantity > 20) {
        if(discountAllOver < subtotal * 0.1) {
            discountAllOver = subtotal * 0.1;
            discountNameAllOver = "bulk_10_discount";
        }
    }
    
    if(productA.quantity + productB.quantity + productC.quantity > 30) {
        let temp = [0, 0, 0];
        temp[0] = productA.quantity > 15 ? (productA.quantity - 15) * productA.price * 0.5 : 0;
        temp[1] = productB.quantity > 15 ? (productB.quantity - 15) * productB.price * 0.5 : 0;
        temp[2] = productC.quantity > 15 ? (productC.quantity - 15) * productC.price * 0.5 : 0;
        if(discountOnEach[0] + discountOnEach[1] + discountOnEach[2] < temp[0] + temp[1] + temp[2]) {
            discountOnEach = temp;
            discountnameOnEach = "tiered_50_discount";
        }
    }
    
    const discountAmount = Math.max(discountOnEach[0] + discountOnEach[1] + discountOnEach[2], discountAllOver);
    let discountName = discountOnEach[0] + discountOnEach[1] + discountOnEach[2] > discountAllOver ? discountNameOnEach : discountNameAllOver;
    if(discountAmount === 0) {
        discountName = "No Discount Applicable";
    }
    // Calculate gift wrap fee
const giftWrapFee = productA.calculateGiftWrapFee() + productB.calculateGiftWrapFee() + productC.calculateGiftWrapFee();

// Calculate shipping fee
const shippingFee = Math.ceil((productA.quantity + productB.quantity + productC.quantity) / 10) * 5;

    // Calculate total
    const total = subtotal - discountAmount + giftWrapFee + shippingFee;
    
    // Output details
    console.log(`${productA.name}: ${productA.quantity} - $${productA.calculateTotal()}`);
    console.log(`${productB.name}: ${productB.quantity} - $${productB.calculateTotal()}`);
    console.log(`${productC.name}: ${productC.quantity} - $${productC.calculateTotal()}`);
    console.log(`Subtotal: $${subtotal}`);
    console.log(`Discount Applied: ${discountName} - $${discountAmount}`);
    console.log(`Gift Wrap Fee: $${giftWrapFee}`);
    console.log(`Shipping Fee: $${shippingFee}`);
    console.log(`Total: $${total}`);
}

// Define products
const productA = new Product("Product A", 20);
const productB = new Product("Product B", 40);
const productC = new Product("Product C", 50);

// Input quantities and gift wrap information
productA.quantity = parseInt(prompt("Enter quantity for Product A: "));
productA.giftWrap = prompt("Should the product A be wrapped? (yes/no)") === "yes";

productB.quantity = parseInt(prompt("Enter quantity for Product B: "));
productB.giftWrap = prompt("Should the product B be wrapped? (yes/no)") === "yes";

productC.quantity = parseInt(prompt("Enter quantity for Product C: "));
productC.giftWrap = prompt("Should the product C be wrapped? (yes/no)") === "yes";


// Calculate subtotal
const subtotal = productA.calculateTotal() + productB.calculateTotal() + productC.calculateTotal();

// Apply discounts and Print Final Answer
applyDiscountsAndPrintAnswer(productA, productB, productC, subtotal);



