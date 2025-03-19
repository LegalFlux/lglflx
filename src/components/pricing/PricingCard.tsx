
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  name: string;
  included: boolean;
  detail?: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: Feature[];
  buttonText: string;
  buttonVariant?: 'default' | 'outline' | 'secondary';
  popular?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant = 'default',
  popular = false,
  onClick,
  disabled = false,
}) => {
  return (
    <Card className={cn(
      "flex flex-col h-full transition-all duration-200 hover:shadow-md",
      popular && "border-primary scale-[1.02] shadow-md"
    )}>
      {popular && (
        <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-t-md w-full text-center">
          Mais Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground text-sm">{period}</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
              ) : (
                <X size={18} className="text-red-500 mr-2 flex-shrink-0 mt-1" />
              )}
              <span className="text-sm">
                {feature.name}
                {feature.detail && <span className="text-muted-foreground ml-1">({feature.detail})</span>}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={buttonVariant}
          onClick={onClick}
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
