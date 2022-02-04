/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next"

import { WebHeader } from "../../components/Header"
import { MobileMenu, WebMenu } from "../../components/Menu"
import { Footer } from "../../components/Footer"

import api from "../api/api"
import Style from './styles.module.scss'

type News = {
  id: string,
  headline: string,
  kicker: string,
  url: string,
  pic_src: string,
  inserted: string,
}

type NewsProps = {
  news: News[],
}

export default function News({ news }: NewsProps) {

  return (
    <>
      <WebHeader/>
      <WebMenu/>
      <MobileMenu/>
      <div className={ Style.news }>
        <h1>Últimas Notícias</h1>
        <div className={ Style.newsContent }> 
        {
          news.map(n => {
            return (
              <a href={n.url} target="blank" className={ Style.newsInfo } key={n.id}>
                  <img src={"https://www.vagalume.com.br/"+n.pic_src} alt="Logo Smart Inventory"/>
                  <p>{ n.inserted }</p>
                  <h2>{ n.headline }</h2>
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
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('news/index.js')
  const news = data.news.map((n: News) => {
    return {
      id: n.id,
      headline: n.headline,
      kicker: n.kicker,
      url: n.url,
      pic_src: n.pic_src,
      inserted: n.inserted,
    }
  })

  return {
    props: {
      news,
    }
  }
}
