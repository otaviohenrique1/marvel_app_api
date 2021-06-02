import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import Favorito from "../entity/Favorito";
import favoritoView from "../views/favorito_view";

export default {
  async index(request: Request, response: Response) {
    const favoritoRepository = getRepository(Favorito);
    const favorito = await favoritoRepository.find();
    return response.json(favorito);
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const favoritoRepository = getRepository(Favorito);
    const favorito = await favoritoRepository.find({ where: { user_id: id } });
    return response.json(favorito);
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
  async showFavorite(request: Request, response: Response) {
    /* Verifica se o favorito existe */
    const { user_id, item_id } = request.params;
    const favoritoRepository = getRepository(Favorito);
    const favorito = await favoritoRepository.findOneOrFail({
      where: [
        { user_id: user_id },
        { item_id: item_id },
      ]
    });
    return response.json(favorito);
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const favoritoRepository = getRepository(Favorito);
    const favorito = await favoritoRepository.delete(id);
    return response.status(200).json(favorito);
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
  }
};