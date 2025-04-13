'use client';

import type { Recipe } from "@/app/criadores/page";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, ChevronRight, Filter, Leaf, Search, Sparkles, FlaskRoundIcon as Flask } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RecipeDetails } from "./recipe-details";

export const CriadoresPage = ({ recipes }: { recipes: Recipe[]; }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedManual, setSelectedManual] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe: Recipe) => {
      const matchesSearch = searchTerm === "" || recipe.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === null || recipe.category === selectedCategory;

      const matchesManual = selectedManual === null || recipe.manual === selectedManual;

      return matchesSearch && matchesCategory && matchesManual;
    });
  }, [searchTerm, selectedCategory, selectedManual, recipes]);

  const categories = Array.from(new Set(recipes.map((recipe: Recipe) => recipe.category ?? "Outros")));

  const manuals = Array.from(new Set(recipes.map((recipe: Recipe) => recipe.manual)));

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setQuantity(1); // Reset quantity when changing recipe
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(value >= 1 ? value : 1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedManual(null);
  };

  const recipesByCategory = useMemo(() => {
    const grouped: Record<string, Recipe[]> = {};

    filteredRecipes.forEach((recipe) => {
      const category = recipe.category ?? "Outros";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(recipe);
    });

    return grouped;
  }, [filteredRecipes]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-gradient-to-b from-slate-900 to-slate-80">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
          <span className="inline-block">
            <Flask className="inline-block mr-2 h-8 w-8 text-emerald-400" />
          </span>
          Calculadora de Potter
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Calcule os ingredientes necessários para criar poções, frascos e outros itens no LatamRO
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-slate-800 border-slate-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Buscar Receitas</CardTitle>
              <CardDescription>Encontre a receita desejada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar receita..."
                  className="pl-8 bg-slate-900 border-slate-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full bg-slate-900">
                  <TabsTrigger value="all" className="flex-1">
                    Lista
                  </TabsTrigger>
                  <TabsTrigger value="category" className="flex-1">
                    Categorias
                  </TabsTrigger>
                  <TabsTrigger value="filter" className="flex-1">
                    Filtros
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    {filteredRecipes.length > 0 ? (
                      <div className="space-y-2">
                        {filteredRecipes.map((recipe) => (
                          <motion.div key={recipe.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start text-left ${selectedRecipe?.name === recipe.name
                                ? "bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/40"
                                : "hover:bg-slate-700"
                                }`}
                              onClick={() => handleSelectRecipe(recipe)}
                            >
                              <div className="flex items-center w-full">
                                <Beaker className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="truncate">{recipe.name}</span>
                                <ChevronRight className="h-4 w-4 ml-auto flex-shrink-0" />
                              </div>
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-400">
                        <Leaf className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Nenhuma receita encontrada</p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="category" className="mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    {Object.keys(recipesByCategory).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(recipesByCategory).map(([category, recipes]) => (
                          <div key={category}>
                            <h3 className="font-medium text-emerald-400 mb-2 flex items-center">
                              <Sparkles className="h-4 w-4 mr-2" />
                              {category}
                            </h3>
                            <div className="space-y-1 pl-2">
                              {recipes.map((recipe) => (
                                <motion.div key={recipe.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`w-full justify-start text-left ${selectedRecipe?.name === recipe.name
                                      ? "bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/40"
                                      : "hover:bg-slate-700"
                                      }`}
                                    onClick={() => handleSelectRecipe(recipe)}
                                  >
                                    <div className="flex items-center w-full">
                                      <span className="truncate">{recipe.name}</span>
                                      <ChevronRight className="h-3 w-3 ml-auto flex-shrink-0" />
                                    </div>
                                  </Button>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-400">
                        <Leaf className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Nenhuma receita encontrada</p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="filter" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Categoria</label>
                      <Select
                        value={selectedCategory ?? ""}
                        onValueChange={(value) => setSelectedCategory(value ?? null)}
                      >
                        <SelectTrigger className="bg-slate-900 border-slate-700">
                          <SelectValue placeholder="Todas as categorias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as categorias</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Manual</label>
                      <Select value={selectedManual ?? ""} onValueChange={(value) => setSelectedManual(value ?? null)}>
                        <SelectTrigger className="bg-slate-900 border-slate-700">
                          <SelectValue placeholder="Todos os manuais" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os manuais</SelectItem>
                          {manuals.map((manual) => (
                            <SelectItem key={manual} value={manual}>
                              {manual}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="outline" className="w-full mt-2" onClick={resetFilters}>
                      <Filter className="h-4 w-4 mr-2" />
                      Limpar Filtros
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-slate-800 border-slate-700 shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-white">Detalhes da Receita</CardTitle>
              <CardDescription>
                {selectedRecipe
                  ? `Informações sobre ${selectedRecipe.name}`
                  : "Selecione uma receita para ver os detalhes"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {selectedRecipe ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-full sm:w-1/3">
                        <label className="block text-sm font-medium mb-1">Quantidade desejada</label>
                        <div className="flex items-center">
                          <Input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min={1}
                            max={999}
                            className="bg-slate-900 border-slate-700"
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-2/3 flex justify-end">
                        <Badge className="text-sm px-3 py-1 bg-emerald-900/50 text-emerald-400 border-emerald-800">
                          <Beaker className="h-3.5 w-3.5 mr-1" />
                          {selectedRecipe.category ?? "Outros"}
                        </Badge>
                      </div>
                    </div>

                    <Separator className="bg-slate-700" />

                    <RecipeDetails recipe={selectedRecipe} quantity={quantity} />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <Flask className="h-16 w-16 text-slate-500 mb-4" />
                    <h3 className="text-xl font-medium text-slate-300 mb-2">Nenhuma receita selecionada</h3>
                    <p className="text-slate-400 max-w-md">
                      Selecione uma receita na lista ao lado para ver os detalhes e calcular os ingredientes
                      necessários.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
};
