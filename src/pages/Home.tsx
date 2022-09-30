import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Categories, PizzaBlock, Sort, PizzaLoadingBlock, Pagination } from "../components";
import { setCategoryId, setPageCount, setFilters, selectSort, FilterSlicaState } from "../redux/slices/filterSlice";
import { sorts } from '../components/Sort';

import { useSelector } from 'react-redux'
import qs from "qs"
import { fetchPizzas, selectPizza } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const { sort, categoryId, pagecount, searchValue } = useSelector(selectSort)
  const { items, isLoading } = useSelector(selectPizza)

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""
    dispatch(
      fetchPizzas({
        category,
        search,
        sort,
        pagecount: String(pagecount)
      }))
    window.scrollTo(0, 0)
  }

  //отправка запроса на бэк
  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [sort, categoryId, searchValue, pagecount])

  //если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sorts.find(obj => obj.sort === params.sort)
      if (sort) {
        dispatch(setFilters({
          ...params,
          sort,
          categoryId: 0,
          pagecount: 0,
          searchValue: ''
        }))
      }
      isSearch.current = true
    }
  }, [])

  //если был первый рендер страницы, то добавление в URL путь страницы
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        categoryId,
        pagecount,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [sort.sort, categoryId, pagecount])


  const changeCatagory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index))
  }, [])

  const changePage = React.useCallback((number: number) => {
    dispatch(setPageCount(number))
  }, [])

  // можно найти через фильтер если мало данных(перед items): .filter(obj => { return obj.title.toLowerCase().includes(searchValue.toLowerCase()) })
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = Array(4).fill('').map((_, index) => <PizzaLoadingBlock key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={changeCatagory} />
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading === "error" ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>Попробуйте повторить попытку через пару минут.</p>
        </div>
      ) : <div className="content__items">
        {isLoading === "loading" ? skeletons : pizzas}
      </div>}

      <Pagination onChangePage={changePage} />
    </div>

  )
}

export default Home