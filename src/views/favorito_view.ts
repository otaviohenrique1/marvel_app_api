import Favorito from "../entity/Favorito";

export default {
  render(favorito: Favorito) {
    return {
      nome: favorito.name,
      favorite: favorito.favorite,
      category: favorito.category,
      preco: favorito.user_id,
      publicacao: favorito.item_id,
    };
  },
};

/*
export default {
  render(favorito: Favorito) {
    return {
      id: favorito.id,
      nome: favorito.name,
      favorite: favorito.favorite,
      category: favorito.category,
      preco: favorito.user_id,
      publicacao: favorito.item_id,
    };
  },
};
*/