import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const Signup = () => {
  // console.log(id)
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '' })

  useEffect(() => {
    setValues(values)
  }, [values])

  const onFinish = async (values) => {
    navigate('/')
  }

  const onFinishFailed = errorInfo => {
    // console.log('values', values)
    console.log('Failed:', errorInfo)
  }

  const handleChange = event => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value }) // le name est entre [name], vu comme variable et sera ok pour chaque input
  }

  return (
    <Form
      {...layout}
      name='formUser'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h1>Création de compte</h1>

      <Form.Item
        label='Email'
        name='email'
        initialValue={values.email}
        rules={[{ type: 'email', required: true, message: 'Merci d\'entrer un email !' }]}
      >
        <Input
          name='email'
          value={values.email}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        initialValue={values.password}
        rules={[{ required: true, message: 'Merci d\'entrer un password !' }]}
      >
        <Input
          name='password'
          value={values.password}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Enregistrer
        </Button>

      </Form.Item>

    </Form>
  )
}

export default Signup
