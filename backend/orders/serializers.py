from rest_framework import serializers
from .models import PaymentQR, Order, OrderItem
import json


class PaymentQRSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentQR
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = serializers.JSONField(write_only=True)
    order_items = OrderItemSerializer(many=True, read_only=True, source='items')
    
    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'customer_email', 'customer_phone', 'customer_address', 
                  'payment_method', 'payment_screenshot', 'total_amount', 'status', 'notes', 
                  'created_at', 'updated_at', 'items', 'order_items']
        read_only_fields = ['id', 'created_at', 'updated_at', 'status']
        extra_kwargs = {
            'notes': {'required': False, 'allow_blank': True},
            'payment_screenshot': {'required': False, 'allow_null': True}
        }
    
    def create(self, validated_data):
        from products.models import Product
        
        items_data = validated_data.pop('items')
        
        # Parse items if it's a string
        if isinstance(items_data, str):
            items_data = json.loads(items_data)
        
        # Set default notes if not provided
        if 'notes' not in validated_data:
            validated_data['notes'] = ''
        
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            # Get the product instance from the ID
            product_id = item_data.pop('product')
            product = Product.objects.get(id=product_id)
            
            OrderItem.objects.create(
                order=order,
                product=product,
                **item_data
            )
        
        return order
