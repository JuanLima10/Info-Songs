/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next"

import { WebHeader } from "../../components/Header"
import { MobileMenu, WebMenu } from "../../components/Menu"
import { Footer } from "../../components/Footer"

import api from "../api/api"
import Style from './styles.module.scss'

type HotSpot = {
  id: string,
  title: string,
  date_fmt: string,
  link: string,
  descr: string,
  pic_src: string,
  type: string,
  musicID: string,
}

type HotSpotProps = {
  hotspot: HotSpot[],
}

export default function HotSpot({ hotspot }: HotSpotProps) {

  return (
    <>
      <WebHeader/>
      <WebMenu/>
      <MobileMenu/>
      <div className={ Style.hotspot }>
        <h1>Lançamentos e Clipes</h1>
        <div className={ Style.hotspotContent }> 
        {
          hotspot.map(hs => {
            return (
              <a href={hs.link} target="blank" className={ Style.hotspotInfo } key={hs.id}>
                  <img src={hs.pic_src} alt="Hot Spot" />
                  <div className={ Style.hotspotInfoTexts }>
                    <h2>{hs.title}</h2>
                    <h5>{hs.date_fmt}</h5>
                    <p>{hs.descr}</p>
                  </div>
              </a>
            )
          })
        }
        </div>
      </div>
      <Footer/>
    </>
  )

}

// GET
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('hotspots.php')
  const hotspot = data.hotspots.map((hs: HotSpot) => {
    return {
      id: hs.id,
      title: hs.title,
      date_fmt: hs.date_fmt,
      link: hs.link,
      descr: hs.descr,
      pic_src: hs.pic_src,
      type: hs.type,
      musicID: hs.musicID,
    }
  })

  return {
    props: {
        hotspot,
    },
    revalidate: 60*60*8,
  }
}