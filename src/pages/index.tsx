import { GetStaticProps } from "next";

import Head from "next/head";
import styles from "../styles/home.module.scss";

import Image from "next/image";
import techsImage from "../../public/images/techs.svg";

import { getPrismicClient } from "../services/prismic";
import Prismic from '@prismicio/client'
import { RichText } from "prismic-dom";

type Content = {
  title: string,
  subtitle: string,
  linkAction: string,
  mobile: string,
  titleWeb:string,
  mobileContent: string,
  mobileBanner: string,
  webContent: string,
  webBanner: string,

}



interface ContentProps{
  content:Content
}


export default function Home( {content}: ContentProps) {

  return (
    <>
      <Head>
        <title>SujeitoProgramador | HomePage</title>
        <meta name="description" content="Em Desenvolvimento" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>
              {content.title}
            </h1>
            <span>
              {content.subtitle}
            </span>
            <a href={content.linkAction}><button>COMEÇAR AGORA</button></a>
          </section>

          <img src="/images/banner-conteudos.png" alt="Conteudos Sujeito Programador" />
        </div>


        <hr className={styles.divisor} />
        <div className={styles.sectionContent}>
          <section>
            <h2>
              {content.mobile}
            </h2>
            <span>{content.mobileContent}</span>
          </section>
          <img src={content.mobileBanner} alt="Desenvolvimento de Apps" />
        </div>
        <hr className={styles.divisor} />
        <div className={styles.sectionContent}>
          <img src={content.webBanner} alt="Desenvolvimento de Aplicações Web" />
          <section>
            <h2>
              {content.titleWeb}
            </h2>
            <span>{content.webContent}</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>

          <Image src={techsImage} alt="Tecnoligias Usadas" />
          <h2>Mais de <span className={styles.alunos}>15mil</span> já levaram sua carreira ao próximo nível! </h2>
          <span>E você vair perder a chance de evoluir  de uma vez por todas!</span>
          <a href={content.linkAction}> <button>ACESSAR TURMA</button></a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')

  ])


const {
    title, sub_title, link_action, mobile, mobile_content, mobile_banner, title_web, web_content, web_banner

  } = response.results[0].data;


  const content = {
    title: RichText.asText(title),
    subtitle: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobile: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    titleWeb: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url

  }

  return {
    props: {
      content
    },
    revalidate: 60*2
  }

}