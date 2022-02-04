/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next"

import { WebHeader } from "../../components/Header"
import { MobileMenu, WebMenu } from "../../components/Menu"
import { Footer } from "../../components/Footer"

import api from "../api/api"
import Style from './styles.module.scss'

type TopAlbuns = {
  id: string,
  name: string,
  url: string,
  cover: string,
  views: string,
}

type TopAlbunsProps = {
  week: TopAlbuns[],
  month: TopAlbuns[],
}

export default function TopAlbuns({ month }: TopAlbunsProps) {
  return (
    <>
      <WebHeader/>
      <WebMenu/>
      <MobileMenu/>
      <div className={ Style.top }>
        <h1>Ranking Álbuns</h1>
        <h2>No Mês:</h2>
        <div className={ Style.topContent }>
            <ol>
                {
                    month.map(m => {
                    var image = m.url
                    image = image.replace(".html", "")

                    return (
                        <a href={m.url} target="blank" className={ Style.topInfo } key={m.id}>
                            <li></li>
                            <img className={ Style.month } src={image+".jpg"} alt="Top Month" />
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
  const topmonth = await api.get('rank.php?period=month&type=alb')
  const month = topmonth.data.alb.month.all.map((m: TopAlbuns) => {
    return {
      id: m.id,
      name: m.name,
      url: m.url,
      cover: m.cover,
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