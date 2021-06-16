import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Form, InputNumber, Button, Checkbox, notification } from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const HomePage = () => {
    const [form] = Form.useForm();
    const [seatsNumber, setSeatsNumber] = useState('');
    const [closeSeats, setCloseSeats] = useState(false)

    const history = useHistory();

    const handleChangeSeatsNumber = value => setSeatsNumber(value);
    const handleChangeCloseSeats = e => setCloseSeats(e.target.checked);

    const handleOnSubmit = ({ seatsNumber, closeSeats }) => {
        console.log(seatsNumber, closeSeats);

        if (seatsNumber >= 5 && closeSeats) {

            notification.info({
                message: `Błąd`,
                description: `Nie może być ${seatsNumber} miejsc obok siebie. Maksymalna liczba miejsc obok siebie wynosi 5.`,
                placement: 'bottomRight'
            });

            return;
        };

        const location = {
            pathname: '/miejsca',
            state: {
                seatsNumber,
                closeSeats
            }
        };

        history.push(location);
    }


    return (
        <div className="wrapper">
            <Form
                {...layout}
                name="basic"
                form={form}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleOnSubmit}
            >
                <Form.Item
                    label="Liczba miejsc:"
                    type="number"
                    name="seatsNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Proszę wybrać liczbę miejsc',
                        },
                    ]}
                >
                    <InputNumber min={1} onChange={handleChangeSeatsNumber} value={seatsNumber} />
                </Form.Item>

                <Form.Item {...tailLayout} name="closeSeats" valuePropName="checked">
                    <Checkbox onChange={handleChangeCloseSeats}>"Czy miejsca mają być obok siebie?"</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Wybierz miejsca
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default HomePage;