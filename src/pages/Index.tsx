import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard, { Product } from '@/components/ProductCard';
import Cart, { CartItem } from '@/components/Cart';
import FilterBar from '@/components/FilterBar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const colors = [
  { name: 'Черный', value: '#000000' },
  { name: 'Белый', value: '#FFFFFF' },
  { name: 'Серый', value: '#9CA3AF' },
  { name: 'Бежевый', value: '#D4C5B9' },
  { name: 'Синий', value: '#3B82F6' }
];

const products: Product[] = [
  {
    id: '1',
    name: 'Базовая футболка',
    price: 1990,
    image: 'https://cdn.poehali.dev/projects/a5526827-55b7-4b3c-856c-b19b11526fa9/files/3d2d8ba9-11b9-4389-a338-68ce5d3a61ae.jpg',
    category: 'Футболки',
    colors: ['#000000', '#FFFFFF', '#9CA3AF'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Джинсы slim fit',
    price: 4990,
    image: 'https://cdn.poehali.dev/projects/a5526827-55b7-4b3c-856c-b19b11526fa9/files/979e7e43-9f58-459c-82c5-52f1d4964305.jpg',
    category: 'Джинсы',
    colors: ['#000000', '#3B82F6'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Oversize худи',
    price: 3490,
    image: 'https://cdn.poehali.dev/projects/a5526827-55b7-4b3c-856c-b19b11526fa9/files/018da9f1-4cdc-469c-aca5-77f2feaa3e53.jpg',
    category: 'Худи',
    colors: ['#000000', '#9CA3AF', '#D4C5B9'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '4',
    name: 'Кожаная куртка',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/a5526827-55b7-4b3c-856c-b19b11526fa9/files/3d2d8ba9-11b9-4389-a338-68ce5d3a61ae.jpg',
    category: 'Куртки',
    colors: ['#000000'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '5',
    name: 'Трикотажное платье',
    price: 3990,
    image: 'https://cdn.poehali.dev/projects/a5526827-55b7-4b3c-856c-b19b11526fa9/files/3d2d8ba9-11b9-4389-a338-68ce5d3a61ae.jpg',
    category: 'Платья',
    colors: ['#000000', '#FFFFFF', '#D4C5B9'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: '6',
    name: 'Классические брюки',
    price: 4490,
    image: 'https://cdn.poehali.dev/projects/a5526827-55b7-4b3c-856c-b19b11526fa9/files/979e7e43-9f58-459c-82c5-52f1d4964305.jpg',
    category: 'Брюки',
    colors: ['#000000', '#9CA3AF', '#D4C5B9'],
    sizes: ['S', 'M', 'L', 'XL']
  }
];

const categories = ['Футболки', 'Джинсы', 'Худи', 'Куртки', 'Платья', 'Брюки'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleAddToCart = (product: Product, size: string, color: string) => {
    const itemId = `${product.id}-${size}-${color}`;
    const existingItem = cartItems.find(item => item.id === itemId);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: itemId,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        color,
        quantity: 1
      }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    if (selectedColors.length > 0 && !product.colors.some(c => selectedColors.includes(c))) return false;
    if (selectedSizes.length > 0 && !product.sizes.some(s => selectedSizes.includes(s))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />

      <section id="home" className="relative h-[600px] flex items-center justify-center bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
        <div className="relative container text-center space-y-6 animate-fade-in">
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight">
            Минималистичная мода
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Чистые линии, качественные материалы и вневременной стиль
          </p>
          <Button size="lg" className="mt-4" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
            Смотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Каталог</h2>
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 'товаров'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block">
              <FilterBar
                categories={categories}
                colors={colors}
                sizes={sizes}
                selectedCategories={selectedCategories}
                selectedColors={selectedColors}
                selectedSizes={selectedSizes}
                onCategoryChange={handleCategoryToggle}
                onColorChange={handleColorToggle}
                onSizeChange={handleSizeToggle}
                onClearAll={handleClearFilters}
              />
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-secondary/50">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">О нас</h2>
          <div className="space-y-4 text-center">
            <p className="text-lg">
              Мы создаем одежду для тех, кто ценит качество и простоту. Каждая вещь продумана до мелочей и создана из лучших материалов.
            </p>
            <p className="text-muted-foreground">
              Наша миссия — доказать, что минимализм может быть выразительным, а простота — изысканной.
            </p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">Доставка и оплата</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="Truck" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-heading font-semibold mb-1">Доставка</h3>
                  <p className="text-sm text-muted-foreground">
                    Бесплатная доставка по России от 3000 ₽. Доставка 1-3 дня.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-heading font-semibold mb-1">Самовывоз</h3>
                  <p className="text-sm text-muted-foreground">
                    Забрать заказ можно в нашем шоуруме в Москве.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="CreditCard" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-heading font-semibold mb-1">Оплата онлайн</h3>
                  <p className="text-sm text-muted-foreground">
                    Принимаем все банковские карты и электронные кошельки.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Package" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-heading font-semibold mb-1">Возврат</h3>
                  <p className="text-sm text-muted-foreground">
                    14 дней на возврат товара в исходном состоянии.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-secondary/50">
        <div className="container max-w-2xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">Контакты</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Icon name="Mail" size={20} className="text-accent" />
              <a href="mailto:info@fashion.ru" className="hover:text-accent transition-colors">
                info@fashion.ru
              </a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Phone" size={20} className="text-accent" />
              <a href="tel:+74951234567" className="hover:text-accent transition-colors">
                +7 (495) 123-45-67
              </a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="MapPin" size={20} className="text-accent" />
              <p className="text-muted-foreground">Москва, ул. Примерная, д. 1</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 FASHION. Все права защищены.</p>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />
    </div>
  );
};

export default Index;