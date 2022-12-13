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
        adversary: "Várzea da Onça",
        homeTeam: {
          emblemShape: 0,
          goals: 2,
          name: "Várzea da Onça"
        },
        date: "24/04/2022",
        year: "2022",
        lineUp: [
          "Alexandre",
          "Márcio",
          "Cleiton",
          "Renê",
          "Ailton",
          "Vinícius Burití",
          "Jander",
          "Joel",
          "Washington",
          "Louro",
          "Keiliandro"
        ],
        substitutions: [
          {
            in: "Rafael",
            out: "Washington"
          },
          {
            in: "Isaac",
            out: "Vinícius Burití"
          }
        ],
        awayTeam: {
            goals: 1,
            name: "Cruzeiro do Cipó",
            scorers: [
                {
                  id: "-MQCFeUp6gto15cdPC1j",
                  name: "Keiliandro",
                  photo: "data:image/jpeg;base64,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"
                }
            ],
            assists: [
              {
                name: "Ailton"
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