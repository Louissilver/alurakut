import { useState } from 'react';
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar({ usuario }) {
  return (
    <Box>
      <img src={`https://github.com/${usuario}.png`} alt="Foto de perfil do usuário" style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${usuario}`}>
          @{usuario}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const [usuario, setUsuario] = useState("Louissilver");
  const [comunidades, setComunidades] = useState([{
    titulo: 'VASP',
    imagem: 'data:image/jpeg;base64,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'
  }]);
  const [pessoasFavoritas, setPessoasFavoritas] = useState([
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho"
  ]);

  function handleCreateCommunity(event) {
    event.preventDefault();
    const dadosForm = new FormData(event.target);

    const comunidade = {
      titulo: dadosForm.get('title'),
      imagem: dadosForm.get('image'),
    }

    const comunidadesAtualizadas = [...comunidades, comunidade];
    setComunidades(comunidadesAtualizadas);
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div style={{ gridArea: 'profileArea' }} className="profileArea">
          <ProfileSidebar usuario={usuario} />
        </div>
        <div style={{ gridArea: 'welcomeArea' }} className="welcomeArea">
          <Box>
            <h1 className="title">
              Bem-vindo(a)!
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos como capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos como capa"
                  type="text"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div style={{ gridArea: 'profileRelationsArea' }} className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoa, index) => {
                return (
                  <li key={index}>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Comunidades ({comunidades.length})
              </h2>
              <ul>
                {comunidades.map((comunidade, index) => {
                  return (
                    <li key={index}>
                      <a href={`/users/${comunidade.titulo}`} key={comunidade.titulo}>
                        <img src={`${comunidade.imagem}`} />
                        <span>{comunidade.titulo}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
