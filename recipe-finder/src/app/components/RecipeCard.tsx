interface RecipeCardProps {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    onSelect: (idMeal: string) => void;
  }
  
  
  export default function RecipeCard({
    idMeal,
    strMeal,
    strMealThumb,
    onSelect,
  }: RecipeCardProps) {
    return (
      <div
        className="border-2 border-[#9ea974] shadow-[4px_4px_0px_#9ea974] transition-all duration-400 hover:shadow-[6px_6px_0px_#9ea974] p-4 rounded-md bg-white"
        onClick={() => onSelect(idMeal)}>
        <h2 className="text-lg font-bold mb-2">{strMeal}</h2>
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-auto rounded mb-2"
        />
      </div>
    );
  }
  