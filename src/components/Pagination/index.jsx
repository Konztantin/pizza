import React from 'react'

import ReactPaginate from 'react-paginate';

import styles from "./Pagination.module.scss"
//пагинация страниц (mokApI опять работает криво! в количестве страниц, пришлось захоркодить)
const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=" >"
      previousLabel="< "
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination