import '@styles/globals.css'
import {Metadata} from "next";

import { ReactNode } from 'react';
export const metadata: Metadata = {
    title: 'Frontend upToDate',
    description: "Discover & Share Frontend Tips"
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
            {children}
        </main>
        </body>

        </html>
    );
};

export default RootLayout;