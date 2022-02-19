import styled from "styled-components"
import { customMedia } from "../../../styles"

export const SelectAudioContainer = styled.div`
  grid-column: 1 / -1;
  grid-template-columns: 1fr auto;
  display: grid;
  row-gap: 10px;
`

export const SettingTitle = styled.div`
`

export const BgMusicList = styled.div`
  grid-column: 1 / -1;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 10px;
  column-gap: 0.625rem;
  background-color: ${props => props.theme.originBgColor};
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: repeat(2, 1fr);
  `}
`

export const BgMusicItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  cursor: pointer;
`

export const Icon = styled.div`
  svg {
    display: flex;
  }
`

export const BgMusicName = styled.div`
  font-weight: ${props => props.selected && 600};
`

export const PlaySound = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 5px;
  column-gap: 0.3125rem;
  font-size: 0.75em;
  font-size: 0.75rem;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.bgColor};
`

export const License = styled.div`
  grid-column: 1 / -1;
  font-size: 0.875em;
  font-size: 0.875rem;
  opacity: 0.8;
  cursor: pointer;
`