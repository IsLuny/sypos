import { Form } from "antd";
import styled from "styled-components";

const FormItem = styled(Form.Item)<{ hideRequired?: boolean }>`
    .ant-form-item-required::before {
        display: ${(props) => props.hideRequired ? "none !important" : "inline-block"};
    }

    .ant-form-item-explain-error {
        display: block;
        text-align: left;
        padding: 4px 0;
    }
`;

export default FormItem;