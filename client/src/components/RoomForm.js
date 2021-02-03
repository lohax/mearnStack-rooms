import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const RoomForm = ({ id, room, setRoom }) => {
  // console.log(id)
  const navigate = useNavigate()
  const [values, setValues] = useState(null)

  useEffect(() => {
    setValues(room)
  }, [room, id])

  const onFinish = async (values) => {
    // console.log(values.promo)
    await fetch(`/api/rooms/${id === 'add' ? '' : id}`, { // fetch pour envoyer les datas
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: id === 'add' ? 'POST' : 'PATCH',
      body: JSON.stringify(values)
    })

    id === 'add'
      ? navigate('/rooms')
      : setRoom(values) // Pour mettre a jour le state de ref
  }

  const onFinishFailed = errorInfo => {
    // console.log('values', values)
    console.log('Failed:', errorInfo)
  }

  const handleChange = event => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value }) // le name est entre [name], vu comme variable et sera ok pour chaque input
  }

  const handleDelete = async () => {
    await fetch(`/api/rooms/${id}`, {
      method: 'DELETE'
    })
    navigate('/rooms')
  }

  // if (!values) return null // autre possibilité de tester les data

  return !values
    ? null
    : (
      <Form
        {...layout}
        name='editRoom'
        // initialValues={{
        //   name: values.name,
        //   maxPersons: values.maxPersons,
        //   promo: values.promo
        // }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {id === 'add' ? <h1>Nouvelle Chambre</h1> : ''}
        <Form.Item
          label='Nom'
          name='name'
          initialValue={values.name}
          rules={[{ required: true, message: 'Merci d\'entrer le nom de la chambre!' }]}
        >
          <Input
            name='name'
            value={values.name}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label='Capacité max'
          name='maxPersons'
          initialValue={values.maxPersons}
          rules={[{ required: false }]}
        >
          <Input
            min={1}
            type='number'
            name='maxPersons'
            value={values.maxPersons}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name='promo'
          initialValue={values.promo}
          valuePropName='checked'
        >
          <Checkbox
            name='promo'
            value={values.promo}
            onChange={handleChange}
          >
            Promo
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Enregistrer
          </Button>

          {id !== 'add'
            ? (
              <Button type='danger' style={{ marginLeft: '1rem' }} onClick={handleDelete}>
                Supprimer
              </Button>
              )
            : ''}

        </Form.Item>

      </Form>
      )
}

export default RoomForm
