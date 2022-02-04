/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next"

import { WebHeader } from "../../components/Header"
import { MobileMenu, WebMenu } from "../../components/Menu"
import { Footer } from "../../components/Footer"

import api from "../api/api"
import Style from './styles.module.scss'

type TopArtists = {
  id: string,
  name: string,
  url: string,
  pic_medium: string,
  views: string,
}

type TopArtistsProps = {
  week: TopArtists[],
  month: TopArtists[],
}

export default function TopArtists({ month }: TopArtistsProps) {

  return (
    <>
      <WebHeader/>
      <WebMenu/>
      <MobileMenu/>
      <div className={ Style.top }>
        <h1>Racking Artistas</h1>
        <h2>No Mês:</h2>
        <div className={ Style.topContent }>
            <ol>
                {
                    month.map(m => {
                    var artistUrl = m.url
                    artistUrl = artistUrl.replace("https://www.vagalume.com.br", "")
                    return (
                        <a href={"/artist"+artistUrl} className={ Style.topInfo } key={m.id}>
                            <li></li>
                            <img src={m.pic_medium} alt="Top Month" />
                            <p>{m.name}</p>
                        </a>
                    )
                    })
                }
            </ol>
        </div>
      </div>
      <Footer/>
    </>
  )

}

// GET
export const getStaticProps: GetStaticProps = async () => {
  const topmonth = await api.get('rank.php?period=month')
  const month = topmonth.data.art.month.all.map((m: TopArtists) => {
    return {
      id: m.id,
      name: m.name,
      url: m.url,
      pic_medium: m.pic_medium,
      views: m.views,
    }
  })

  return {
    props: {
        month,
    },
    revalidate: 60*60*8,
  }
}