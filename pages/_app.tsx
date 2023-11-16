import "@/styles/globals.css";
import { AppProps } from "next/app";
import localFont from 'next/font/local'

const krypton = localFont({
  src: [
    {
      path: '../fonts/MonaspaceKrypton-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/MonaspaceKrypton-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/MonaspaceKrypton-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/MonaspaceKrypton-ExtraBoldItalic.woff',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../fonts/MonaspaceKrypton-ExtraLight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/MonaspaceKrypton-ExtraLightItalic.woff',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../fonts/MonaspaceKrypton-Italic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/MonaspaceKrypton-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/MonaspaceKrypton-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/MonaspaceKrypton-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/MonaspaceKrypton-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/MonaspaceKrypton-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/MonaspaceKrypton-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/MonaspaceKrypton-SemiBoldItalic.woff',
      weight: '600',
      style: 'italic',
    },
  ],
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={krypton.className}>
      <Component {...pageProps} />
    </main>
  );
}
