import React, {useEffect} from 'react'
import firebaseDb from '../../firebase'

export default function RegisterScreen() {
    
  useEffect(() => {
    registerMatch()
  }, [])

  const registerMatch = () => {
    let match = {
        away: false,
        adversary: "Barcelona da Vila Nova",
        awayTeam: {
          emblemShape: 4,
          goals: 0,
          name: "Barcelona Vila Nova"
        },
        date: "22/01/2023",
        year: "2023",
        lineUp: [
          "Alexandre",
          "Talles",
          "Cleiton",
          "Renê",
          "Manelzin",
          "Vinícius Buriti",
          "Joel",
          "Rafael",
          "Maycon",
          "Maurivan",
          "Bruno"
        ],
        substitutions: [
          {
            in: "Ailton",
            out: "Talles"
          },
          {
            in: "Keiliandro",
            out: "Vinícius Buriti"
          },
          {
            in: "Mauro Filho",
            out: "Joel"
          }
        ],
        homeTeam: {
            goals: 2,
            name: "Cruzeiro do Cipó",
            scorers: [
                {
                  id: "-NHV5IFm1b__MtufPnGT",
                  name: "Maurivan",
                  photo: "data:image/jpg;base64,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"
                },
                {
                  id: "-NMTzfDrmQdZVMByMbp_",
                  name: "Bruno",
                  photo: "data:image/jpg;base64,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"
                }
            ],
            assists: [
              {
                name: "Maycon"
              },
              {
                name: "Mauro Filho"
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