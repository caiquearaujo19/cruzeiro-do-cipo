import React, {useState, useEffect} from 'react'
import firebaseDb from '../../../firebase'
import Loader from '../../../components/loader'
import SectionTitle from '../../../components/section-title'
import Emblem from '../../../components/emblem'
import { Input, Select, Radio, Button, message } from 'antd'
import { emblems } from '../../../utils/js-utils/emblems'
import './style.scss'

export default function RegisterNextMatch() {

	const [nextMatch, setNextMatch] = useState({})
	const [loadingNextMatch, setLoadingNextMatch] = useState(false)

	const [adversary, setAdversary] = useState("")
	const [emblem, setEmblem] = useState(0)
	const [away, setAway] = useState("")
	const [date, setDate] = useState("")

	const [registering, setRegistering] = useState(false)

	const { Option } = Select
	const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    setLoadingNextMatch(true)
    firebaseDb.child('next-match').on('value', snapshot => {
      if(snapshot.val() !== null) {
        setNextMatch({...snapshot.val()})
        setLoadingNextMatch(false)
      }
    })
  }, [])

	useEffect(() => {
		if(nextMatch.adversary) {
			setAdversary(nextMatch.adversary.name)
			setEmblem(nextMatch.adversary.emblemShape)
			setAway(nextMatch.away ? "true" : "false")
			setDate(nextMatch.date)
		}
	}, [nextMatch])

	const displayMessage = (type, content) => {
		messageApi.open({
      type: type,
      content: content,
    })
	}

	const register = () => {
		let match = {
			adversary: {
				name: adversary,
				emblemShape: Number(emblem)
			},
			away: away === "true" ? true : false,
			date: date
		}
		
		setRegistering(true)
		firebaseDb.child("next-match").set(match)
			.then(() => {
				setRegistering(false)
				displayMessage('success', 'Próximo jogo cadastrado com sucesso!')
			})
			.catch((error) => {
				console.log(error)
				setRegistering(false)
				displayMessage('error', 'Erro ao salvar os dados! Tente novamente ou entre em contato com o suporte.')
			})
	}

  return (
    <article className="register-next-match">
      {loadingNextMatch ? 
        <section className='register-next-match__loader-container'>
          <Loader/>
        </section> : 
				<section className='register-next-match__content'>
					{ contextHolder }
					<SectionTitle title="Cadastrar próximo jogo" color="blue"/>
					<div className='register-next-match__content__form'>
						<div className='form-item'>
							<Input
								placeholder="Adversário"
								size='large'
								value={adversary}
								onChange={(e) => setAdversary(e.target.value)}
							/>
						</div>
						<div className='form-item'>
							<Select
								style={{ width: '100%' }}
								placeholder="Selecione o escudo"
								defaultValue={emblem.toString()}
								optionLabelProp="label"
								size="large"
								onChange={(value) => setEmblem(value)}
							>
								{
									emblems.map(emblem => 
										<Option key={emblem.shape} value={emblem.shape} label={emblem.description}>
											<div className="emblem-select-item">
												<span role="img" aria-label={emblem.description}>
													<Emblem shape={emblem.shape} colorful />
												</span>
												{emblem.description}
											</div>
										</Option>
									)
								}
							</Select>
						</div>
						<div className='form-item'>
							<Radio.Group
								defaultValue={away}
								size="large"
								style={{width: '100%'}}
								
								onChange={(e) => setAway(e.target.value)}
							>
								<Radio.Button value="false">Casa</Radio.Button>
								<Radio.Button value="true">Fora</Radio.Button>
							</Radio.Group>
						</div>
						<div className='form-item'>
							<Input
								placeholder="Data"
								size='large'
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
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