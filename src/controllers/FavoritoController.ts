import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import Favorito from "../entity/Favorito";
import favoritoView from "../views/favorito_view";

export default {
  async index(request: Request, response: Response) {
    const produtoRepository = getRepository(Favorito);
    const produto = await produtoRepository.find();
    return response.json(produto);
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const produtoRepository = getRepository(Favorito);
    const produto = await produtoRepository.findOneOrFail(id);
    return response.json(favoritoView.render(produto));
  },
  async create(request: Request, response: Response) {
    const { user_id, item_id, name, favorite, category } = request.body;
    const favoritoRepository = getRepository(Favorito);
    const data = { user_id, item_id, name, favorite, category };
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      item_id: Yup.number().required(),
      name: Yup.string().required(),
      favorite: Yup.boolean().required(),
      category: Yup.string().required(),
    });
    await schema.validate(data, { abortEarly: false });
    const favorito = favoritoRepository.create(data);
    await favoritoRepository.save(favorito);
    return response.status(201).json(favorito);
  },
  async update(request: Request, response: Response) {
    const { id, user_id, item_id, name, favorite, category } = request.body;
    const favoritoRepository = getRepository(Favorito);
    const data = { user_id, item_id, name, favorite, category };
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      item_id: Yup.number().required(),
      name: Yup.string().required(),
      favorite: Yup.boolean().required(),
      category: Yup.string().required()
    });
    await schema.validate(data, {
      abortEarly: false
    });
    const usuario = await favoritoRepository.update(id, data);
    return response.status(201).json(usuario);
  },
};