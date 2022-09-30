import React from 'react'
const category = ["Все", "Мясные", "Вегатареанские", "Гриль", "Острые", "Закрытые",]

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onChangeCategory }) => {
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
})

export default Categories