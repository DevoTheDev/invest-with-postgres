import React from 'react'
import ColoredText from '../atoms/ColoredText'

type Props = {}

const MyTitlePage = (props: Props) => {
  return (
    <div className="flex text-center justify-center'">
              <ColoredText
                colors={['#000000', '#FFFFFF', '#FFFFFF']} // black → dark grey → white
                size="text-5xl"
                weight="font-extrabold"
                shadow={false}
              >
                Dev
              </ColoredText>
              <ColoredText
                colors={['#FFFFFF', '#FFFFFF', '#000000']} // white → light grey → black
                size="text-5xl"
                weight="font-extrabold"
                shadow={true}
              >
                Element
              </ColoredText>
            </div>
  )
}

export default MyTitlePage