'use client';

import { useState, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type Ingredient = {
  name: string;
  amount: number;
};

type Recipe = {
  name: string;
  amount: number;
  container: string;
  ingredients: Ingredient[];
  manual: string;
};

const recipes: Recipe[] = [
  {
    manual: "Manual de Criação",
    name: "Poção Vermelha",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [{ name: "Erva Vermelha", amount: 1 }],
  },
  {
    manual: "Manual de Criação",
    name: "Poção Amarela",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [{ name: "Erva Amarela", amount: 1 }],
  },
  {
    manual: "Manual de Criação",
    name: "Poção Branca",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [{ name: "Erva Branca", amount: 1 }],
  },
  {
    manual: "Manual de Criação",
    name: "Poção Azul",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Erva Azul", amount: 1 },
      { name: "Scell", amount: 1 },
    ],
  },
  {
    manual: "Manual de Criação",
    name: "Analgésico",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Álcool", amount: 1 },
      { name: "Menta", amount: 1 },
    ],
  },
  {
    manual: "Manual de Criação",
    name: "Aloe Vera",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Mel", amount: 1 },
      { name: "Aloés", amount: 1 },
    ],
  },
  {
    manual: "Manual de Criação",
    name: "Embrião",
    amount: 1,
    container: "Orvalho de Yggdrasil",
    ingredients: [
      { name: "Semente da Vida", amount: 1 },
      { name: "Cápsula da Criação", amount: 1 },
    ],
  },
  {
    manual: "Manual de Álcool",
    name: "Álcool",
    amount: 1,
    container: "Tubo de Ensaio",
    ingredients: [
      { name: "Garrafa Vazia", amount: 1 },
      { name: "Caule", amount: 5 },
      { name: "Esporo Venenoso", amount: 5 },
    ],
  },
  {
    manual: "Manual de Fogo Grego",
    name: "Frasco de Fogo Grego",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Tecido", amount: 1 },
      { name: "Álcool", amount: 1 },
    ],
  },
  {
    manual: "Manual de Ácidos",
    name: "Frasco de Ácido",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [{ name: "Coração Imortal", amount: 1 }],
  },
  {
    manual: "Manual de Plantas",
    name: "Frasco de Planta",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [{ name: "Flor de Planta Carnívora", amount: 2 }],
  },
  {
    manual: "Manual de Explosivos",
    name: "Frasco de Esfera Marinha",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Tendões", amount: 1 },
      { name: "Neurônio", amount: 1 },
    ],
  },
  {
    manual: "Manual de Revestimentos",
    name: "Frasco de Revestimento",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Coração de Sereia", amount: 1 },
      { name: "Presa de Zenorc", amount: 2 },
      { name: "Álcool", amount: 1 },
    ],
  },
  {
    manual: "Manual de Compactas",
    name: "Poção Vermelha Compacta",
    amount: 1,
    container: "Tubo de Ensaio",
    ingredients: [
      { name: "Poção Vermelha", amount: 1 },
      { name: "Espinho de Cacto", amount: 2 },
    ],
  },
  {
    manual: "Manual de Compactas",
    name: "Poção Amarela Compacta",
    amount: 1,
    container: "Tubo de Ensaio",
    ingredients: [
      { name: "Poção Amarela", amount: 1 },
      { name: "Bigodes de Toupeira", amount: 1 },
    ],
  },
  {
    manual: "Manual de Compactas",
    name: "Poção Branca Compacta",
    amount: 1,
    container: "Tubo de Ensaio",
    ingredients: [
      { name: "Poção Branca", amount: 1 },
      { name: "Areia Estelar de Bruxa", amount: 1 },
    ],
  },
  {
    manual: "Manual de Anti-Poções",
    name: "Poção Anti-Água",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Gema Azul", amount: 1 },
      { name: "Coração de Sereia", amount: 3 },
    ],
  },
  {
    manual: "Manual de Anti-Poções",
    name: "Poção Anti-Vento",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Gema Azul", amount: 3 },
      { name: "Pó de Traça", amount: 1 },
    ],
  },
  {
    manual: "Manual de Anti-Poções",
    name: "Poção Anti-Terra",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Gema Amarela", amount: 2 },
      { name: "Jellopy Tamanho Família", amount: 1 },
    ],
  },
  {
    manual: "Manual de Anti-Poções",
    name: "Poção Anti-Fogo",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Gema Vermelha", amount: 2 },
      { name: "Brasão", amount: 1 },
    ],
  },
];

const RecipeDetails = ({
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

  return (
    <div className="text-center mt-6 space-y-4">
      <h2 className="text-2xl font-bold">{recipe.name}</h2>
      <p>
        <strong>Manual:</strong> {recipe.manual}
      </p>
      <p>
        <strong>Recipiente:</strong> {recipe.container}
      </p>
      <p>
        <strong>Quantidade:</strong> {quantity}x {recipe.name}
      </p>
      <div>
        <p className="font-semibold">Ingredientes Totais:</p>
        <ul className="list-disc list-inside">
          {scaledIngredients.map((ingredient) => (
            <li key={ingredient.name}>
              {ingredient.amount}x {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSelectChange = (selectedName: string) => {
    const recipe = recipes.find((r) => r.name === selectedName) ?? null;
    setSelectedRecipe(recipe);
    setQuantity(1); // Resetar quantidade ao trocar de receita
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(value >= 1 ? value : 1);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container px-4 py-16 flex flex-col items-center gap-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-center sm:text-[5rem]">Calculadora</h1>

        <div className="w-full max-w-lg space-y-4">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha um item..." />
            </SelectTrigger>
            <SelectContent>
              {recipes.map((recipe) => (
                <SelectItem key={recipe.name} value={recipe.name}>
                  {recipe.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedRecipe && (
            <>
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Quantidade desejada
                </label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  max={999}
                />
              </div>
              <RecipeDetails recipe={selectedRecipe} quantity={quantity} />
            </>
          )}

          {!selectedRecipe && (
            <p className="text-gray-300 text-center">
              Selecione uma receita para ver os detalhes.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
