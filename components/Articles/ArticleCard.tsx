import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  id: string
  title: string
  image: string
  setCurrentDoc: (id: string) => void
}

export default function ArticleCard({
  id,
  title,
  image,
  setCurrentDoc,
}: Props) {
  const router = useRouter()
  return (
    <div
      className="h-64 w-1/4 cursor-pointer"
      onClick={() => setCurrentDoc(id)}
    >
      <div className="h-full  w-5/6 rounded bg-white shadow">
        <div className="relative  h-3/4 w-full">
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            className="rounded-t"
          />
        </div>
        <div className="flex h-1/4 w-full items-center justify-center">
          <h2 className="truncate text-2xl">{title}</h2>
        </div>
      </div>
    </div>
  )
}