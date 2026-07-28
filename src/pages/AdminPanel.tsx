export const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-[#0f0a1a] text-slate-100 p-6 font-sans antialiased selection:bg-[#ec4899] selection:text-white">
      {/* Container principal avec une lueur subtile indigo/violet */}
      <div className="max-w-4xl mx-auto bg-[#1a142e]/60 backdrop-blur-md rounded-2xl border border-[#4c1d95]/40 p-8 shadow-[0_0_30px_rgba(76,29,149,0.2)]">
        
        {/* Header avec la pastille animée Néon */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6ef7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ec4899] shadow-[0_0_10px_#ff6ef7]"></span>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#6366f1] via-[#ec4899] to-[#ff6ef7] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(236,72,153,0.3)]">
            Administration
          </h1>
        </div>
        
        {/* Description avec bordure Fuchsia */}
        <p className="text-slate-300 text-lg leading-relaxed border-l-2 border-[#ec4899] pl-4">
          Gérez les marchands, supervisez les transactions et contrôlez l'écosystème PayMarket.
        </p>

        {/* Zone de contenu / Placeholder avec effet de néon pointillé */}
        <div className="mt-8 border border-dashed border-[#6366f1]/40 bg-[#4c1d95]/10 rounded-xl p-12 text-center text-slate-400 text-sm shadow-[inset_0_0_20px_rgba(99,102,241,0.05)] group hover:border-[#ff6ef7]/60 transition-colors duration-300">
          <p className="bg-gradient-to-r from-[#8b5cf6] to-[#ff6ef7] bg-clip-text text-transparent font-medium text-base mb-1">
            Le tableau de bord d'administration est prêt.
          </p>
          <span className="text-slate-500">Ajoutez vos tableaux, statistiques et composants ici.</span>
        </div>

      </div>
    </div>
  );
};