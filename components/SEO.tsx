import Head from 'next/head'

interface IProps {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
}

const defaultValues: IProps = {
  title: 'LabelBlind: Digitising Food Labelling',
  description: 'Getting Food Products Market Ready for MSMEs and FPOs',
  image:
    'https://www.labelblind.com/_next/image?url=%2Flogo-white-sm.png&w=256&q=75',
  keywords: ['food', 'labelling'],
}

export default function SEO(props: IProps) {
  return (
    <Head>
      <title>{props.title || defaultValues.title}</title>
      <meta
        name="description"
        content={props.description || defaultValues.description}
      />
      <meta
        name="keywords"
        content={
          props.keywords?.toString() || defaultValues.keywords?.toString()
        }
      ></meta>
      <meta property="og:title" content={props.title || defaultValues.title} />
      <meta
        property="og:description"
        content={props.description || defaultValues.description}
      />
      <meta property="og:image" content={props.image || defaultValues.image} />
    </Head>
  )
}
