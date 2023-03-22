import React, {useState, useEffect, useRef} from 'react'
import firebaseDb from '../../../firebase'
import Loader from '../../../components/loader'
import SectionTitle from '../../../components/section-title'
import { Input, Select, Radio, Button, message, Divider, Form, Space, InputNumber } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Emblem from '../../../components/emblem'
import { emblems } from '../../../utils/js-utils/emblems'
import { positions } from '../../../utils/js-utils/constants'
import './style.scss'

export default function RegisterMatch() {

	const InputStyle = {
		marginBottom: 8
	}

	const [players, setPlayers] = useState([])
	const [playersIDs, setPlayersIDs] = useState([])
	const [playersSelect, setPlayersSelect] = useState([])
	const [loadingPlayers, setLoadingPlayers] = useState(false)

	const [adversary, setAdversary] = useState()
	const [emblem, setEmblem] = useState(0)
	const [away, setAway] = useState("false")
	const [date, setDate] = useState("")
	const [lineUp, setLineUp] = useState(new Array(11))
	const [substitutions, setSubstitutions] = useState([])
	const [cipoGoals, setCipoGoals] = useState(0)
	const [adversaryGoals, setAdversaryGoals] = useState(0)
	const [scorers, setScorers] = useState([])
	const [assists, setAssists] = useState([])
	const [goalsFormFields, setGoalsFormFields] = useState([])

	const substitutionsForm = useRef(null)
	const scorersForm = useRef(null)
	const assistsForm = useRef(null)

	const [registering, setRegistering] = useState(false)

	const { Option } = Select
	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		setLoadingPlayers(true)
		firebaseDb.child('players').on('value', snapshot => {
			if(snapshot.val() !== null) {
				setPlayers(Object.values({...snapshot.val()}))
				setPlayersIDs(Object.keys({...snapshot.val()}))
				setLoadingPlayers(false)
			}
		})
	}, [])

	useEffect(() => {
		let selectList = [{value: "0", label: "Gol contra/Sem assistência"}]
		Object.values(players).map((player, i) => {
			selectList.push({value: playersIDs[i], label: player.name})
		})
		setPlayersSelect(selectList)
	}, [players, playersIDs])

	const lineUpHandler = (player, index) => {
		let lineUpList = lineUp
		lineUpList[index] = player
		setLineUp(lineUpList)
	}

	const substitutionsHandler = (values) => {
		setSubstitutions(values.subs)
	}

	const scorersHandler = (values) => {
		let scorersList = values.scorers.map(item => {
			let playerIndex = playersIDs.findIndex(id => id === item.scorer)
			if(playerIndex >= 0) {
				return {
					id: item.scorer,
					name: players[playerIndex]?.name,
					photo: players[playerIndex]?.photo
				}
			}
			else {
				return {
					name: "Gol contra",
					photo: "data:image/jpg;base64,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"
				}
			}
		})
		setScorers(scorersList)
	}

	const assistsHandler = (values) => {
		let assistsList = values.assists.map(item => {
			let playerIndex = playersIDs.findIndex(id => id === item.assist)
			if(playerIndex >= 0) {
				return {name: players[playerIndex]?.name}
			}
			else {
				return {}
			}
		})
		setAssists(assistsList)
	}

	useEffect(() => {
		let fields = []
		while (fields.length < cipoGoals) {
			fields.push({key: fields.length, name: fields.length, value: ""})
		}
		setGoalsFormFields(fields)
	}, [cipoGoals])

	const displayMessage = (type, content) => {
		messageApi.open({
      type: type,
      content: content,
    })
	}

	const register = () => {
		let cru = {
			name: "Cruzeiro do Cipó",
			goals: cipoGoals,
			scorers: scorers,
			assists: assists
		}

		let adv = {
			name: adversary,
			goals: adversaryGoals,
			emblemShape: emblem
		}

		let match = {
			adversary: adversary,
			away: away === "true" ? true : false,
			date: date,
			year: date.substring(date.length - 4),
			lineUp: lineUp,
			substitutions: substitutions,
			homeTeam: away === "true" ? adv : cru,
			awayTeam: away === "true" ? cru : adv
		}
		
		setRegistering(true)
		firebaseDb.child("matches").push(match)
			.then(() => {
				setRegistering(false)
				displayMessage('success', 'Jogo cadastrado com sucesso!')
			})
			.catch((error) => {
				console.log(error)
				setRegistering(false)
				displayMessage('error', 'Erro ao salvar os dados! Tente novamente ou entre em contato com o suporte.')
			})
	}

	return (
		<article className="register-match">
			{loadingPlayers ? 
        <section className='register-match__loader-container'>
          <Loader/>
        </section> : 
				<section className='register-match__content'>
					{ contextHolder }
					<SectionTitle title="Cadastrar jogo" color="blue"/>
					<div className='register-match__content__form'>
						<div className='form-item'>
							<Input
								placeholder="Adversário"
								size='large'
								onChange={(e) => setAdversary(e.target.value)}
							/>
						</div>
						<div className='form-item'>
							<Select
								style={{ width: '100%' }}
								placeholder="Selecione o escudo"
								defaultValue="0"
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
								defaultValue="false"
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
								onChange={(e) => setDate(e.target.value)}
							/>
						</div>
						<Divider orientation="left">Escalação</Divider>
						{positions.map((position, index) => (
							<Input
								key={index}
								addonBefore={position.pos}
								placeholder={position.description}
								style={InputStyle}
								onChange={(e) => lineUpHandler(e.target.value, index)}
							/>
						))}
						<Divider orientation="left">Substituições</Divider>
						<Form ref={substitutionsForm} name="substitutions-form" onChange={() => substitutionsForm.current.submit()} onFinish={substitutionsHandler}>
							<Form.List name="subs">
								{(fields, {add, remove}) => (
									<>
										{fields.map(({ key, name, ...restField }) => (
											<Space key={key} style={{display: 'flex', ...InputStyle}} align="baseline">
												<Form.Item {...restField} name={[name, 'out']} style={{marginBottom: 0}}>
													<Input name="out" placeholder="Saiu" />
												</Form.Item>
												<Form.Item {...restField} name={[name, 'in']} style={{marginBottom: 0}}>
													<Input name="in" placeholder="Entrou" />
												</Form.Item>
												<MinusCircleOutlined onClick={() => remove(name)} />
											</Space>
										))}
										<Form.Item>
											<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
												Adicionar Substituição
											</Button>
										</Form.Item>
									</>
								)}
							</Form.List>
						</Form>
						<Divider orientation="left">Placar</Divider>
						<div className='form-item scoreboard'>
							<InputNumber addonBefore="Cruzeiro do Cipó" defaultValue={0} onChange={(value) => setCipoGoals(value)} style={InputStyle}/>
							<InputNumber addonBefore="Adversário" defaultValue={0} onChange={(value) => setAdversaryGoals(value)}/>
						</div>
						<section className='goals-section'>
							<div className='goals-section__column' style={{paddingRight: 4}}>
								<Divider orientation="center">Gols</Divider>
								<Form ref={scorersForm} name="scorers-form" onValuesChange={() => scorersForm.current.submit()} onFinish={scorersHandler}>
									<Form.List name="scorers">
										{() => (
											<>
												{goalsFormFields.map(({key, name, ...restField}) => (
													<Form.Item key={key} name={[name, 'scorer']} {...restField} style={InputStyle}>
														<Select name="scorer" options={playersSelect}/>
													</Form.Item>
												))}
											</>
										)}
									</Form.List>
								</Form>
							</div>
							<div className='goals-section__column' style={{paddingLeft: 4}}>
								<Divider orientation="center">Assistências</Divider>
								<Form ref={assistsForm} name="goals-form" onValuesChange={() => assistsForm.current.submit()} onFinish={assistsHandler}>
									<Form.List name="assists">
										{() => (
											<>
												{goalsFormFields.map(({key, name, ...restField}) => (
													<Form.Item key={key} name={[name, 'assist']} {...restField} style={InputStyle}>
														<Select name="assist" options={playersSelect} />
													</Form.Item>
												))}
											</>
										)}
									</Form.List>
								</Form>
							</div>
						</section>
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