function FormPlaneta({ cadastrarPlaneta, formPlaneta, setFormPlaneta }) {
  return (
    <form className="form" onSubmit={cadastrarPlaneta}>
      <h2>Cadastrar planeta</h2>

      <label>
        Nome
        <input
          name="nome"
          minLength="2"
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, nome: event.target.value })
          }
          required
          type="text"
          value={formPlaneta.nome}
        />
      </label>

      <label>
        Galáxia
        <input
          name="galaxia"
          minLength="2"
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, galaxia: event.target.value })
          }
          required
          type="text"
          value={formPlaneta.galaxia}
        />
      </label>

      <label>
        Clima
        <input
          name="clima"
          minLength="2"
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, clima: event.target.value })
          }
          required
          type="text"
          value={formPlaneta.clima}
        />
      </label>

      <label>
        Habitável:
        <select
          name="habitavel"
          value={formPlaneta.habitavel.toString()}
          onChange={(event) =>
            setFormPlaneta({
              ...formPlaneta,
              habitavel: event.target.value === "true",
            })
          }
          required
        >
          <option value="">Selecione</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </label>

      <label>
        Descrição
        <input
          name="descricao"
          minLength="3"
          onChange={(event) =>
            setFormPlaneta({ ...formPlaneta, descricao: event.target.value })
          }
          required
          type="text"
          value={formPlaneta.descricao}
        />
      </label>

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default FormPlaneta;
