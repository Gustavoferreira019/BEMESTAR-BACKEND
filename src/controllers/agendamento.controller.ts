import { Agendamento, PrismaClient } from "@prisma/client";

interface ICreateAgendamentoProps {
  pacienteId: string;
  especialidadeId: number;
  startsAt: Date;
}

const prisma = new PrismaClient();

/**
 * Essa funcao busca no banco de dados os agendamentos para a especialidadeId fornecida
 * @returns {Promise<Agendamento[]>} agendamentos - Agendamentos para a determinada especialidade
 */
async function listarAgendamentos(
  especialidadeId: number
): Promise<Agendamento[]> {
  // Busca todos os agendamentos da especialidade
  const agendamentos = await prisma.agendamento.findMany({
    where: {
      especialidadeId,
    },
  });

  return agendamentos;
}

/**
 * Essa funcao valida se existe um agendamento no mesmo horario para a especialidade.
 * Caso sim, retorna um erro.
 * Caso nao, cria o novo agendamento no banco de dados
 * @param {ICreateAgendamentoProps} props - Parametros para criacao de agendamento
 * @returns {Promise<Agendamento>} agendamento - Novo agendamento criado
 */
async function criarAgendamento(
  props: ICreateAgendamentoProps
): Promise<Agendamento> {
  const { pacienteId, especialidadeId, startsAt } = props;

  // Busca o agendamento
  const agendamento = await prisma.agendamento.findFirst({
    where: {
      especialidadeId,
      startsAt: {
        lte: new Date(startsAt),
      },
      endsAt: {
        gte: new Date(startsAt),
      },
    },
  });

  // Verifica se existe o agendamento
  if (agendamento) {
    throw new Error("Horario indisponivel para agendamento");
  }

  // Cria o novo agendamento
  const novoAgendamento = await prisma.agendamento.create({
    data: {
      pacienteId,
      especialidadeId: especialidadeId,
      startsAt,
      endsAt: new Date(new Date(startsAt).getTime() + 30 * 60000),
    },
  });

  return novoAgendamento;
}

export default { listarAgendamentos, criarAgendamento };
