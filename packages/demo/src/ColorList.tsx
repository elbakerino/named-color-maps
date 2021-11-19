import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'
import { green, grey } from '@material-ui/core/colors'
import { NamedColorMapEntry, NamedColorsProvider, useNamedColors } from 'named-color-maps/NamedColorsProvider'

const shadedColors = {green, grey}

export const defaultColorMap: Partial<NamedColorMapEntry>[] = [
    {
        name: 'background__default',
    }, {
        name: 'background__paper',
    }, {
        color: '#f9f4a5',
    }, {
        name: 'primary__dark',
    }, {
        name: 'primary__main',
    }, {
        name: 'primary__light',
    }, {
        name: 'secondary__dark',
    }, {
        name: 'secondary__main',
    }, {
        name: 'secondary__light',
    }, {
        name: 'error__dark',
    }, {
        name: 'error__main',
    }, {
        name: 'error__light',
    }, {
        name: 'warning__dark',
    }, {
        name: 'warning__main',
    }, {
        name: 'warning__light',
    }, {
        name: 'info__dark',
    }, {
        name: 'info__main',
    }, {
        name: 'info__light',
    }, {
        name: '_green__800',
    }, {
        name: '_green__600',
    }, {
        name: '_green__400',
    }, {
        name: '_grey__800',
    }, {
        name: '_grey__600',
    }, {
        name: '_grey__400',
    },
]

const colorMaps = {
    default: defaultColorMap,
}

const ColorListContent: React.ComponentType<{}> = () => {
    // @ts-ignore
    const {colorMaps: colorMapsContext, getNamedColor} = useNamedColors('default')

    return <Box m={2}>
        <Typography>
            Color Maps: {Object.keys(colorMaps).length}
        </Typography>

        <Typography>
            Primary Main: <code>{getNamedColor('primary__main')?.color}</code>
        </Typography>
        <Typography>
            Secondary Main: <code>{getNamedColor('secondary__main')?.color}</code>
        </Typography>

        <Box style={{display: 'flex'}}>
            <Box>
                <Typography>Input Color Map</Typography>
                {/* @ts-ignore */}
                <pre><code>{JSON.stringify(colorMaps.default, undefined, 4)}</code></pre>
            </Box>
            <Box>
                <Typography>Cached Color Map</Typography>
                {/* @ts-ignore */}
                <pre><code>{JSON.stringify(colorMapsContext.default.entries, undefined, 4)}</code></pre>
            </Box>
        </Box>
    </Box>
}

export const ColorList: React.ComponentType<{}> = () => {
    const {palette} = useTheme()

    const colorPalette = React.useMemo(() => ({
        primary: palette.primary,
        secondary: palette.secondary,
        error: palette.error,
        warning: palette.warning,
        info: palette.info,
        success: palette.success,
        background: palette.background,
    }), [palette])

    return <NamedColorsProvider
        shadedColors={shadedColors}
        colorMaps={colorMaps}
        palette={colorPalette}
    >
        <ColorListContent/>
    </NamedColorsProvider>
}
