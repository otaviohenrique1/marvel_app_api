import { Router } from "express";
import FavoritoController from "./controllers/FavoritoController";
import UsuarioController from "./controllers/UsuarioController";''

const routes = Router();

routes.get('/favoritos', FavoritoController.index);
routes.get('/favoritos/:id', FavoritoController.show);
routes.post('/favoritos', FavoritoController.create);
routes.put('/favoritos/:id', FavoritoController.update);

routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.post('/usuarios', UsuarioController.create);
routes.put('/usuarios/:id', UsuarioController.update);

export default routes;