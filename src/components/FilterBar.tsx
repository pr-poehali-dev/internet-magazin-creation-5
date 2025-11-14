import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface FilterBarProps {
  categories: string[];
  colors: { name: string; value: string }[];
  sizes: string[];
  selectedCategories: string[];
  selectedColors: string[];
  selectedSizes: string[];
  onCategoryChange: (category: string) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  onClearAll: () => void;
}

export default function FilterBar({
  categories,
  colors,
  sizes,
  selectedCategories,
  selectedColors,
  selectedSizes,
  onCategoryChange,
  onColorChange,
  onSizeChange,
  onClearAll
}: FilterBarProps) {
  const activeFiltersCount = selectedCategories.length + selectedColors.length + selectedSizes.length;

  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-20 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg">Фильтры</h3>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              Сбросить
            </Button>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <Badge key={cat} variant="secondary" className="cursor-pointer" onClick={() => onCategoryChange(cat)}>
                {cat}
                <Icon name="X" size={12} className="ml-1" />
              </Badge>
            ))}
            {selectedSizes.map((size) => (
              <Badge key={size} variant="secondary" className="cursor-pointer" onClick={() => onSizeChange(size)}>
                {size}
                <Icon name="X" size={12} className="ml-1" />
              </Badge>
            ))}
          </div>
        )}

        <Accordion type="multiple" defaultValue={['category', 'size', 'color']} className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger className="font-heading font-medium">Категория</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => onCategoryChange(category)}
                    />
                    <label
                      htmlFor={`cat-${category}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="size">
            <AccordionTrigger className="font-heading font-medium">Размер</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onSizeChange(size)}
                    className="h-10"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="color">
            <AccordionTrigger className="font-heading font-medium">Цвет</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {colors.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color.value}`}
                      checked={selectedColors.includes(color.value)}
                      onCheckedChange={() => onColorChange(color.value)}
                    />
                    <label
                      htmlFor={`color-${color.value}`}
                      className="text-sm cursor-pointer flex-1 flex items-center gap-2"
                    >
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
