import { useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
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

function ProfileRelationsBox({ itens, title }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {`${title}`} ({itens.length})
      </h2>
      <ul>
        {itens.map((item, index) => {
          return (
            <li key={index}>
              <a href={`/users/${item.login}`} key={item.login}>
                <img src={`${item.avatar_url}`} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home({ githubUser }) {
  const usuario = githubUser;
  const [seguidores, setSeguidores] = useState(["Teste"]);
  const [comunidades, setComunidades] = useState([{
    titulo: 'VASP',
    imagem: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info&resize=680,453'
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
      title: dadosForm.get('title'),
      imageUrl: dadosForm.get('image'),
      creatorSlug: usuario,
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidade)
    })
      .then(async (response) => {
        const dados = await response.json();
        const comunidade = dados.registroCriado;
        const comunidadesAtualizadas = [...comunidades, comunidade];
        setComunidades(comunidadesAtualizadas);
      })
    event.target.reset();
  }

  useEffect(() => {
    fetch('https://api.github.com/users/peas/followers')
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setSeguidores(json);
      });

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '8df5f7168a947bc42faf9b8b73df0a',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'query': `query {
          allCommunities{
            title
            id
            imageUrl
            creatorSlug
          }
        }` })
    })
      .then((response) => response.json())
      .then((json) => setComunidades(json.data.allCommunities))
  }, []);

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
            <ProfileRelationsBox itens={seguidores} title="Seguidores" />
          </Box>
          <Box>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Comunidades ({comunidades.length})
              </h2>
              <ul>
                {comunidades.map((comunidade, index) => {
                  return (
                    <li key={`${comunidade.id}`}>
                      <a href={`/users/${comunidade.title}`} key={comunidade.title}>
                        <img src={`${comunidade.imageUrl}`} />
                        <span>{comunidade.title}</span>
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}