import React from 'react'
import { Card } from 'antd'
import { HomeTwoTone } from '@ant-design/icons'

const HomePage = () => {
  const contentStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '3rem 3rem',
    justifyContent: 'left',
    width: '100%'
  }
  return (
    <>

      <Card style={contentStyle}>
        <h1><HomeTwoTone twoToneColor='#52c41a' /> Accueil</h1>
        <p>Site developpé dans le but de pratiquer la Mern Stack</p>
        <p>MongoDB / Express / React / Node.js</p>
        <p>Application CRUD : Create / Read / Update / Delete</p>
        <p>L'application utilise le pattern MVC (ou isomorphic)</p>
      </Card>
    </>
  )
}

export default HomePage
