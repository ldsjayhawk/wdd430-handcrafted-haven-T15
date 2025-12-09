import { Kameron } from 'next/font/google'
import { Lovers_Quarrel } from 'next/font/google'
import { Source_Sans_3 } from 'next/font/google'
import { Inter } from 'next/font/google'
import { Nunito_Sans } from 'next/font/google'
import { Parisienne } from 'next/font/google'



export const kameron = Kameron({
    subsets: ['latin'],
    variable: "--font-kameron",
});

export const lovers = Lovers_Quarrel({
     subsets: ['latin'],
     weight: "400",
     variable: "--font-lovers"
});

export const sourceSans = Source_Sans_3({
    subsets: ['latin'],
     variable: "--font-sourceSans"
})

export const inter = Inter({
    subsets: ['latin'],
     variable: "--font-inter"
})

export const nunito = Nunito_Sans({
    subsets: ['latin'],
     variable: "--font-nunito"
})

export const paris = Parisienne({
    subsets: ['latin'],
    weight: '400',
     variable: "--font-paris"
})


