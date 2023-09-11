import '@styles/globals.css'
import {Metadata} from "next";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";

import { ReactNode } from 'react';
export const metadata: Metadata = {
    title: 'Frontend upToDate',
    description: "Discover & Share AI-Powered Prompts"
}

type Props = {
    children: ReactNode
}

const RootLayout = ({children} : Props) => {
    return (
        <html lang='en'>
        <body>
        <div className='main'>
          <div className='gradient'/>
        </div>
        <main className='app'>
            <Navbar/>
            {children}
        </main>
        </body>

        </html>
    );
};

export default RootLayout;