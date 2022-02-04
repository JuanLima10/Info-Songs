/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import { WebHeader } from "../../components/Header"
import { MobileMenu, WebMenu } from "../../components/Menu"
import { Footer } from "../../components/Footer"

import api from "../api/api"
import Style from './styles.module.scss'

type Genre = {
    name: string,
    url: string,
}

type Lyrics = {
    id: string,
    desc: string,
    url: string,
}

type Albums = {
    id: string,
    desc: string,
    url: string,
    year: string,
}

type Artists = {
    id: string,
    desc: string,
    url: string,
    pic_medium: string,
    rank: any,
    genre: Array<Genre>,
    lyrics: Array<Lyrics>,
    albums: Array<Albums>,
}

export default function Artist({ artist }: any) {

    const router = useRouter()
    if(router.isFallback) {
        return (
            <>
                <WebHeader/>
                <WebMenu/>
                <div className={ Style.artist }>
                    <div className={ Style.loading }>
                        <p>Carregando...</p>
                        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                            <LinearProgress color="inherit" />
                        </Stack>
                    </div>
                </div>
            </>
        )
    }

  return (
    <>
      <WebHeader/>
      <WebMenu/>
      <MobileMenu/>
        <div className={ Style.artist }>
            <div className={ Style.artistProfile }>
                <div className={ Style.texts }>
                    <h1>{artist.desc}</h1>
                    <div className={ Style.genere }>
                    {
                        artist.genre.map((g: Genre) => {
                            return (
                                <a key={ g.url } href={ "https://www.vagalume.com.br"+g.url } target="blank">
                                    {g.name}
                                </a>
                            )
                        })    
                    }
                    </div>
                </div>
                <img src={ "https://www.vagalume.com.br" + artist.pic_medium } alt="Foto de Perfil Artista"/>
            </div>
            <div className={ Style.artistContent }>
                <h2>Musicas:</h2>
                <div className={ Style.musicContent }>
                    <ol>
                    {
                        artist.lyrics.item.map((l: Lyrics) => {
                            return(
                                <a href={ "https://www.vagalume.com.br"+l.url } target="blank" key={ l.id }><li>{ l.desc }</li></a>
                            )
                        })
                    }
                    </ol>
                </div>
                <h2>Albuns:</h2>
                <div className={ Style.albumContent }>
                    <div className={ Style.albumContainer }>
                        {
                            artist.albums.item.map((a: Albums) => {
                                var image = a.url
                                image = image.replace(".html", "")
                                return(
                                    <a className={ Style.artistAlbuns } href={ "https://www.vagalume.com.br"+a.url } target="blank" key={ a.id }>
                                        <img src={"https://www.vagalume.com.br"+ image + ".jpg"} alt={ a.desc } />
                                        <div className={ Style.nameAlbum }>
                                            <p>{ a.desc }</p>
                                        </div>
                                        <span>{ a.year }</span>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
      <Footer/>
    </>
  )

}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

// GET
export const getStaticProps: GetStaticProps = async (ctx: any) => {
    const { slug } = ctx.params
    const { data } = await api.get(`${slug}/index.js`)
    const artist = {
        id: data.artist.id,
        desc: data.artist.desc,
        url: data.artist.url,
        pic_medium: data.artist.pic_medium,
        rank: data.artist.rank.pos,
        genre: data.artist.genre,
        lyrics: data.artist.lyrics,
        albums: data.artist.albums,
    }
    
    return {
        props: {
            artist,
        },
        revalidate: 60*60*24,
    }
}