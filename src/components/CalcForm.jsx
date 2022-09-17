import React, {useRef, useReducer} from 'react';
import { Form, Button, Radio, InputNumber } from 'antd';

const CalcForm = () => {

    const [form] = Form.useForm();
    const formRef = useRef(null);


    const initialState = {total: 0, number1: 0, number2: 0};

    const reducer = (state, action) => {
        switch (action.type) {
            case 'adunare':
                return {
                    number1: action.value1,
                    number2: action.value2,
                    total: action.value1 + action.value2,
                };
            case 'scadere':
                return {
                    number1: action.value1,
                    number2: action.value2,
                    total: action.value1 - action.value2,
                };
            case 'inmultire':
                return {
                    number1: action.value1,
                    number2: action.value2,
                    total: action.value1 * action.value2,
                };
            case 'inpartire':
                return {
                    number1: action.value1,
                    number2: action.value2,
                    total: action.value1 / action.value2,
                };
            case 'reset':
                return initialState
            default:
              throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const onFinish = async (fieldValues) => {
        dispatch({type: fieldValues.operatie, value1: fieldValues.number1, value2: fieldValues.number2});
    }

    const handleReset = () => {
        formRef.current.resetFields();
        dispatch({type: 'reset'});
    }

    return ( 
        <div className='calc-form'>
            <Form form={form} ref={formRef} layout="vertical" onFinish={onFinish}>
                <Form.Item name="number1" label="Numar 1" tooltip="Continut obligatoriu" rules={[{required: true, message: "Continut obligatoriu"}]} hasFeedback>
                    <InputNumber placeholder="Numar 1" />
                </Form.Item>
                <Form.Item name="number2" label="Numar 2" tooltip="Continut obligatoriu" rules={[{required: true, message: "Continut obligatoriu"}]} hasFeedback>
                    <InputNumber placeholder="Numar 2" />
                </Form.Item>
                <Form.Item name="operatie" label="Operatie" tooltip="Continut obligatoriu" rules={[{required: true, message: "Continut obligatoriu"}]} hasFeedback>
                    <Radio.Group>
                        <Radio value="adunare">Adunare</Radio>
                        <Radio value="scadere">Scadere</Radio>
                        <Radio value="inmultire">Inmultire</Radio>
                        <Radio value="inpartire">Inpartire</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Calculeaza</Button>
                </Form.Item>
            </Form>

            <div className='action-container'>
                <h3>Total: <span>{state?.total}</span></h3>
                <Button type="danger" onClick={handleReset}>Reseteaza</Button>
            </div>
            
        </div>

    );
}
 
export default CalcForm;