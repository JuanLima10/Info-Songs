/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Style from './styles.module.scss'

export const Footer = () => {

  return(
    <>
      <div className={ Style.footer }>
        <div className={ Style.footerContent }>
            <div className={ Style.footerLogos }>
                <a href="/"><img src="/img/InfoSongsLogo.png" alt="logo"/></a>
                <p>|</p>
                <a href="https://www.vagalume.com.br" target="blank"><img src="/img/vagalumeLogo.png" alt="logo"/></a>
            </div>
            <p>Desenvolvido por <a href="https://github.com/JuanLima10" target="blank">Juan Lima</a></p>
        </div>
      </div>
    </>
  )
}