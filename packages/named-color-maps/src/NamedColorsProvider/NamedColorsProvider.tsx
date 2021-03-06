import React from 'react'
import { selectColorFromPalette } from 'named-color-maps/selectColorFromPalette'
import { makeCachedMap } from 'named-color-maps/makeCachedMap'

export interface NamedColorMapEntry {
    name: string
    color: string
}

export interface NamedColorsCachedMap {
    id: string
    entries: NamedColorMapEntry[]
    nameMap: { [k: string]: number }
    colorMap: { [k: string]: number }
    colors: string[]
}

export interface NamedColorMaps {
    [id: string]: NamedColorsCachedMap
}

export type NamedColorsContextType = NamedColorMaps

export interface NamedColorsContextActions {
    getNamedColor: (color: string | undefined, defaultColor?: string) => Partial<NamedColorMapEntry> | undefined
    getColorsInHex: () => string[]
}

const NamedColorsContextDefault = {}

// @ts-ignore
const NamedColorsContext = React.createContext<NamedColorsContextType>(NamedColorsContextDefault)

export const useNamedColors = (id: string): { colorMaps: NamedColorsContextType } & NamedColorsContextActions => {
    const context = React.useContext(NamedColorsContext)
    const cachedMap = context[id]
    if(!cachedMap) {
        console.log('color map id not found: ' + cachedMap)
    }

    const getNamedColor: NamedColorsContextActions['getNamedColor'] = React.useCallback((color, defaultColor) => {
        if(color && cachedMap) {
            if(color.indexOf('#') === 0 && cachedMap.entries[cachedMap.colorMap[color]]) {
                return cachedMap.entries[cachedMap.colorMap[color]]
            }

            if(cachedMap.entries[cachedMap.nameMap[color]]) {
                return cachedMap.entries[cachedMap.nameMap[color]]
            }
        }
        return (defaultColor ? getNamedColor(defaultColor) : undefined)
    }, [cachedMap])

    const getColorsInHex: NamedColorsContextActions['getColorsInHex'] = React.useCallback(() => {
        return cachedMap?.colors || []
    }, [cachedMap])

    return {
        colorMaps: context,
        getNamedColor,
        getColorsInHex,
    }
}

export interface NamedColorsPaletteColor {
    light: string
    main: string
    dark: string
}

export type NamedColorsPalette<P extends { [c: string]: { [v: string]: string } } = {}> = {
    [C in keyof P]: {
        [variant: string]: string
    }
}

export interface NamedColorsProviderProps {
    palette: NamedColorsPalette
    shadedColors: {
        [color: string]: {
            [shade: string]: string
        }
    }
    colorMaps: {
        [id: string]: Partial<NamedColorMapEntry>[]
    }
}

export type selectColor = (colorOrName: string, defaultColor?: string) => string | undefined

export const NamedColorsProvider = (
    {
        children,
        shadedColors,
        colorMaps,
        palette,
    }: React.PropsWithChildren<NamedColorsProviderProps>,
): React.ReactElement => {
    const selectColor: selectColor = React.useCallback((colorOrName, defaultColor) => {
        return selectColorFromPalette(palette, shadedColors, colorOrName, defaultColor)
    }, [palette, shadedColors])

    const makeCachedMapFn: (id: string, colorList: Partial<NamedColorMapEntry>[]) => NamedColorsCachedMap = React.useCallback((id, colorList) => {
        return makeCachedMap(selectColor, id, colorList)
    }, [selectColor])

    const cachedMaps = React.useMemo(() => {
        const map: NamedColorMaps = {}

        Object.keys(colorMaps).forEach(mapId => {
            map[mapId] = makeCachedMapFn(mapId, colorMaps[mapId] as Partial<NamedColorMapEntry>[])
        })
        return map
    }, [colorMaps, makeCachedMapFn])

    return <NamedColorsContext.Provider value={cachedMaps}>
        {children}
    </NamedColorsContext.Provider>
}
