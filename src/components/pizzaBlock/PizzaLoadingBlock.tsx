import React from 'react'
import ContentLoader from "react-content-loader"

const PizzaLoadingBlock: React.FC = () => {
  return (
    <ContentLoader className='pizza-block'
      speed={2}
      width={282}
      height={460}
      viewBox="0 0 282 460"
      backgroundColor="#e6e6e6"
      foregroundColor="#ecebeb"

    >
      <rect x="0" y="270" rx="10" ry="10" width="260" height="28" />
      <rect x="0" y="310" rx="10" ry="10" width="122" height="22" />
      <rect x="136" y="310" rx="10" ry="10" width="122" height="22" />
      <rect x="0" y="338" rx="10" ry="10" width="80" height="21" />
      <rect x="88" y="339" rx="10" ry="10" width="80" height="21" />
      <rect x="177" y="340" rx="10" ry="10" width="80" height="21" />
      <rect x="0" y="374" rx="13" ry="13" width="96" height="35" />
      <rect x="135" y="374" rx="13" ry="13" width="122" height="35" />
      <circle cx="128" cy="128" r="128" />
    </ContentLoader>
  )

}

export default PizzaLoadingBlock