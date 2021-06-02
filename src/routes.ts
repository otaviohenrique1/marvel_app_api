import { Router } from "express";
import FavoritoController from "./controllers/FavoritoController";
import UsuarioController from "./controllers/UsuarioController";''

const routes = Router();

routes.get('/favoritos', FavoritoController.index);
routes.get('/favoritos/:id', FavoritoController.show);
routes.post('/favoritos', FavoritoController.create);
routes.put('/favoritos/:id', FavoritoController.update);
routes.delete('/favoritos/:id', FavoritoController.delete);
routes.get('/favoritos/:user_id&:item_id', FavoritoController.showFavorite);

routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.post('/usuarios/login', UsuarioController.login);
routes.post('/usuarios', UsuarioController.create);
routes.put('/usuarios/:id', UsuarioController.update);

export default routes;