import React from 'react'
import { ColorList } from './ColorList'

export const App: React.ComponentType<{}> = () => {
    const scrollWrapper = React.useRef<HTMLDivElement | null>(null)
    return <div
        ref={scrollWrapper}
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            //background: '#020a0b',
            //background: '#121313',
            background: '#081717',
            color: '#ffffff',
            overflow: 'auto',
        }}
    >
        <div style={{margin: '12px auto'}}>
            <h1 style={{fontWeight: 300, fontSize: '2rem', marginBottom: 8}}>Named Color Maps</h1>
            <p style={{
                fontWeight: 300, fontSize: '1.125rem',
                marginTop: 0,
                display: 'flex',
            }}>
                for React
                <a
                    href={'https://github.com/elbakerino/named-color-maps'}
                    style={{
                        fontWeight: 300, fontSize: '1.125rem',
                        marginTop: 0,
                        marginLeft: 'auto',
                    }}
                >GitHub</a>
            </p>
        </div>

        <ColorList/>

        <div style={{margin: 'auto auto 8px auto'}}>
            <p>by <a href={'https://mlbr.xyz'}>Michael Becker</a></p>
        </div>
    </div>
}
