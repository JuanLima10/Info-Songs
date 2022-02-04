/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next"

import { WebHeader } from "../../components/Header"
import { MobileMenu, WebMenu } from "../../components/Menu"
import { Footer } from "../../components/Footer"

import api from "../api/api"
import Style from './styles.module.scss'

type Estilo = {
  nameStyle: string,
  urlStyle: string,
}

type EstiloProps = {
  estilos: Estilo[],
}

export default function Estilos({ estilos }: EstiloProps) {

  return (
    <>
      <WebHeader/>
      <WebMenu/>
      <MobileMenu/>
      <div className={ Style.estilos }>
        <h1>Estilos Musicais</h1>
        <div className={ Style.estilosContent }> 
        {
          estilos.map(e => {
            return (
              <div key={e.urlStyle}>
                  <a href={"https://www.vagalume.com.br/browse/style/"+e.urlStyle+".html"} target="blank"><p>{e.nameStyle}</p></a>
              </div>
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
  const { data } = await api.get('browse/style/index.js')
  const estilos = data.map((e: Estilo) => {
    return {
      nameStyle: e.nameStyle,
      urlStyle: e.urlStyle,
    }
  })

  return {
    props: {
        estilos,
    },
    revalidate: 60*60*8,
  }
}