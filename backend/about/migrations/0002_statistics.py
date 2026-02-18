from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Statistics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_business', models.IntegerField(default=4, help_text='Total years in business')),
                ('total_products', models.IntegerField(default=4, help_text='Total number of products')),
                ('total_categories', models.IntegerField(default=4, help_text='Total product categories')),
                ('total_customers', models.IntegerField(default=400, help_text='Total satisfied customers')),
                ('is_active', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Statistics',
                'verbose_name_plural': 'Statistics',
            },
        ),
    ]
