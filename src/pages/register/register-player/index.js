import React, {useState, useEffect} from 'react'
import firebaseDb from '../../../firebase'
import Loader from '../../../components/loader'
import SectionTitle from '../../../components/section-title'
import { Input, Button, message } from 'antd'
import './style.scss'

export default function RegisterPlayer() {

  const [matches, setMatches] = useState({})
	const [loadingMatches, setLoadingMatches] = useState(false)
	const [registering, setRegistering] = useState(false)

	const [playerName, setPlayerName] = useState("")
	const [playerPhoto, setPlayerPhoto] = useState("")

	const { TextArea } = Input;
	const [messageApi, contextHolder] = message.useMessage()
	

	useEffect(() => {
		setLoadingMatches(true)
		firebaseDb.child('matches').on('value', snapshot => {
			if(snapshot.val() !== null) {
				setMatches(Object.values({...snapshot.val()}))
				setLoadingMatches(false)
			}
		})
	}, [])

	const displayMessage = (type, content) => {
		messageApi.open({
      type: type,
      content: content,
    })
	}

	const getHistory = (name) => {
		let history = {}

		const incrementData = (year) => {
			if(history[year]) {
				history[year].matches++
			}
			else {
				history[year] = {
					matches: 1,
					goals: 0,
					assists: 0
				}
			}
		}

		matches.forEach(match => {
			match.lineUp.forEach(player => {
				if (player === name) {
					incrementData(match.year)
				}
			})
			match.substitutions.forEach(sub => {
				if(sub.in === name) {
					incrementData(match.year)
				}
			})
			
			let team = match.away ? "awayTeam" : "homeTeam"
			match[team].scorers?.forEach(scorer => {
				if(scorer.name === name) {
					history[match.year].goals++
				}
			})
			match[team].assists?.forEach(assist => {
				if(assist.name === name) {
					history[match.year].assists++
				}
			})
		})

		return history
	}

	const register = () => {
		let player = {
			name: playerName,
			photo: playerPhoto,
			...getHistory(playerName)
		}
		
		console.log(player)

		setRegistering(true)
		firebaseDb.child("players").push(player)
			.then(() => {
				setRegistering(false)
				displayMessage('success', 'Jogador cadastrado com sucesso!')
			})
			.catch((error) => {
				console.log(error)
				setRegistering(false)
				displayMessage('error', 'Erro ao salvar os dados! Tente novamente ou entre em contato com o suporte.')
			})
	}

	return (
		<article className="register-player">
			{ loadingMatches ?
				<section className='register-player__loader-container'>
					<Loader/>
				</section> :
				<section className='register-player__content'>
					{ contextHolder }
					<SectionTitle title="Cadastrar jogador" color="blue"/>
					<div className='register-player__content__form'>
						<div className='form-item'>
							<Input
								placeholder="Nome do jogador"
								size='large'
								value={playerName}
								onChange={(e) => setPlayerName(e.target.value)}
							/>
						</div>
						<div className='form-item'>
							<TextArea
								rows={4}
								placeholder="Foto (base64)"
								size="large"
								onChange={(e) => setPlayerPhoto(e.target.value)}/>
						</div>
						<div className='form-item'>
							<Button
								type="primary"
								size="large"
								block 
								onClick={register}
								loading={registering}
							>
								Cadastrar
							</Button>
						</div>
					</div>
				</section>
			}
		</article>
	)
}