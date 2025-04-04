export default function Header() {
    return (
      <header className="w-full bg-[#9ea974] p-6 shadow flex justify-between items-center px-8 relative">
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn-icons-png.freepik.com/256/12068/12068188.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-[#0d0d0c] text-3xl font-extrabold">
            Recipe Finder
          </h1>
        </div>
        <p className="text-[#1f1f1e] text-lg font-medium opacity-90 italic tracking-wide">
          Discover amazing flavors!
        </p>
      </header>
    );
  }
  