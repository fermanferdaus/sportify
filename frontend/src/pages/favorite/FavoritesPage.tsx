import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { fetchFavorites, removeFavorite } from "../../features/favoritesSlice";
import { Heart, Trash2, ArrowRight, AlertCircle } from "lucide-react";
import PageLoader from "../../components/ui/PageLoader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const FavoritesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, status } = useSelector((state: RootState) => state.favorites);
  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleConfirmRemove = () => {
    if (itemToDelete) {
      dispatch(removeFavorite(itemToDelete.id));
      setItemToDelete(null);
    }
  };

  if (status === "loading" && items.length === 0) {
    return <PageLoader message="Getting your favorites..." />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-900/30 text-rose-500 border border-rose-800/30 font-bold">
          <Heart size={32} fill="currentColor" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          My Favorite Teams
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Your personally curated list of football clubs.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-blue-600/30 transition-all"
            >
              <div className="h-16 w-16 flex-shrink-0 bg-slate-950 p-2 rounded-xl">
                <img
                  src={item.team_badge}
                  alt={item.team_name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">
                  {item.team_name}
                </h3>
                <button
                  onClick={() => navigate(`/teams/${item.team_id}`)}
                  className="mt-1 flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400 transition-colors"
                >
                  View details <ArrowRight size={12} />
                </button>
              </div>
              <button
                onClick={() =>
                  setItemToDelete({ id: item.id, name: item.team_name })
                }
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-rose-900/20 hover:text-rose-500 transition-all"
                title="Remove from favorites"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
          <Heart size={48} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-400 mb-6">
            You haven't added any favorite teams yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-all"
          >
            Browse Leagues
          </button>
        </div>
      )}

      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
      >
        <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 text-rose-500 mb-2">
              <AlertCircle size={24} />
              <AlertDialogTitle className="text-xl">
                Remove from Favorites?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to remove <strong>{itemToDelete?.name}</strong> from your favorites list?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemove}
              className="bg-rose-600 hover:bg-rose-700 text-white border-none"
            >
              Yes, Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FavoritesPage;
