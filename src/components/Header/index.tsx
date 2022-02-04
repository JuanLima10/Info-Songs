/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next"
import { useEffect, useState } from "react"

import { SearchInput } from '../Input'

import api from "../../pages/api/api"
import Style from './styles.module.scss'

type Search = {
  id: string,
  band: string,
}

type WebHeaderProps = {
  searchs: Search[],
}

export const WebHeader = () => {

    return(
      <>
        <div className={ Style.webHeader }>
            <div className={ Style.webHeaderContent }>
                <a href="/"><img src="/img/InfoSongsLogo.png" alt="logo"/></a>
                <SearchInput placeholder="Pesquise seu artista favorito ..." type="text" />
                <a href="/hotspots" className={Style.hotSpotBtn}><i className="fas fa-fire" aria-hidden></i> Hot spots</a>
            </div>
        </div>
      </>
    )
}