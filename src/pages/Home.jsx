import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [avistamentos, setAvistamentos] = useState([]);
  const [aliens, setAliens] = useState([]);
  const [loading, setLoading] = useState(false);

  async function buscarUltimosAvistamentos() {
    try {
      setLoading(true);

      const resposta = await api.get("/avistamentos");
      const ultimos = resposta.data.slice(-9).reverse();

      setAvistamentos(ultimos);
    } catch (error) {
      console.error("Erro ao buscar avistamentos", error);
    } finally {
      setLoading(false);
    }
  }

  async function listarAliens(){
    try{
      setLoading(true);

      const resposta = await api.get("/aliens");
      const EspeciesAliens = resposta.data.slice(-3).reverse();

      setAliens(EspeciesAliens);
    } catch(error){
      console.error("Erro ao buscar Aliens",error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarUltimosAvistamentos();
  }, []);
    useEffect(() => {
    listarAliens();
  }, []);

  return (
    <>
      <section className="relative flex flex-col items-center justify-center min-h-screen">
        <span className="text-9xl animate-bounce">🛸</span>
        
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-yellow-400 mt-12">
          Bem vindo ao Diário de Avistamentos!
        </h1>

        <p className="text-white mt-4">
          O maior banco de dados de avistamentos extraterrestres.
        </p>
      </div>

        <span className="absolute bottom-10 text-9xl text-yellow-400 animate-bounce"> ↓</span>

      </section>

      <section className="min-h-screen flex flex-col items-center justify-center">

          <div className="flex items-center gap-4 mt-10">
            <span className="text-6xl animate-bounce">🔍</span>
            <h1 className="text-4xl text-yellow-400">
              Últimos Avistamentos
            </h1>
          </div>

        {loading ? (
          <p className="animate-pulse text-yellow-400 mt-4">
            Carregando últimos avistamentos...
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {avistamentos.map((avistamento) => (
              <article className="card w-80 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform" key={avistamento.id}>
                <h3>{avistamento.titulo}</h3>

                <p>
                  <strong>Local:</strong> {avistamento.local}
                </p>

                <p>
                  <strong>Descrição:</strong> {avistamento.descricao}
                </p>

                <p>
                  <strong>Data:</strong> {avistamento.data}
                </p>

                <p>
                  <strong>Nível de Medo:</strong> {avistamento.nivelMedo}
                </p>
              </article>
            ))}
          </div>
        )}
      </section >

        <section className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 mt-10">
            <span className="text-6xl animate-bounce">👽</span>

            <h1 className="text-4xl text-yellow-400">
              Espécies Catalogadas
            </h1>
          </div>

          {loading ? (
            <p className="animate-pulse text-yellow-400 mt-4">
              Carregando Espécies...
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {aliens.map((alien) => (
                <article
                  className="card w-80 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
                  key={alien.id}
                >
                  <h3>{alien.nome}</h3>

                  <p>
                    <strong>Espécie:</strong> {alien.especie}
                  </p>

                  <p>
                    <strong>Planeta:</strong> {alien.planeta}
                  </p>

                  <p>
                    <strong>Periculosidade:</strong> {alien.periculosidade}
                  </p>

                  <p>
                    <strong>Descrição:</strong> {alien.descricao}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
    </>
  );
}


export default Home;