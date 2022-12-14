import React from 'react'

import { useDispatch } from 'react-redux'
import { setSortId } from '../redux/slices/filter/slice';

type SortsListItem = {
  name: string;
  sort: string;
  desc: string;
}

type PopupClick = MouseEvent & { path: Node[] }

type SortProps = {
  sort: SortsListItem
}

export const sorts: SortsListItem[] = [
  { name: "популярности (DESC)", sort: "raiting", desc: "desc" },
  { name: "популярности (ASC)", sort: "-raiting", desc: "asc" },
  { name: "цене (DESC)", sort: "price", desc: "desc" },
  { name: "цене (ASC)", sort: "-price", desc: "asc" },
  { name: "алфавиту (DESC)", sort: "title", desc: "desc" },
  { name: "алфавиту (ASC)", sort: "-title", desc: "asc" }
]

const Sort: React.FC<SortProps> = React.memo(({ sort }) => {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const _event = event as PopupClick
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsVisible(false)
      }
    }
    document.body.addEventListener('click', handleOutsideClick)

    return () => document.body.removeEventListener('click', handleOutsideClick)
  }, [])


  const changeSortTable = (item: SortsListItem) => {
    dispatch(setSortId(item))
    setIsVisible(false)
  }

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && <div className="sort__popup">
        <ul>
          {sorts &&
            sorts.map((obj: SortsListItem) => (
              <li
                key={obj.name}
                onClick={() => changeSortTable(obj)}
                className={sort.sort === obj.sort ? "active" : ""}
              >{obj.name}</li>
            ))}
        </ul>
      </div>}
    </div>
  )
})

export default Sort