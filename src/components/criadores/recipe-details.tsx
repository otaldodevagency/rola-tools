import type { Ingredient, Recipe } from "@/app/criadores/page";
import { Beaker, BookOpen, Droplets, Flame, Mountain, Sparkles, Wind } from "lucide-react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export const RecipeDetails = ({
  recipe,
  quantity,
}: {
  recipe: Recipe;
  quantity: number;
}) => {
  const scaledIngredients = useMemo(() => {
    const baseIngredients = recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      amount: ingredient.amount * quantity,
    }));

    const containerIngredient: Ingredient = {
      name: recipe.container,
      amount: quantity,
    };

    return [...baseIngredients, containerIngredient];
  }, [recipe, quantity]);

  // Get element icon based on recipe name
  const getElementIcon = (name: string) => {
    if (name.includes("Fogo") || name.includes("Vermelha")) {
      return <Flame className="h-5 w-5 text-red-500" />;
    } else if (name.includes("Água") || name.includes("Azul")) {
      return <Droplets className="h-5 w-5 text-blue-500" />;
    } else if (name.includes("Vento")) {
      return <Wind className="h-5 w-5 text-emerald-500" />;
    } else if (name.includes("Terra") || name.includes("Amarela")) {
      return <Mountain className="h-5 w-5 text-amber-500" />;
    } else {
      return <Sparkles className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-center space-x-3">
        {getElementIcon(recipe.name)}
        <h2 className="text-2xl font-bold">{recipe.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Informações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Manual:</span>
              <Badge variant="outline">{recipe.manual}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipiente:</span>
              <span className="font-medium">{recipe.container}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantidade:</span>
              <span className="font-medium">
                {quantity}x {recipe.name}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Beaker className="h-4 w-4 mr-2" />
              Ingredientes Totais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {scaledIngredients.map((ingredient, index) => (
                <motion.li
                  key={ingredient.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center"
                >
                  <span>{ingredient.name}</span>
                  <Badge>{ingredient.amount}x</Badge>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
