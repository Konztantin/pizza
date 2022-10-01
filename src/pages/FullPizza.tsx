import axios from 'axios'
import React from 'react'

import { useParams, useNavigate, Link } from 'react-router-dom'

interface Pizza {
  imageUrl: string,
  title: string,
  price: number,
}

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<Pizza>()
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://632d75870d7928c7d24b77a3.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
        alert("Произошла ошибка! Повторить запрос через пару минут(")
        navigate("/")
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} руб.</h4>
      <Link to="/" className="button button--outline button--add go-back-btn">
        <span>Вернуться назад</span>
      </Link>
    </div>
  )
}

export default FullPizza