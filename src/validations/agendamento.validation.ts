import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const listarAgendamentoSchema = Joi.object({
  especialidadeId: Joi.number().integer().required(),
});

const criarAgendamentoSchema = Joi.object({
  pacienteId: Joi.string().uuid().required(),
  especialidadeId: Joi.number().integer().required(),
  startsAt: Joi.date().required().greater(Date.now()),
});

export const validaListarAgendamento = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = listarAgendamentoSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validaCriarAgendamento = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = criarAgendamentoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
