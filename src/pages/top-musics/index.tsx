/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next"
import { Footer } from "../../components/Footer"

import { WebHeader } from "../../components/Header"
import { MobileMenu, WebMenu } from "../../components/Menu"

import api from "../api/api"
import Style from './styles.module.scss'

type TopMusics = {
  id: string,
  name: string,
  nameArt: string,
  url: string,
  pic_medium: string,
  views: string,
  art: any,
}

type TopMusicsProps = {
  week: TopMusics[],
  month: TopMusics[],
}

export default function TopMusics({ month }: TopMusicsProps) {

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
                    return (
                        <a href={m.url} target="blank" className={ Style.topInfo } key={m.id}>
                            <li></li>
                            <img src={m.pic_medium} alt="Top Month" />
                            <div className={ Style.topInfoTexts }>
                              <p>{m.name}</p>
                              <span>{m.nameArt}</span>
                            </div>
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

  const topmonth = await api.get('rank.php?period=month&type=mus')
  const month = topmonth.data.mus.month.all.map((m: TopMusics) => {
    return {
      id: m.id,
      name: m.name,
      nameArt: m.art.name,
      url: m.url,
      pic_medium: m.art.pic_medium,
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