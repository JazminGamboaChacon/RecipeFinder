import { X, Youtube } from "lucide-react";

interface RecipeDetailProps {
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  onBack: () => void;
}

export default function RecipeDetail({
  strMeal,
  strCategory,
  strArea,
  strInstructions,
  strMealThumb,
  strYoutube,
  onBack,
}: RecipeDetailProps) {
  return (
    <div className="border-2 border-[#9ea974] shadow-[4px_4px_0px_#9ea974] transition-all duration-400 hover:shadow-[6px_6px_0px_#9ea974] p-6 rounded-md bg-white max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 items-top">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-100 h-100 object-cover rounded-lg shadow-md"
        />

        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">{strMeal}</h2>
            <div className="flex justify-between items-left gap-5">
              {strYoutube && (
                <a
                  href={strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-3 bg-green-100 text-black rounded-md hover:bg-[#9ea974] transition"
                >
                  <Youtube size={20} />
                  <span>Tutorial</span>
                </a>
              )}
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-4 py-3 bg-green-100 text-black rounded-md hover:bg-[#9ea974] transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="text-lg text-gray-700 space-y-2">
            <p>
              <strong>Category:</strong> {strCategory}
            </p>
            <p>
              <strong>Area:</strong> {strArea}
            </p>
          </div>

          <p className="text-base text-gray-700 leading-relaxed">
            <strong>Instructions:</strong> <br />
            {strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
}
