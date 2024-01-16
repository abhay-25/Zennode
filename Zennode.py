class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
        self.quantity = 0
        self.gift_wrap = False

    def calculate_total(self):
        return self.quantity * self.price

    def calculate_gift_wrap_fee(self):
        return int(self.gift_wrap) * self.quantity


def apply_discounts_and_print_answer(product_a, product_b, product_c, subtotal):
    before_discount_amount = [product_a.calculate_total(), product_b.calculate_total(), product_c.calculate_total()]
    discount_on_each = [0, 0, 0]
    discount_all_over = 0
    discount_name_on_each = "bulk_5_discount"
    discount_name_all_over = "flat_10_discount"

    if subtotal > 200:
        discount_all_over = 10

    discount_on_each[0] = product_a.calculate_total() * 0.05 if product_a.quantity > 10 else 0
    discount_on_each[1] = product_b.calculate_total() * 0.05 if product_b.quantity > 10 else 0
    discount_on_each[2] = product_c.calculate_total() * 0.05 if product_c.quantity > 10 else 0

    if product_a.quantity + product_b.quantity + product_c.quantity > 20:
        if discount_all_over < subtotal * 0.1:
            discount_all_over = subtotal * 0.1
            discount_name_all_over = "bulk_10_discount"

    if product_a.quantity + product_b.quantity + product_c.quantity > 30:
        temp = [0, 0, 0]
        temp[0] = (product_a.quantity - 15) * product_a.price * 0.5 if product_a.quantity > 15 else 0
        temp[1] = (product_b.quantity - 15) * product_b.price * 0.5 if product_b.quantity > 15 else 0
        temp[2] = (product_c.quantity - 15) * product_c.price * 0.5 if product_c.quantity > 15 else 0
        if sum(discount_on_each) < sum(temp):
            discount_on_each = temp
            discount_name_on_each = "tiered_50_discount"

    discount_amount = max(sum(discount_on_each), discount_all_over)
    discount_name = discount_name_on_each if sum(discount_on_each) > discount_all_over else discount_name_all_over

    if discount_amount == 0:
        discount_name = "No Discount Applicable"

    # Calculate gift wrap fee
    gift_wrap_fee = product_a.calculate_gift_wrap_fee() + product_b.calculate_gift_wrap_fee() + product_c.calculate_gift_wrap_fee()

    # Calculate shipping fee
    shipping_fee = (product_a.quantity + product_b.quantity + product_c.quantity) // 10 * 5

    # Calculate total
    total = subtotal - discount_amount + gift_wrap_fee + shipping_fee

    # Output details
    print(f"{product_a.name}: {product_a.quantity} - ${product_a.calculate_total()}")
    print(f"{product_b.name}: {product_b.quantity} - ${product_b.calculate_total()}")
    print(f"{product_c.name}: {product_c.quantity} - ${product_c.calculate_total()}")
    print(f"Subtotal: ${subtotal}")
    print(f"Discount Applied: {discount_name} - ${discount_amount}")
    print(f"Gift Wrap Fee: ${gift_wrap_fee}")
    print(f"Shipping Fee: ${shipping_fee}")
    print(f"Total: ${total}")


# Define products
product_a = Product("Product A", 20)
product_b = Product("Product B", 40)
product_c = Product("Product C", 50)

# Input quantities and gift wrap information
product_a.quantity = int(input("Enter quantity for Product A: "))
product_a.gift_wrap = input("Should the product A be wrapped? (yes/no)").lower() == "yes"

product_b.quantity = int(input("Enter quantity for Product B: "))
product_b.gift_wrap = input("Should the product B be wrapped? (yes/no)").lower() == "yes"

product_c.quantity = int(input("Enter quantity for Product C: "))
product_c.gift_wrap = input("Should the product C be wrapped? (yes/no)").lower() == "yes"

# Calculate subtotal
subtotal = product_a.calculate_total() + product_b.calculate_total() + product_c.calculate_total()

# Apply discounts and Print Final Answer
apply_discounts_and_print_answer(product_a, product_b, product_c, subtotal)
