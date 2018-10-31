import React from 'react';
import { Modal, Button} from 'antd';
import WrapGeneralForm from "../GeneralForm/GeneralForm"

export default class GeneralModarForm extends React.Component {
   
    render() {
      const {buttonProps,buttonText,buttonOnClick,formProps,modalProps} = this.props;
   
      return (
        <span>
          <Button {...buttonProps} onClick={buttonOnClick}>{buttonText}</Button>
          <Modal
            {...modalProps}
          >
            <WrapGeneralForm
              {...formProps}
            />
          </Modal>
        </span>
      );
    }
  }