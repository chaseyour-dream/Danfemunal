import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'danphe_munal.settings')
django.setup()

from orders.models import Order, OrderItem
from products.models import Product

# Check if we have products
products = Product.objects.all()
print(f"Found {products.count()} products")

if products.exists():
    product = products.first()
    print(f"Using product: {product.name} (ID: {product.id})")
    
    # Try to create an order
    try:
        order = Order.objects.create(
            customer_name="Test Customer",
            customer_email="test@example.com",
            customer_phone="1234567890",
            customer_address="Test Address",
            payment_method="cash",
            total_amount=100.00,
            notes=""
        )
        print(f"Order created: {order.id}")
        
        # Create order item
        order_item = OrderItem.objects.create(
            order=order,
            product=product,
            quantity=1,
            price=product.price
        )
        print(f"Order item created: {order_item.id}")
        print("SUCCESS!")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
else:
    print("No products found. Please add products first.")
