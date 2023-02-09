import React, { useState } from 'react'

interface Props {
  name: string
}

const TagComponent: React.FC<Props> = ({ name }: Props) => {
	const [color, setColor] = useState('blue')

	return <div className={`text-white bg-${color}-500`}>{name}</div>
}

export default TagComponent