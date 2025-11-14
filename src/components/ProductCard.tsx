import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleQuickAdd = () => {
    onAddToCart(product, product.sizes[0], product.colors[0]);
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur">
              {product.category}
            </Badge>
          </div>
          <Button
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            size="sm"
          >
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить в корзину
          </Button>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-heading font-medium text-base">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border-2 border-border"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-heading text-lg font-semibold">{product.price.toLocaleString('ru-RU')} ₽</p>
            <p className="text-xs text-muted-foreground">Размеры: {product.sizes.join(', ')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
