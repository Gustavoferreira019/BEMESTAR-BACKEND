import { Request, Response, Router } from "express";
import agendamentoController from "../controllers/agendamento.controller";
import {
  validaCriarAgendamento,
  validaListarAgendamento,
} from "../validations/agendamento.validation";

const router = Router();

// Rota para listagem de agendamentos
// A funcao validaListarAgendamento valida os parametros de entrada da rota
router.get(
  "/agendamentos",
  validaListarAgendamento,
  async (req: Request, res: Response) => {
    try {
      const { especialidadeId } = req.query;
      const result = await agendamentoController.listarAgendamentos(
        Number(especialidadeId)
      );
      res.send(result);
    } catch (error) {
      res.status(500).send({
        error: error.message || "INTERNAL SERVER ERROR",
      });
    }
  }
);

// Rota para criar de agendamentos
// A funcao validaCriarAgendamento valida os parametros de entrada da rota
router.post(
  "/agendamentos",
  validaCriarAgendamento,
  async (req: Request, res: Response) => {
    try {
      const { pacienteId, especialidadeId, startsAt } = req.body;
      const result = await agendamentoController.criarAgendamento({
        pacienteId,
        especialidadeId,
        startsAt,
      });
      res.send(result);
    } catch (error) {
      res.status(500).send({
        error: error.message || "INTERNAL SERVER ERROR",
      });
    }
  }
);

export { router as agendamentoRouter };
