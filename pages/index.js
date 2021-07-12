import { useState } from 'react';
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar({ usuario }) {
  return (
    <Box>
      <img src={`https://github.com/${usuario}.png`} alt="Foto de perfil do usuário" style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const [usuario, setUsuario] = useState("Louissilver");
  const [pessoasFavoritas, setPessoasFavoritas] = useState([
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho"
  ]);

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
        </div>
        <div style={{ gridArea: 'profileRelationsArea' }} className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map(pessoa => {
                return (
                  <li>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  )
}
