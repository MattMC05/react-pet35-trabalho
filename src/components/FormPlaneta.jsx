function FormPlaneta({modeEdit, cadastrarPlaneta, fecharModal, formPlaneta, setFormPlaneta }) {
  return (
    <form className="form" onSubmit={cadastrarPlaneta}>
      <div className="modal-header">
        <h2>{modeEdit ? "Editar" : "Cadastrar"} planeta</h2>
        <button
          aria-label="Fechar modal"
          className="modal-close"
          onClick={fecharModal}
          type="button"
        >
          X
        </button>
      </div>

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

      <button type="submit">{modeEdit ? "Editar" : "Cadastrar"}</button>
    </form>
  );
}

export default FormPlaneta;
