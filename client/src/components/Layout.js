import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
const { SubMenu } = Menu

// Export en destructuring des element de Layout :
const { Header, Content, Footer } = Layout

const contentStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  padding: '3rem 3rem',
  justifyContent: 'center'
}

const loginStyle = { position: 'absolute', top: 15, right: 95 }
const signupStyle = { position: 'absolute', top: 15, right: 10 }

const LCLayout = ({ children }) => {
  const navigate = useNavigate()

  return (
    <Layout>
      <Header>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>
            <Link to='/'>Accueil</Link>
          </Menu.Item>
          <SubMenu key='2' title='Chambres' onTitleClick={() => { navigate('/rooms') }}>
            <Menu.Item key='2.1'>
              <Link to='/rooms/add'>Nouvelle chambre</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='3'>
            <Link to='/about'>A propos</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link to='/contact'>Contact</Link>
          </Menu.Item>

          <Button key='5' style={loginStyle}>
            <Link to='/login'>Login</Link>
          </Button>
          <Button type='primary' key='6' style={signupStyle}>
            <Link to='/signup'>SignUp</Link>
          </Button>

        </Menu>
      </Header>

      <Content style={contentStyle} children={children} />

      <Footer style={{ textAlign: 'center' }}>
        Loïc Chambost ©2021 Practice MVC Mern stack
      </Footer>

    </Layout>
  )
}

export default LCLayout
