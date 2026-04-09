import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { AppDispatch, RootState } from "../../store";
import { fetchFavorites, removeFavorite } from "../../features/favoritesSlice";
import PageLoader from "../../components/ui/PageLoader";
import FavoriteHeader from "../../components/favorite/FavoriteHeader";
import FavoriteGrid from "../../components/favorite/FavoriteGrid";
import FavoriteItem from "../../components/favorite/FavoriteItem";
import EmptyFavorites from "../../components/favorite/EmptyFavorites";
import RemoveFavoriteDialog from "../../components/favorite/RemoveFavoriteDialog";

const FavoritesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
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
      toast.success(`${itemToDelete.name} removed from favorites`, {
        icon: "💔",
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid #1e293b",
        },
      });
      setItemToDelete(null);
    }
  };

  const handleRemoveClick = (id: number, name: string) => {
    setItemToDelete({ id, name });
  };

  if (status === "loading" && items.length === 0) {
    return <PageLoader message="Loading data..." />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FavoriteHeader />

      {items.length > 0 ? (
        <FavoriteGrid>
          {items.map((item) => (
            <FavoriteItem
              key={item.id}
              id={item.id}
              team_id={item.team_id}
              team_name={item.team_name}
              team_badge={item.team_badge}
              league_name={item.league_name}
              onRemove={handleRemoveClick}
            />
          ))}
        </FavoriteGrid>
      ) : (
        <EmptyFavorites />
      )}

      <RemoveFavoriteDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmRemove}
        itemName={itemToDelete?.name}
      />
    </div>
  );
};

export default FavoritesPage;
