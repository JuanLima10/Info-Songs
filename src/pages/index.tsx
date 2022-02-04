/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { GetStaticProps } from "next"
import { useKeenSlider } from "keen-slider/react"

import { WebHeader } from "../components/Header"
import { MobileMenu, WebMenu } from "../components/Menu"
import { Footer } from "../components/Footer"

import api from "./api/api"
import "keen-slider/keen-slider.min.css"
import Style from './styles.module.scss'

type News = {
  id: string,
  headline: string,
  kicker: string,
  url: string,
  pic_src: string,
  inserted: string,
}

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

type TopMusics = {
  id: string,
  name: string,
  nameArt: string,
  url: string,
  pic_medium: string,
  views: string,
  art: any,
}

type TopArtists = {
  id: string,
  name: string,
  url: string,
  pic_medium: string,
  views: string,
}

type TopAlbuns = {
  id: string,
  name: string,
  nameArt: string,
  url: string,
  cover: string,
  views: string,
  art: any,
}

type HomeProps = {
  news: News[],
  hotspot: HotSpot[],
  music: TopMusics[],
  artist: TopArtists[],
  album: TopAlbuns[],
}
export default function Home({ news, hotspot, music, artist, album }: HomeProps) {

  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 450px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  })

  return (
    <>
      <WebHeader/>
      <WebMenu/>
      <MobileMenu/>
      <div className={ Style.home }>
        <div className={ Style.homeContent }>
          <h1>Info Songs</h1>
          <h2>Notícias:</h2>
          <div className={ Style.homeNews }>
            <div ref={ref} className="keen-slider">
            {
              news.map(n => {
                return (
                  <div className="keen-slider__slide" key={n.id}>
                    <a href={n.url} target="blank" className={ Style.newsInfo }>
                      <img src={"https://www.vagalume.com.br/"+n.pic_src} alt="Logo Smart Inventory"/>
                      <p>
                        <a><button>Ver matéria</button></a><br/>
                        { n.headline }
                      </p>
                    </a>
                  </div>
                )
              })
            }
          </div>
          <h2>Hot Spots:</h2>
          <div className={ Style.homeHotspot }>
          {
            hotspot.map(hs => {
              return (
                <a href={hs.link} target="blank" className={ Style.hotsInfo } key={hs.id}>
                    <img src={hs.pic_src} alt="Logo Smart Inventory"/>
                    <h3>{ hs.title }</h3>
                    <p>{ hs.descr }</p>
                </a>
              )
            })
          }
          </div>
          </div>
          <h2>Top Mesnsal:</h2>
          <div className={ Style.homeTop }>
            <div className={ Style.topCard }>
              <h3>Músicas</h3>
              <ol>
              {
                music.map(m => {
                  return(
                      <a key={m.id} href={m.url} target="blank" className={ Style.card }>
                        <li></li>
                        <div className={ Style.cardTexts }>
                          <span>{ m.name }</span>
                          <p>{ m.nameArt }</p>
                        </div>
                      </a>
                  )
                })
              }
              </ol>
              <a href="/top-musics"><button>Ver tudo</button></a>
            </div>
            <div className={ Style.topCard }>
              <h3>Artistas</h3>
              <ol>
                {
                  artist.map(a => {
                    var artistUrl = a.url
                    artistUrl = artistUrl.replace("https://www.vagalume.com.br", "")
                    return(
                      <a key={a.id} href={"/artist"+artistUrl} className={ Style.card }>
                        <li></li>
                        <img src={a.pic_medium} className={ Style.artImg } alt="Artist Image" />
                        <span>{ a.name }</span>
                      </a>
                    )
                  })
                }
              </ol>
              <a href="/top-artists"><button>Ver tudo</button></a>
            </div>
            <div className={ Style.topCard }>
              <h3>Albuns</h3>
              <ol>
                {
                  album.map(a => {
                    var image = a.url
                    image = image.replace(".html", "")
                    return(
                      <a key={a.id} href={a.url} target="blank" className={ Style.card }>
                        <li></li>
                        <img src={image+".jpg"} alt="Album Image" />
                        <div className={ Style.cardTexts }>
                          <span>{ a.name }</span>
                          <p>{ a.nameArt }</p>
                        </div>
                      </a>
                    )
                  })
                }
              </ol>
              <a href="/top-albuns"><button>Ver tudo</button></a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )

}

export const getStaticProps: GetStaticProps = async () => {
  const homeNews = await api.get('news/index.js')
  const news = homeNews.data.news.map((n: News) => {
    return {
      id: n.id,
      headline: n.headline,
      kicker: n.kicker,
      url: n.url,
      pic_src: n.pic_src,
      inserted: n.inserted,
    }
  })

  const homeHot = await api.get('hotspots.php')
  const hotspot = homeHot.data.hotspots.map((hs: HotSpot) => {
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

  const homeMusic = await api.get('rank.php?period=month&type=mus&limit=5')
  const music = homeMusic.data.mus.month.all.map((w: TopMusics) => {
    return {
      id: w.id,
      name: w.name,
      nameArt: w.art.name,
      url: w.url,
      pic_medium: w.art.pic_medium,
      views: w.views,
    }
  })

  const homeArtist = await api.get('rank.php?period=month&limit=5')
  const artist = homeArtist.data.art.month.all.map((w: TopArtists) => {
    return {
      id: w.id,
      name: w.name,
      url: w.url,
      pic_medium: w.pic_medium,
      views: w.views,
    }
  })
  
  const homeAlbum = await api.get('rank.php?period=month&type=alb&limit=5')
  const album = homeAlbum.data.alb.month.all.map((w: TopAlbuns) => {
    return {
      id: w.id,
      name: w.name,
      nameArt: w.art.name,
      url: w.url,
      cover: w.cover,
      views: w.views,
    }
  })

  return {
    props: {
      news,
      hotspot,
      music,
      artist,
      album,
    },
    revalidate: 60*60*8,
  }
}