import React from 'react'

type Props = {
  text: string
}

export default function MDPreview({ text }: Props) {
  return <div>{text}</div>
}
