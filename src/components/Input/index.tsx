/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

import api from "../../pages/api/api"
import Style from './styles.module.scss'

type Search = {
  id: string,
  band: string,
  url: string,
}

type SearchInput = {
  placeholder: string,
  type: string,
}

export const SearchInput = ({ 
  placeholder,
  type,
}: SearchInput) => {

  const [search, setSearch] = useState('')
  const [ searchArtist, setSearchArtist ] = useState([])

  function handleChange(e: any){
    e.preventDefault()
    setSearch(e.target.value.toLowerCase())
  }

  useEffect(() => {
    api.get(`search.art?q=${search}&limit=10`).then((response) => {
      setSearchArtist(response.data.response.docs)
    })
  }, [search, setSearchArtist])

  return(
    <>
      <div className={ Style.search }>
        <div className={ Style.searchInput }>
          <div className={ Style.input }>
            <i className="fas fa-search" aria-hidden></i>
            <input 
              placeholder={ placeholder }
              type={ type }
              onChange={(e: any) => handleChange(e)}
            />
            <div className={Style.searchList}>
              {
                searchArtist.map((sa: Search) => {
                  return(
                    <a href={`https://info-songs.vercel.app/artist/${sa.url}`} key={sa.id}>
                      <p>{sa.band}</p>
                    </a>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}