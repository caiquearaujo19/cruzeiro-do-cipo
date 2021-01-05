import React, {useEffect} from 'react'
import firebaseDb from '../../firebase'

export default function RegisterScreen() {
    
  useEffect(() => {
    // registerPlayer()
  }, [])

  const registerPlayer = () => {
    let player = {
        name: "Jander",
        photo: "data:image/jpeg;base64,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",
        matches: 1,
        goals: 0,
        assists: 1
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

  const registerMatch = () => {
    let match = {
        away: false,
        awayTeam: {
            emblemShape: 4,
            goals: 1,
            name: "Ceará da Várzea da Esmera"
        },
        date: "03/01/2021",
        homeTeam: {
            goals: 3,
            name: "Cruzeiro do Cipó",
            scorers: [
                {
                    id: "-MQCEgBII4tS49uZmMZt",
                    photo: "data:image/jpeg;base64,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",
                    name: "Anderson"
                },
                {
                    id: "-MQCFeUp6gto15cdPC1j",
                    photo: "data:image/jpeg;base64,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",
                    name: "Keiliandro"
                },
                {
                    id: "",
                    photo: "data:image/jpeg;base64,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",
                    name: "Bodó"
                }
            ],
            assists: [
                {
                    name: "Keiliandro"
                },
                {
                    name: "Joel"
                },
                {
                    name: "Jander"
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