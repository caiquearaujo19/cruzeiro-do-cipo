import React, {useEffect} from 'react'
import firebaseDb from '../../firebase'

export default function RegisterScreen() {
    
  useEffect(() => {
    registerMatch()
    // registerPlayer()
    // registerReport()
  }, [])

  // const registerReport = () => {
  //   let report = {
  //       title: "Estatísticas para goleiros",
  //       date: "04/02/2022",
  //       image: "",
  //       content: "Agora o App oficial do Cruzeiro do Cipó também conta com estatísticas para goleiros, com a quantidade de jogos, jogos sem sofrer gols e número de gols sofridos. Na tela de Estatísticas é possível visualizar uma lista com todos os jogadores que atuaram como goleiros na temporada, ordenando-os de acordo com seu desempenho. É possível também visualizar esses dados de forma individual no perfil do jogador."
  //   }
  //   firebaseDb.child("reports").push(
  //       report,
  //       error => {
  //           if(error) {
  //               console.log(error)
  //           }
  //       }
  //   )
  // }

  // const registerPlayer = () => {
  //   let player = {
  //       name: "Jean",
  //       photo: "",
  //       2022: {
  //         matches: 1,
  //         goals: 0,
  //         assists: 0,
  //         goalkeeper: {
  //           matches: 1,
  //           cleanSheets: 0,
  //           goalsConceded: 4
  //         }
  //       }
  //   }
  //   firebaseDb.child("players").push(
  //       player,
  //       error => {
  //           if(error) {
  //               console.log(error)
  //           }
  //       }
  //   )
  // }

  const registerMatch = () => {
    let match = {
        away: true,
        homeTeam: {
            emblemShape: 0,
            goals: 2,
            name: "Palmeiras do Bomfim"
        },
        date: "20/03/2022",
        year: "2022",
        lineUp: [
         "Caíque",
         "Renan",
         "Cleiton",
         "Renê",
         "Ailton",
         "Márcio",
         "Jander",
         "Washington",
         "Joel",
         "Leandro",
         "Keiliandro"
        ],
        substitutions: [
          {
            in: "Rafael",
            out: "Leandro"
          },
          {
            in: "Vinícius Buriti",
            out: "Márcio"
          }
        ],
        awayTeam: {
            goals: 2,
            name: "Cruzeiro do Cipó",
            scorers: [
                {
                  id: "-MQCFeUp6gto15cdPC1j",
                  name: "Keiliandro",
                  photo: "data:image/jpeg;base64,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"
                },
                {
                  name: "Gol contra",
                  photo: "data:image/jpg;base64,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"
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