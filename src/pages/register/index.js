import React, {useEffect} from 'react'
import firebaseDb from '../../firebase'

export default function RegisterScreen() {
    
  useEffect(() => {
    registerMatch()
    // registerPlayer()
    // registerReport()
  }, [])

  /*
  const registerReport = () => {
    let report = {
        title: "Estatísticas para goleiros",
        date: "04/02/2022",
        image: "",
        content: "Agora o App oficial do Cruzeiro do Cipó também conta com estatísticas para goleiros, com a quantidade de jogos, jogos sem sofrer gols e número de gols sofridos. Na tela de Estatísticas é possível visualizar uma lista com todos os jogadores que atuaram como goleiros na temporada, ordenando-os de acordo com seu desempenho. É possível também visualizar esses dados de forma individual no perfil do jogador."
    }
    firebaseDb.child("reports").push(
        report,
        error => {
            if(error) {
                console.log(error)
            }
        }
    )
  }
  */

  /*
  const registerPlayer = () => {
    let player = {
        name: "Renê",
        photo: "",
        2021: {
          matches: 10,
          goals: 0,
          assists: 0
        },
        2022: {
          matches: 12,
          goals: 1,
          assists: 0
        }
    }
    firebaseDb.child("players").push(
        player,
        error => {
            if(error) {
                console.log(error)
            }
        }
    )
  }
  */

  const registerMatch = () => {
    let match = {
        away: true,
        homeTeam: {
          emblemShape: 4,
          goals: 1,
          name: "Santos do Alívio"
        },
        date: "15/01/2023",
        year: "2023",
        lineUp: [
          "Alexandre",
          "Leandro",
          "Cleiton",
          "Renê",
          "Manelzin",
          "Vinícius Buriti",
          "Márcio",
          "Rafael",
          "Joel",
          "Maurivan",
          "Bruno"
        ],
        substitutions: [
          {
            in: "Talles",
            out: "Vinícius Buriti"
          },
          {
            in: "Ailton",
            out: "Leandro"
          },
          {
            in: "Keiliandro",
            out: "Cleiton"
          },
          {
            in: "Jander",
            out: "Márcio"
          }
        ],
        awayTeam: {
            goals: 1,
            name: "Cruzeiro do Cipó",
            scorers: [
                {
                  id: "-MeREbxe9d4S9JMKcctI",
                  name: "Rafael",
                  photo: "data:image/jpg;base64,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"
                }
            ],
            assists: [
              {
                name: "Maurivan"
              }
            ]
        }
    }
    firebaseDb.child("matches").push(
        match,
        error => {
            if(error) {
                console.log(error)
            }
        }
    )
  }

  return (
      <div>REGISTER PAGE</div>
  )
}