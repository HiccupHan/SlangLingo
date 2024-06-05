import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function TextBox() {
  const [text, setText] = useState("Enter Text");
  return (
    <Form>
      <Form.Group className="text-area" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={10} />
      </Form.Group>
    </Form>
  );
}

export default TextBox;