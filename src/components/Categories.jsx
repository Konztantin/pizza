import React from 'react'

const category = ["Все", "Мясные", "Вегатареанские", "Гриль", "Острые", "Закрытые",]

function Categories({ categoryId, onChangeCategory }) {
  return (
    <div className="categories">
      <ul>
        {category &&
          category.map((item, index) => (
            <li
              onClick={() => onChangeCategory(index)}
              key={item}
              className={categoryId === index ? "active" : ''}
            >{item}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Categories